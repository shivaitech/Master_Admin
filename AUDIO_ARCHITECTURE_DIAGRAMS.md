# Audio Processing Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ShivAI Widget                                │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                    AudioProcessor Class                      │    │
│  │                      (Embedded Module)                       │    │
│  ├────────────────────────────────────────────────────────────┤    │
│  │                                                              │    │
│  │  ┌────────────────┐         ┌──────────────────┐          │    │
│  │  │ Input Pipeline │         │ Output Pipeline  │          │    │
│  │  │                │         │                  │          │    │
│  │  │  Microphone    │         │   WebSocket      │          │    │
│  │  │      ↓         │         │       ↓          │          │    │
│  │  │  High-Pass     │         │  PCM16 Decode    │          │    │
│  │  │   Filter       │         │       ↓          │          │    │
│  │  │      ↓         │         │  Float32 Array   │          │    │
│  │  │  Mute Check    │         │       ↓          │          │    │
│  │  │      ↓         │         │  Buffer Queue    │          │    │
│  │  │  PCM16         │         │       ↓          │          │    │
│  │  │   Encode       │         │   Fixed Gain     │          │    │
│  │  │      ↓         │         │     (7.0x)       │          │    │
│  │  │  WebSocket     │         │       ↓          │          │    │
│  │  │                │         │  Tanh Limiter    │          │    │
│  │  └────────────────┘         │       ↓          │          │    │
│  │                              │  Master Gain     │          │    │
│  │                              │  (8.0x / 3.0x)   │          │    │
│  │                              │       ↓          │          │    │
│  │                              │   Speakers       │          │    │
│  │                              └──────────────────┘          │    │
│  │                                                              │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │                      Widget UI Layer                         │    │
│  │  - Status updates                                           │    │
│  │  - User interactions                                        │    │
│  │  - WebSocket management                                     │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Input Processing Flow

```
┌──────────────┐
│  Microphone  │
└──────┬───────┘
       │
       ↓
┌─────────────────────────────────┐
│   MediaStreamSource Node        │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   High-Pass Filter              │
│   - Type: highpass              │
│   - Frequency: 80 Hz            │
│   - Q: 0.5                      │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   ScriptProcessor (4096)        │
│   ┌───────────────────────┐     │
│   │ onaudioprocess:       │     │
│   │                       │     │
│   │ 1. Check mute state   │     │
│   │ 2. Float32 → PCM16    │     │
│   │ 3. Base64 encode      │     │
│   │ 4. WebSocket.send()   │     │
│   └───────────────────────┘     │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   Silent Gain Node              │
│   - Gain: 0.0                   │
│   - Prevents feedback           │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   AudioContext.destination      │
│   (No playback, keeps active)   │
└─────────────────────────────────┘
```

## Output Processing Flow

```
┌──────────────┐
│  WebSocket   │
│  PCM16 Data  │
└──────┬───────┘
       │
       ↓
┌─────────────────────────────────┐
│   Base64 Decode                 │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   PCM16 → Float32 Conversion    │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   Playback Buffer Queue         │
│   - Array of Float32Arrays      │
│   - Min 3 chunks before start   │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   ScriptProcessor (4096)        │
│   ┌───────────────────────┐     │
│   │ onaudioprocess:       │     │
│   │                       │     │
│   │ 1. Pull from queue    │     │
│   │ 2. Fixed gain (7.0x)  │     │
│   │ 3. Tanh limiting      │     │
│   │    - Soft: 0.85       │     │
│   │    - Hard: 0.98       │     │
│   │ 4. Output samples     │     │
│   └───────────────────────┘     │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   Master Gain Node              │
│   - iOS: 8.0x                   │
│   - Others: 3.0x                │
└─────────┬───────────────────────┘
          │
          ↓
┌─────────────────────────────────┐
│   AudioContext.destination      │
│   (Speakers)                    │
└─────────────────────────────────┘
```

## Total Amplification Calculation

```
┌─────────────────────────────────────────────────────────────┐
│                    iOS Devices                               │
│                                                              │
│  Input: -1.0 to +1.0 (normalized Float32)                   │
│                                                              │
│  Step 1: Base Gain                                          │
│    Value: 7.0x                                              │
│    Range: -7.0 to +7.0                                      │
│                                                              │
│  Step 2: Tanh Limiting                                      │
│    Soft limit: 0.85 (start of curve)                        │
│    Hard limit: 0.98 (maximum)                               │
│    Range: -0.98 to +0.98                                    │
│                                                              │
│  Step 3: Master Gain (iOS)                                  │
│    Value: 8.0x                                              │
│    Effective: 7.0 × 8.0 = 56x total amplification           │
│    (before limiting)                                        │
│                                                              │
│  Output: Loud, audible in crowds                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Other Devices                               │
│                                                              │
│  Input: -1.0 to +1.0 (normalized Float32)                   │
│                                                              │
│  Step 1: Base Gain                                          │
│    Value: 7.0x                                              │
│    Range: -7.0 to +7.0                                      │
│                                                              │
│  Step 2: Tanh Limiting                                      │
│    Soft limit: 0.85 (start of curve)                        │
│    Hard limit: 0.98 (maximum)                               │
│    Range: -0.98 to +0.98                                    │
│                                                              │
│  Step 3: Master Gain (Others)                               │
│    Value: 3.0x                                              │
│    Effective: 7.0 × 3.0 = 21x total amplification           │
│    (before limiting)                                        │
│                                                              │
│  Output: Standard volume                                    │
└─────────────────────────────────────────────────────────────┘
```

## State Machine Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   Call State Machine                         │
└─────────────────────────────────────────────────────────────┘

    ┌──────────────┐
    │ Disconnected │
    └──────┬───────┘
           │ User clicks "Connect"
           ↓
    ┌──────────────┐
    │  Connecting  │
    └──────┬───────┘
           │ WebSocket.onopen
           ↓
    ┌──────────────┐
    │   Connected  │ ← ← ← ← ← ← ← ┐
    │              │                 │
    │ Internal     │                 │
    │ Mic Muted    │                 │
    │ (3 seconds)  │                 │
    └──────┬───────┘                 │
           │ Timeout                 │
           ↓                         │
    ┌──────────────┐                 │
    │   Ready      │ ← ← ← ┐         │
    │              │       │         │
    │ Mic Active   │       │         │
    │ Awaiting     │       │         │
    │ User Input   │       │         │
    └──────┬───────┘       │         │
           │ speech_started│         │
           ↓               │         │
    ┌──────────────┐       │         │
    │  Listening   │       │         │
    │              │       │         │
    │ User         │       │         │
    │ Speaking     │       │         │
    └──────┬───────┘       │         │
           │ speech_stopped│         │
           ↓               │         │
    ┌──────────────┐       │         │
    │  Processing  │       │         │
    │              │       │         │
    │ AI Thinking  │       │         │
    └──────┬───────┘       │         │
           │ audio chunks  │         │
           ↓               │         │
    ┌──────────────┐       │         │
    │   Speaking   │       │         │
    │              │       │         │
    │ AI Playing   │       │         │
    │ Audio        │       │         │
    └──────┬───────┘       │         │
           │ audio complete│         │
           └───────────────┘         │
           │ User interrupts         │
           │ (speech_started)        │
           └─────────────────────────┘
```

## Buffer Queue Visualization

```
┌─────────────────────────────────────────────────────────────┐
│              Playback Buffer Queue                           │
└─────────────────────────────────────────────────────────────┘

Time ───────────────────────────────────────────────────────→

┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ Chunk 1 │  │ Chunk 2 │  │ Chunk 3 │  │ Chunk 4 │  ...
│ (4096)  │  │ (4096)  │  │ (4096)  │  │ (4096)  │
└────┬────┘  └─────────┘  └─────────┘  └─────────┘
     │
     └──► Currently Playing
     
┌─────────────────────────────────────────────────────────────┐
│ Minimum 3 chunks buffered before playback starts            │
│ Prevents stuttering and ensures smooth audio                │
└─────────────────────────────────────────────────────────────┘

State Flow:
1. WebSocket receives PCM16 data
2. Convert to Float32Array (Chunk)
3. Push to queue
4. If queue.length >= 3 → Start playback
5. ScriptProcessor pulls samples from Chunk 1
6. When Chunk 1 exhausted → Shift queue, move to Chunk 2
7. Repeat until queue empty
8. Set assistantSpeaking = false
```

## Tanh Limiting Curve

```
┌─────────────────────────────────────────────────────────────┐
│              Smooth Tanh Limiting Curve                      │
└─────────────────────────────────────────────────────────────┘

Output
  ↑
1.0├─────────────────────────────────╭─────── Hard Limit (0.98)
   │                             ╭───┤
0.9│                         ╭───╯   │
   │                     ╭───╯       │
0.8├─────────────────╭───┴───────── Soft Limit (0.85)
   │             ╭───╯
0.7│         ╭───╯
   │     ╭───╯
0.6│ ╭───╯
   │╭╯
0.5├┤ Linear Region
   │
   └─────────────────────────────────────────────────→ Input
   0   0.5  0.85      1.0      2.0      5.0      7.0

Key Points:
- Below 0.85: Linear (no limiting)
- 0.85 - 0.98: Smooth tanh curve (gradual compression)
- Above 0.98: Hard clip (safety limit)

Benefits:
✓ No harsh clipping artifacts
✓ Smooth volume transitions
✓ Preserves audio quality
✓ Prevents speaker damage
```

## Class Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                     AudioProcessor                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Properties:                                                 │
│  ├─ audioContext          : AudioContext                    │
│  ├─ masterGainNode        : GainNode                        │
│  ├─ playbackProcessor     : ScriptProcessorNode             │
│  ├─ audioWorkletNode      : ScriptProcessorNode             │
│  ├─ playbackBufferQueue   : Float32Array[]                  │
│  ├─ playbackBufferOffset  : number                          │
│  ├─ audioBufferingStarted : boolean                         │
│  ├─ audioStreamComplete   : boolean                         │
│  ├─ assistantSpeaking     : boolean                         │
│  ├─ minBufferChunks       : number                          │
│  ├─ internalMicMuted      : boolean                         │
│  ├─ initialMuteTimeout    : number                          │
│  └─ onAssistantSpeakingChange : (bool, bool) => void        │
│                                                              │
│  Methods:                                                    │
│  ├─ initAudioContext()                                      │
│  ├─ isIOS()                                                 │
│  ├─ setupPlaybackProcessor()                                │
│  ├─ teardownPlaybackProcessor()                             │
│  ├─ handlePlaybackProcess(event)                            │
│  ├─ scheduleAudioChunk(pcmBuffer)                           │
│  ├─ pcm16ToFloat32(pcmBuffer)                               │
│  ├─ convertFloat32ToPCM16(float32Array)                     │
│  ├─ startAudioStreaming(mediaStream, ws, isConnected)       │
│  ├─ enableInitialMute()                                     │
│  ├─ clearInitialMute()                                      │
│  ├─ stopAllScheduledAudio(preserveStatus)                   │
│  ├─ setAssistantSpeaking(isSpeaking, preserveStatus)        │
│  ├─ arrayBufferToBase64(buffer)                             │
│  ├─ base64ToArrayBuffer(base64)                             │
│  └─ closeAudioContext()                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│                    widget2.js Integration                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────┐              ┌──────────────────┐
│   Widget UI     │              │ AudioProcessor   │
│                 │              │                  │
│  connectBtn     │─── init ───→ │ initAudioContext │
│                 │              │                  │
│  ws.onopen      │─── call ───→ │ enableInitialMute│
│                 │              │                  │
│  ws.onopen      │─── call ───→ │ startStreaming   │
│                 │              │                  │
│  ws.onmessage   │─── audio ──→ │ scheduleChunk    │
│  (type: audio)  │              │                  │
│                 │              │                  │
│  ws.onmessage   │─── stop ───→ │ stopAllScheduled │
│  (speech_start) │              │                  │
│                 │              │                  │
│  disconnect()   │─── close ──→ │ closeAudioContext│
│                 │              │                  │
│                 │ ←── callback │ onSpeakingChange │
│  updateStatus() │              │                  │
│                 │              │                  │
└─────────────────┘              └──────────────────┘
```

## File Structure

```
Master_Admin/
├── public/
│   ├── widget2.js ⭐ Main widget file
│   │   ├── Lines 9-270: AudioProcessor Class
│   │   ├── Lines 271+: Widget UI code
│   │   └── Integration points throughout
│   │
│   └── audioProcessor.js (Optional standalone reference)
│
├── AUDIO_PROCESSING_MODULARIZATION.md
│   └── Detailed implementation documentation
│
├── AUDIO_PROCESSOR_API.md
│   └── Complete API reference
│
└── AUDIO_INTEGRATION_SUMMARY.md
    └── High-level overview
```

## Performance Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  Audio Processing Timeline                   │
└─────────────────────────────────────────────────────────────┘

User speaks
    ↓
  [~0ms]  Microphone captures
    ↓
  [~20ms] High-pass filter + ScriptProcessor
    ↓
  [~5ms]  PCM16 encode + Base64
    ↓
  [~50ms] WebSocket send + Network latency
    ↓
  [Server processes]
    ↓
  [~50ms] WebSocket receive + Network latency
    ↓
  [~5ms]  Base64 decode + PCM16 to Float32
    ↓
  [~30ms] Buffer 3 chunks (wait for minimum buffer)
    ↓
  [~20ms] ScriptProcessor + Gain + Limiting
    ↓
  [~0ms]  Speakers play
    ↓
User hears AI response

Total latency: ~180ms (excluding server processing)
```

## Thread Model

```
┌─────────────────────────────────────────────────────────────┐
│                      Thread Architecture                     │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│    Main Thread       │         │   Audio Thread       │
│                      │         │  (Web Audio API)     │
│  - UI updates        │         │                      │
│  - WebSocket I/O     │         │  - Input processing  │
│  - State management  │         │  - Output processing │
│  - Event handling    │         │  - Real-time DSP     │
│                      │         │                      │
│  audioProcessor.     │         │  onaudioprocess      │
│  scheduleAudioChunk()│────────→│  callbacks           │
│                      │         │                      │
│  audioProcessor.     │         │                      │
│  onSpeakingChange() ←│─────────│  State changes       │
│                      │         │                      │
└──────────────────────┘         └──────────────────────┘

⚠️  Cross-thread communication happens via callbacks
✓  Main thread: Business logic, network I/O
✓  Audio thread: Real-time audio processing only
```

---

**Last Updated:** December 2024  
**Status:** ✅ Production Ready
