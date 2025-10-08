let ws = null;
let audioContext = null;
let mediaStream = null;
let audioWorkletNode = null;
let isConnected = false;
let isPlayingAudio = false;
let audioChunksQueue = [];
let currentAudio = null;
let currentAiTranscript = "";

const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const statusDiv = document.getElementById('status');
const transcriptContainer = document.getElementById('transcriptContainer');

connectBtn.addEventListener('click', connect);
disconnectBtn.addEventListener('click', disconnect);

async function connect() {
    try {
        // Initialize audio context
        audioContext = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: 24000
        });

        // Resume audio context (required for some browsers)
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        // Request microphone access
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                channelCount: 1,
                sampleRate: 24000,
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            } 
        });

        // Connect to WebSocket
        ws = new WebSocket('ws://localhost:8000/ws');

        ws.onopen = () => {
            console.log('Connected to server');
            isConnected = true;
            updateStatus('connected', 'Connected - Speak now!');
            connectBtn.disabled = true;
            disconnectBtn.disabled = false;
            clearTranscript();
            startAudioCapture();
        };

        ws.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            handleServerMessage(data);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            updateStatus('disconnected', 'Connection error');
        };

        ws.onclose = () => {
            console.log('Disconnected from server');
            cleanup();
        };

    } catch (error) {
        console.error('Error connecting:', error);
        alert('Error: ' + error.message);
        updateStatus('disconnected', 'Connection failed');
    }
}

function disconnect() {
    if (ws) {
        ws.close();
    }
    cleanup();
}

function cleanup() {
    isConnected = false;
    
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    
    if (audioWorkletNode) {
        audioWorkletNode.disconnect();
        audioWorkletNode = null;
    }
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
        audioContext = null;
    }
    
    audioChunksQueue = [];
    isPlayingAudio = false;
    currentAiTranscript = "";
    
    updateStatus('disconnected', 'Disconnected');
    connectBtn.disabled = false;
    disconnectBtn.disabled = true;
}

async function startAudioCapture() {
    const source = audioContext.createMediaStreamSource(mediaStream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);

    processor.onaudioprocess = (e) => {
        if (!isConnected || !ws || ws.readyState !== WebSocket.OPEN) return;

        const inputData = e.inputBuffer.getChannelData(0);
        
        // Convert Float32Array to Int16Array (PCM16)
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        // Convert to base64
        const base64Audio = arrayBufferToBase64(pcm16.buffer);

        // Send to server
        ws.send(JSON.stringify({
            type: 'audio',
            audio: base64Audio
        }));
    };

    source.connect(processor);
    processor.connect(audioContext.destination);
    audioWorkletNode = processor;
}

function handleServerMessage(data) {
    switch (data.type) {
        case 'audio_chunk':
            // Queue audio chunks from ElevenLabs
            audioChunksQueue.push(data.audio);
            
            // Start playing if not already playing
            if (!isPlayingAudio) {
                playQueuedAudio();
            }
            break;
        
        case 'audio_complete':
            // All audio chunks received
            console.log('Audio streaming completed');
            break;
        
        case 'user_transcript':
            addTranscript('user', data.text);
            break;
        
        case 'ai_transcript':
            // Complete AI response text
            addTranscript('ai', data.text);
            currentAiTranscript = "";
            break;
        
        case 'ai_text_delta':
            // Real-time AI text streaming (optional: for live typing effect)
            currentAiTranscript += data.text;
            break;
        
        case 'speech_started':
            updateStatus('speaking', 'Listening...');
            
            // Stop current audio playback when user starts speaking
            stopAudioPlayback();
            break;
        
        case 'speech_stopped':
            updateStatus('connected', 'Processing...');
            break;
        
        case 'response_done':
            updateStatus('connected', 'Connected - Speak now!');
            break;
        
        case 'error':
            console.error('Server error:', data.message);
            updateStatus('disconnected', 'Error: ' + data.message);
            break;
    }
}

async function playQueuedAudio() {
    if (audioChunksQueue.length === 0) {
        isPlayingAudio = false;
        return;
    }

    isPlayingAudio = true;

    try {
        // Collect all available chunks to reduce gaps
        const chunksToPlay = [];
        while (audioChunksQueue.length > 0) {
            chunksToPlay.push(audioChunksQueue.shift());
        }

        // Combine chunks into single blob
        const audioBuffers = chunksToPlay.map(base64 => base64ToArrayBuffer(base64));
        const totalLength = audioBuffers.reduce((acc, buf) => acc + buf.byteLength, 0);
        const combined = new Uint8Array(totalLength);
        
        let offset = 0;
        for (const buffer of audioBuffers) {
            combined.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        }

        // Create and play audio
        const blob = new Blob([combined], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        
        currentAudio = audio;

        audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            currentAudio = null;
            
            // Continue playing if more chunks arrived
            if (audioChunksQueue.length > 0) {
                playQueuedAudio();
            } else {
                isPlayingAudio = false;
            }
        };

        audio.onerror = (error) => {
            console.error('Audio playback error:', error);
            URL.revokeObjectURL(audioUrl);
            currentAudio = null;
            isPlayingAudio = false;
        };

        await audio.play();

    } catch (error) {
        console.error('Error playing audio:', error);
        isPlayingAudio = false;
        
        // Retry if there are more chunks
        if (audioChunksQueue.length > 0) {
            setTimeout(() => playQueuedAudio(), 100);
        }
    }
}

function stopAudioPlayback() {
    // Stop current audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    
    // Clear queue
    audioChunksQueue = [];
    isPlayingAudio = false;
    currentAiTranscript = "";
    
    // Send interrupt signal to backend
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'interrupt'
        }));
    }
}

function addTranscript(speaker, text) {
    if (!text || text.trim() === '') return;
    
    const item = document.createElement('div');
    item.className = `transcript-item ${speaker}`;
    
    const label = document.createElement('div');
    label.className = 'transcript-label';
    label.textContent = speaker === 'user' ? 'You' : 'AI Assistant';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'transcript-text';
    textDiv.textContent = text;
    
    item.appendChild(label);
    item.appendChild(textDiv);
    
    // Clear placeholder if exists
    const firstChild = transcriptContainer.firstChild;
    if (firstChild && firstChild.style && firstChild.style.textAlign === 'center') {
        transcriptContainer.innerHTML = '';
    }
    
    transcriptContainer.appendChild(item);
    transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
}

function clearTranscript() {
    transcriptContainer.innerHTML = '<div style="text-align: center; color: #888;">Conversation started...</div>';
}

function updateStatus(state, message) {
    statusDiv.className = `status ${state}`;
    statusDiv.textContent = message;
}

// Helper functions
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}