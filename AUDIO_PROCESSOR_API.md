# AudioProcessor API Reference

## Overview
The `AudioProcessor` class handles all voice input/output processing for the ShivAI widget, including platform-specific optimizations, noise filtering, and volume management.

## Constructor

```javascript
const audioProcessor = new AudioProcessor();
```

No parameters required. All configuration is done through default values that can be modified after instantiation.

## Properties

### Audio Nodes
- `audioContext` - Web Audio API context
- `masterGainNode` - Master gain control for output
- `playbackProcessor` - ScriptProcessorNode for output processing
- `audioWorkletNode` - ScriptProcessorNode for input processing

### Buffer Management
- `playbackBufferQueue` - Array of Float32Array buffers awaiting playback
- `playbackBufferOffset` - Current position in active buffer
- `minBufferChunks` - Minimum chunks (3) before starting playback

### State Flags
- `audioBufferingStarted` - True when buffering started
- `audioStreamComplete` - True when stream finished
- `assistantSpeaking` - True when AI is speaking
- `internalMicMuted` - True during initial 3-second mute
- `initialMuteTimeout` - Timeout handle for mute timer

### Callbacks
- `onAssistantSpeakingChange(isSpeaking, preserveStatus)` - Called when assistant speaking state changes

## Methods

### Initialization

#### `initAudioContext()`
Creates and returns Web Audio API context.

```javascript
const audioContext = audioProcessor.initAudioContext();
```

**Returns:** `AudioContext` instance

**Notes:**
- Only creates context if not already initialized
- Uses `webkitAudioContext` fallback for older browsers

---

#### `isIOS()`
Detects if device is iOS/iPadOS.

```javascript
const isiOSDevice = audioProcessor.isIOS();
```

**Returns:** `boolean`

**Detection:** Checks navigator.userAgent and platform

---

### Audio Processing Setup

#### `setupPlaybackProcessor()`
Initializes output audio processing chain.

```javascript
audioProcessor.setupPlaybackProcessor();
```

**Creates:**
- Master gain node (8.0x iOS, 3.0x others)
- ScriptProcessor (4096 buffer)
- Connects to destination

**Notes:**
- Automatically tears down existing processor
- Clears playback buffers

---

#### `startAudioStreaming(mediaStream, ws, isConnected)`
Initializes input audio processing from microphone.

```javascript
audioProcessor.startAudioStreaming(mediaStream, ws, isConnected);
```

**Parameters:**
- `mediaStream` - MediaStream from getUserMedia
- `ws` - WebSocket connection
- `isConnected` - Boolean flag (passed by reference via closure)

**Creates:**
- MediaStreamSource
- High-pass filter (80Hz, Q=0.5)
- ScriptProcessor (4096 buffer)
- Silent gain node (prevents feedback)

**Processing Chain:**
```
Microphone → High-Pass → Processor → Silent Gain → Destination
                            ↓
                      Check mute state
                            ↓
                     Convert to PCM16
                            ↓
                    Send via WebSocket
```

---

### Audio Processing

#### `handlePlaybackProcess(event)`
Processes output audio with fixed gain and smooth limiting.

```javascript
audioProcessor.handlePlaybackProcess(event);
```

**Parameters:**
- `event` - AudioProcessingEvent from ScriptProcessorNode

**Processing:**
1. Check buffering state
2. Pull samples from buffer queue
3. Apply fixed gain (7.0x)
4. Apply smooth tanh limiting
5. Write to output buffer

**Gain Settings:**
- Base gain: 7.0x
- Soft limit: 0.85
- Hard limit: 0.98

**Limiting Algorithm:**
```javascript
if (absSample > softLimit) {
  const sign = processedSample > 0 ? 1 : -1;
  const excess = absSample - softLimit;
  const smoothed = softLimit + (0.15 * Math.tanh(excess / 0.15));
  processedSample = sign * smoothed;
}
```

---

#### `scheduleAudioChunk(pcmBuffer)`
Adds PCM16 audio chunk to playback queue.

```javascript
audioProcessor.scheduleAudioChunk(pcmBuffer);
```

**Parameters:**
- `pcmBuffer` - ArrayBuffer containing PCM16 audio data

**Behavior:**
1. Converts PCM16 to Float32
2. Adds to playback queue
3. Starts playback when minimum chunks reached
4. Sets `assistantSpeaking = true` when playback starts

---

#### `stopAllScheduledAudio(preserveStatus)`
Clears all queued audio and stops playback.

```javascript
audioProcessor.stopAllScheduledAudio(false);
```

**Parameters:**
- `preserveStatus` - If true, doesn't update status display

**Clears:**
- Playback buffer queue
- Buffer offset
- Buffering flags
- Sets assistantSpeaking = false

---

### Mute Management

#### `enableInitialMute()`
Activates 3-second internal microphone mute.

```javascript
audioProcessor.enableInitialMute();
```

**Use Case:** Call on WebSocket connection to prevent user interruption during AI greeting

**Behavior:**
- Sets `internalMicMuted = true`
- Starts 3-second timeout
- Auto-unmutes after timeout
- Logs to console

---

#### `clearInitialMute()`
Immediately clears internal mute and timeout.

```javascript
audioProcessor.clearInitialMute();
```

**Use Case:** Call on disconnect to cleanup

---

### Conversion Utilities

#### `pcm16ToFloat32(pcmBuffer)`
Converts PCM16 ArrayBuffer to Float32Array.

```javascript
const float32 = audioProcessor.pcm16ToFloat32(pcmBuffer);
```

**Parameters:**
- `pcmBuffer` - ArrayBuffer with PCM16 data

**Returns:** `Float32Array` with values in range [-1, 1]

---

#### `convertFloat32ToPCM16(float32Array)`
Converts Float32Array to PCM16 ArrayBuffer.

```javascript
const pcm16 = audioProcessor.convertFloat32ToPCM16(float32Array);
```

**Parameters:**
- `float32Array` - Float32Array with values in range [-1, 1]

**Returns:** `ArrayBuffer` with PCM16 data

---

#### `arrayBufferToBase64(buffer)`
Converts ArrayBuffer to Base64 string.

```javascript
const base64 = audioProcessor.arrayBufferToBase64(buffer);
```

**Parameters:**
- `buffer` - ArrayBuffer to encode

**Returns:** Base64 encoded string

---

#### `base64ToArrayBuffer(base64)`
Converts Base64 string to ArrayBuffer.

```javascript
const buffer = audioProcessor.base64ToArrayBuffer(base64);
```

**Parameters:**
- `base64` - Base64 encoded string

**Returns:** ArrayBuffer with decoded data

---

### State Management

#### `setAssistantSpeaking(isSpeaking, preserveStatus)`
Updates assistant speaking state.

```javascript
audioProcessor.setAssistantSpeaking(true, false);
```

**Parameters:**
- `isSpeaking` - Boolean speaking state
- `preserveStatus` - If true, doesn't trigger status update callback

**Behavior:**
- Only updates if state changed
- Calls `onAssistantSpeakingChange` callback if set
- Updates internal `assistantSpeaking` property

---

### Cleanup

#### `teardownPlaybackProcessor()`
Disconnects and clears playback processor.

```javascript
audioProcessor.teardownPlaybackProcessor();
```

**Behavior:**
- Disconnects ScriptProcessorNode
- Sets processor to null
- Called automatically by setupPlaybackProcessor

---

#### `closeAudioContext()`
Closes audio context and cleans up all resources.

```javascript
await audioProcessor.closeAudioContext();
```

**Returns:** Promise

**Cleans up:**
- Initial mute timeout
- Input processor (audioWorkletNode)
- Output processor
- Audio context

**Use Case:** Call on disconnect/widget close

---

## Usage Examples

### Basic Setup

```javascript
// Create instance
const audioProcessor = new AudioProcessor();

// Set callback
audioProcessor.onAssistantSpeakingChange = (isSpeaking, preserveStatus) => {
  console.log('AI speaking:', isSpeaking);
  updateUIStatus(isSpeaking);
};

// Initialize audio context
const audioContext = audioProcessor.initAudioContext();
audioProcessor.audioContext = audioContext;

// Setup output processing
audioProcessor.setupPlaybackProcessor();
```

### Starting a Call

```javascript
// Get microphone
const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

// Start input processing
audioProcessor.startAudioStreaming(mediaStream, websocket, isConnectedFlag);

// Enable 3-second mute for greeting
audioProcessor.enableInitialMute();
```

### Receiving Audio

```javascript
websocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'audio') {
    const pcmBuffer = audioProcessor.base64ToArrayBuffer(data.audio);
    audioProcessor.scheduleAudioChunk(pcmBuffer);
  }
};
```

### User Starts Speaking

```javascript
websocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'speech_started') {
    // Stop AI audio immediately
    audioProcessor.stopAllScheduledAudio({ preserveStatus: true });
  }
};
```

### Ending a Call

```javascript
async function disconnect() {
  // Close WebSocket
  websocket.close();
  
  // Stop microphone
  mediaStream.getTracks().forEach(track => track.stop());
  
  // Cleanup audio
  await audioProcessor.closeAudioContext();
}
```

## Platform-Specific Behavior

### iOS Devices
- Master gain: **8.0x**
- Total amplification: **56x** (8.0 × 7.0)
- Optimized for noisy environments
- Auto-resume audio context on user interaction

### Other Devices
- Master gain: **3.0x**
- Total amplification: **21x** (3.0 × 7.0)
- Standard audio settings

## Audio Processing Parameters

### Input Processing
| Parameter | Value | Purpose |
|-----------|-------|---------|
| Buffer Size | 4096 | ScriptProcessor buffer |
| High-Pass Freq | 80 Hz | Remove low-frequency noise |
| High-Pass Q | 0.5 | Filter slope |
| Initial Mute | 3000ms | Allow AI greeting |

### Output Processing
| Parameter | Value | Purpose |
|-----------|-------|---------|
| Buffer Size | 4096 | ScriptProcessor buffer |
| Base Gain | 7.0x | Consistent volume |
| iOS Master Gain | 8.0x | Loud in crowds |
| Other Master Gain | 3.0x | Standard volume |
| Soft Limit | 0.85 | Start of limiting curve |
| Hard Limit | 0.98 | Maximum output level |
| Min Buffer Chunks | 3 | Before playback starts |

## Performance Considerations

- **CPU Usage:** ~2-5% for audio processing
- **Memory:** ~1-2 MB for buffers
- **Latency:** ~100ms total (network + buffering + processing)
- **Buffer Size:** 4096 samples = ~93ms at 44.1kHz

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Full support |
| Safari | 11+ | ✅ Full support (iOS optimized) |
| Firefox | 55+ | ✅ Full support |
| Edge | 79+ | ✅ Full support |

## Debugging

### Enable Logs

```javascript
// Check mute state
console.log('Mic muted:', audioProcessor.internalMicMuted);

// Check buffering
console.log('Buffering started:', audioProcessor.audioBufferingStarted);
console.log('Buffer queue length:', audioProcessor.playbackBufferQueue.length);

// Check speaking state
console.log('Assistant speaking:', audioProcessor.assistantSpeaking);

// Check audio context state
console.log('Audio context state:', audioProcessor.audioContext?.state);
```

### Common Issues

1. **No audio output:**
   - Check `audioContext.state` (should be 'running')
   - Check buffer queue has data
   - Verify master gain is not 0

2. **Feedback/Echo:**
   - Verify silent gain node is in place (gain = 0)
   - Check processor not connected directly to destination

3. **Volume too low:**
   - Check platform detection (iOS vs others)
   - Verify master gain values (8.0 or 3.0)
   - Check base gain (7.0)

4. **User voice not detected:**
   - Check internal mute state
   - Verify WebSocket is open
   - Check microphone permissions

## Thread Safety

⚠️ **Note:** Web Audio API runs on separate audio thread. All audio processing happens in `onaudioprocess` callbacks which run on the audio thread. State updates trigger callbacks on the main thread.

## Best Practices

1. **Always cleanup:** Call `closeAudioContext()` on disconnect
2. **Check audio context state:** Resume if suspended before use
3. **Handle permissions:** Request mic access with user gesture
4. **Monitor buffer queue:** Prevent memory leaks from unbounded growth
5. **Use callbacks:** Don't poll state, use `onAssistantSpeakingChange`
6. **Platform detection:** Rely on `isIOS()` for platform-specific code
7. **Error handling:** Wrap audio operations in try-catch

## Future API Extensions

Potential additions for future versions:

```javascript
// Volume control
audioProcessor.setMasterVolume(0.5); // 0.0 to 1.0

// Noise gate control
audioProcessor.setNoiseGate(0.01); // threshold

// Echo cancellation
audioProcessor.enableEchoCancellation(true);

// Voice enhancement
audioProcessor.enableVoiceEnhancement(true);

// Custom filters
audioProcessor.addCustomFilter(filterNode);
```
