/**
 * Fixed Audio Processing Module
 * Proper speech detection and stable audio streaming
 */

class AudioProcessor {
  constructor() {
    // Audio context and nodes
    this.audioContext = null;
    this.audioWorkletNode = null;
    
    // ScriptProcessor-based playback system
    this.playbackProcessor = null;
    this.playbackBufferQueue = [];
    this.playbackBufferOffset = 0;
    this.masterGainNode = null;
    
    // Audio buffering control
    this.audioBufferingStarted = false;
    this.minBufferChunks = 2;
    this.audioStreamComplete = false;
    
    // State management
    this.assistantSpeaking = false;
    
    // Internal mic mute (for initial greeting)
    this.internalMicMuted = false;
    this.initialMuteTimeout = null;
    
    // Audio processing parameters
    this.volumeGain = 1.0;
    this.compressionThreshold = 0.8;
    this.compressionRatio = 0.7;
    
    // Audio streaming optimization
    this.audioChunkCount = 0;
    this.lastTransmitTime = 0;
    this.transmitInterval = 20; // Reduced from 30ms to 20ms for faster response
    this.silenceThreshold = 0.008; // Reduced from 0.01 to make detection more sensitive
    
    // Speech detection
    this.speechStartTime = 0;
    this.silenceDuration = 0;
    this.lastAudioLevel = 0;
    this.isSpeaking = false;
    this.speechTimeout = null;
    this.silenceEndThreshold = 300; // Reduced from 500ms to 300ms for faster processing
    this.speechStartThreshold = 0.012; // Slightly higher threshold for speech start to avoid false positives
    this.responseTimeout = null; // Timeout for AI response
    
    // Callbacks
    this.onAssistantSpeakingChange = null;
    this.onUserSpeechStateChange = null; // New callback for speech state
  }

  /**
   * Initialize audio context
   */
  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 24000,
        latencyHint: 'interactive'
      });
    }
    return this.audioContext;
  }

  /**
   * Setup playback processor
   */
  setupPlaybackProcessor() {
    console.log("🎵 [AudioProcessor] Setting up playback processor...");
    
    if (!this.audioContext) {
      console.error("❌ [AudioProcessor] No audio context available!");
      return;
    }
    
    this.teardownPlaybackProcessor();
    
    // Reset buffer state
    this.playbackBufferQueue = [];
    this.playbackBufferOffset = 0;
    
    // Create master gain node
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.gain.setValueAtTime(1.0, this.audioContext.currentTime);
    this.masterGainNode.connect(this.audioContext.destination);
    
    // Create ScriptProcessor for audio processing
    this.playbackProcessor = this.audioContext.createScriptProcessor(2048, 1, 1);
    this.playbackProcessor.onaudioprocess = (event) => this.handlePlaybackProcess(event);
    this.playbackProcessor.connect(this.masterGainNode);
    
    console.log("✅ [AudioProcessor] Playback processor setup complete");
  }

  /**
   * Teardown playback processor
   */
  teardownPlaybackProcessor() {
    if (this.playbackProcessor) {
      this.playbackProcessor.disconnect();
      this.playbackProcessor = null;
    }
    
    // Reset buffer state
    this.playbackBufferQueue = [];
    this.playbackBufferOffset = 0;
    this.audioBufferingStarted = false;
    this.audioStreamComplete = false;
  }

  /**
   * Schedule audio chunk
   */
  scheduleAudioChunk(pcmBuffer) {
    if (!this.audioContext) {
      console.warn("⚠️ [AudioProcessor] scheduleAudioChunk: No audio context");
      return;
    }
    
    if (!this.playbackProcessor) {
      this.setupPlaybackProcessor();
    }
    
    const float32 = this.pcm16ToFloat32(pcmBuffer);
    
    if (float32.length === 0) {
      console.warn("⚠️ [AudioProcessor] Empty audio buffer received");
      return;
    }
    
    this.playbackBufferQueue.push(float32);
    
    // Start audio when we have enough buffered chunks
    if (!this.audioBufferingStarted && this.playbackBufferQueue.length >= this.minBufferChunks) {
      this.audioBufferingStarted = true;
      console.log("🎬 [AudioProcessor] Starting audio playback!");
      this.setAssistantSpeaking(true);
    }
  }

  /**
   * Handle playback processing
   */
  handlePlaybackProcess(event) {
    const output = event.outputBuffer.getChannelData(0);
    let offset = 0;
    
    // Start playback immediately if we have any audio data
    if (!this.audioBufferingStarted && this.playbackBufferQueue.length > 0) {
      this.audioBufferingStarted = true;
      this.setAssistantSpeaking(true);
    }
    
    // Wait for buffering if needed
    if (!this.audioBufferingStarted && !this.audioStreamComplete) {
      output.fill(0);
      return;
    }
    
    while (offset < output.length) {
      if (this.playbackBufferQueue.length === 0) {
        // No more audio data - fill with silence
        output.fill(0, offset);
        if (this.assistantSpeaking) {
          this.audioBufferingStarted = false;
          this.setAssistantSpeaking(false);
        }
        return;
      }
      
      const currentBuffer = this.playbackBufferQueue[0];
      const remaining = currentBuffer.length - this.playbackBufferOffset;
      const samplesToCopy = Math.min(remaining, output.length - offset);
      
      // Copy samples with minimal processing
      for (let i = 0; i < samplesToCopy; i++) {
        let sample = currentBuffer[this.playbackBufferOffset + i] * this.volumeGain;
        
        // Soft compression
        const absSample = Math.abs(sample);
        if (absSample > this.compressionThreshold) {
          const excess = absSample - this.compressionThreshold;
          const compressed = this.compressionThreshold + excess * this.compressionRatio;
          sample = Math.sign(sample) * compressed;
        }
        
        output[offset + i] = Math.max(-0.98, Math.min(0.98, sample));
      }
      
      offset += samplesToCopy;
      this.playbackBufferOffset += samplesToCopy;
      
      // Move to next buffer if current one is finished
      if (this.playbackBufferOffset >= currentBuffer.length) {
        this.playbackBufferQueue.shift();
        this.playbackBufferOffset = 0;
      }
    }
  }

  /**
   * Convert PCM16 to Float32
   */
  pcm16ToFloat32(pcmBuffer) {
    const pcm16 = new Int16Array(pcmBuffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) {
      float32[i] = pcm16[i] / 32768;
    }
    return float32;
  }

  /**
   * Convert Float32 to PCM16
   */
  convertFloat32ToPCM16(float32Array) {
    const pcm16 = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const sample = Math.max(-1, Math.min(1, float32Array[i]));
      pcm16[i] = sample * 32767;
    }
    return pcm16.buffer;
  }

  /**
   * Start audio streaming with proper speech detection
   */
  startAudioStreaming(mediaStream, ws, getConnectionState) {
    console.log("🎤 [AudioProcessor] Starting audio streaming with speech detection...");
    
    if (!this.audioContext) {
      console.error("❌ [AudioProcessor] No audio context for streaming!");
      return;
    }
    
    // Reset streaming state
    this.audioChunkCount = 0;
    this.lastTransmitTime = 0;
    this.isSpeaking = false;
    this.silenceDuration = 0;
    this.speechStartTime = 0;
    
    const source = this.audioContext.createMediaStreamSource(mediaStream);
    const processor = this.audioContext.createScriptProcessor(1024, 1, 1);
    
    processor.onaudioprocess = (e) => {
      // Get current connection state
      const isConnected = typeof getConnectionState === 'function' ? getConnectionState() : getConnectionState;
      
      // Immediate check for connection and mute state
      if (!isConnected || !ws || ws.readyState !== WebSocket.OPEN || this.internalMicMuted) {
        return;
      }
      
      const now = Date.now();
      const inputData = e.inputBuffer.getChannelData(0);
      
      // Calculate audio level (RMS)
      let sumSquares = 0;
      for (let i = 0; i < inputData.length; i++) {
        sumSquares += inputData[i] * inputData[i];
      }
      const rms = Math.sqrt(sumSquares / inputData.length);
      this.lastAudioLevel = rms;
      
      // Speech detection logic - optimized for responsiveness
      const isSpeechDetected = rms > this.silenceThreshold;
      const isSpeechStart = rms > this.speechStartThreshold;
      const currentTime = Date.now();
      
      if (isSpeechStart && !this.isSpeaking) {
        // Speech started - use higher threshold to avoid false positives
        this.isSpeaking = true;
        this.speechStartTime = currentTime;
        this.silenceDuration = 0;
        console.log("🎤 [SPEECH] Speech detected - starting transmission");
        
        // Notify about speech start immediately
        if (this.onUserSpeechStateChange) {
          this.onUserSpeechStateChange(true);
        }
        
        // Send speech start event to server
        try {
          ws.send(JSON.stringify({ type: "input_audio_buffer.speech_started" }));
        } catch (error) {
          console.warn("⚠️ [AudioProcessor] Failed to send speech_started:", error);
        }
      }
      
      if (this.isSpeaking) {
        if (isSpeechDetected) {
          // Reset silence duration while speech continues
          this.silenceDuration = 0;
        } else {
          // Accumulate silence during speech
          this.silenceDuration += e.inputBuffer.duration * 1000; // Convert to ms
          
          // If silence continues for more than threshold, consider speech ended
          if (this.silenceDuration > this.silenceEndThreshold) {
            console.log(`🔇 [SPEECH] Speech ended - silence detected (${this.silenceDuration.toFixed(0)}ms)`);
            this.isSpeaking = false;
            this.silenceDuration = 0;
            
            // Notify about speech end immediately
            if (this.onUserSpeechStateChange) {
              this.onUserSpeechStateChange(false);
            }
            
            // Send speech stopped event only - server will handle AI response automatically
            try {
              ws.send(JSON.stringify({ type: "input_audio_buffer.speech_stopped" }));
              console.log("📤 [SPEECH] Sent input_audio_buffer.speech_stopped - server will trigger AI response automatically");
            } catch (error) {
              console.error("❌ [SPEECH] Error sending speech_stopped:", error);
            }
          }
        }
      }
      
      // Transmit audio more efficiently
      if (this.isSpeaking && (now - this.lastTransmitTime) >= this.transmitInterval) {
        const pcm16 = this.convertFloat32ToPCM16(inputData);
        const base64Audio = this.arrayBufferToBase64(pcm16);
        
        // Reduced verbose logging
        if (this.audioChunkCount < 2) {
          console.log(`📤 [AudioProcessor] Transmitting audio, level: ${rms.toFixed(4)}`);
        }
        this.audioChunkCount++;
        
        try {
          ws.send(
            JSON.stringify({
              type: "audio",
              audio: base64Audio,
            })
          );
          this.lastTransmitTime = now;
        } catch (error) {
          console.warn("⚠️ [AudioProcessor] WebSocket send error:", error);
        }
      }
    };
    
    // Connect processing chain
    source.connect(processor);
    
    // Connect to destination but with zero gain to prevent feedback
    const silentGain = this.audioContext.createGain();
    silentGain.gain.value = 0;
    processor.connect(silentGain);
    silentGain.connect(this.audioContext.destination);
    
    this.audioWorkletNode = processor;
    
    console.log("✅ [AudioProcessor] Audio streaming with speech detection setup complete");
  }

  /**
   * Enable initial mic mute
   */
  enableInitialMute() {
    this.internalMicMuted = true;
    console.log("🔇 [INTERNAL] Mic muted for initial greeting");
    
    if (this.initialMuteTimeout) {
      clearTimeout(this.initialMuteTimeout);
    }
    
    this.initialMuteTimeout = setTimeout(() => {
      this.internalMicMuted = false;
      console.log("🎤 [INTERNAL] Mic unmuted - ready for user input");
    }, 2000);
  }

  /**
   * Clear initial mute timeout
   */
  clearInitialMute() {
    if (this.initialMuteTimeout) {
      clearTimeout(this.initialMuteTimeout);
      this.initialMuteTimeout = null;
    }
    this.internalMicMuted = false;
    console.log("🎤 [INTERNAL] Mic unmuted immediately");
  }

  /**
   * Force stop speech detection (call this when AI starts responding)
   */
  forceStopSpeechDetection() {
    if (this.isSpeaking) {
      console.log("🛑 [SPEECH] Force stopping speech detection");
      this.isSpeaking = false;
      this.silenceDuration = 0;
      
      if (this.onUserSpeechStateChange) {
        this.onUserSpeechStateChange(false);
      }
    }
  }

  /**
   * Reset speech detection for faster response
   */
  resetSpeechDetection() {
    console.log("🔄 [SPEECH] Resetting speech detection state");
    this.isSpeaking = false;
    this.silenceDuration = 0;
    this.speechStartTime = 0;
    this.lastAudioLevel = 0;
    this.audioChunkCount = 0;
    
    // Clear any pending response timeout
    if (this.responseTimeout) {
      clearTimeout(this.responseTimeout);
      this.responseTimeout = null;
    }
  }

  /**
   * Stop all scheduled audio
   */
  stopAllScheduledAudio(options = {}) {
    const preserveStatus = options.preserveStatus === true;
    
    // Clear buffer queue and state
    this.playbackBufferQueue = [];
    this.playbackBufferOffset = 0;
    this.audioBufferingStarted = false;
    this.audioStreamComplete = false;
    
    // Reset speech detection
    this.isSpeaking = false;
    this.silenceDuration = 0;
    
    this.setAssistantSpeaking(false, preserveStatus);
  }

  /**
   * Set assistant speaking state
   */
  setAssistantSpeaking(isSpeaking, preserveStatus = false) {
    if (this.assistantSpeaking === isSpeaking) {
      return;
    }
    this.assistantSpeaking = isSpeaking;
    
    // When assistant starts speaking, force stop user speech detection
    if (isSpeaking) {
      this.forceStopSpeechDetection();
      
      // Clear response timeout since AI is now responding
      if (this.responseTimeout) {
        clearTimeout(this.responseTimeout);
        this.responseTimeout = null;
        console.log("✅ [TIMEOUT] Cleared response timeout - AI is responding");
      }
    }
    
    // Call callback if provided
    if (this.onAssistantSpeakingChange) {
      this.onAssistantSpeakingChange(isSpeaking, preserveStatus);
    }
  }

  /**
   * Convert ArrayBuffer to Base64
   */
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Convert Base64 to ArrayBuffer
   */
  base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Close audio context
   */
  async closeAudioContext() {
    this.clearInitialMute();
    this.forceStopSpeechDetection();
    
    // Clear response timeout
    if (this.responseTimeout) {
      clearTimeout(this.responseTimeout);
      this.responseTimeout = null;
    }
    
    // Teardown playback processor
    this.teardownPlaybackProcessor();
    
    // Clean up input audio context
    if (this.audioWorkletNode) {
      try {
        this.audioWorkletNode.disconnect();
      } catch (e) {
        console.warn("⚠️ [AudioProcessor] Error disconnecting audio worklet:", e);
      }
      this.audioWorkletNode = null;
    }
    
    if (this.audioContext) {
      try {
        await this.audioContext.close();
      } catch (error) {
        console.warn("⚠️ [AudioProcessor] Error closing audio context:", error);
      }
      this.audioContext = null;
    }
  }

  /**
   * Get current audio state for debugging
   */
  getAudioState() {
    return {
      audioBufferingStarted: this.audioBufferingStarted,
      playbackBufferQueueLength: this.playbackBufferQueue.length,
      assistantSpeaking: this.assistantSpeaking,
      internalMicMuted: this.internalMicMuted,
      isSpeaking: this.isSpeaking,
      silenceDuration: this.silenceDuration,
      lastAudioLevel: this.lastAudioLevel
    };
  }
}

// Make AudioProcessor available globally
if (typeof window !== 'undefined') {
  window.AudioProcessor = AudioProcessor;
}