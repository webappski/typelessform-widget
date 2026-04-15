import { AudioQualityDetector } from './audio-quality-detector';

/** Merge Float32Array chunks into a single buffer */
function mergeChunks(chunks: Float32Array[]): Float32Array {
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const audioData = new Float32Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        audioData.set(chunk, offset);
        offset += chunk.length;
    }
    return audioData;
}

/** Write a string into a DataView at a given offset */
function writeString(view: DataView, offset: number, str: string): void {
    for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
    }
}

/** Write a standard 44-byte WAV header */
function writeWavHeader(view: DataView, sampleRate: number, length: number, bitsPerSample: number): void {
    const bytesPerSample = bitsPerSample / 8;
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length * bytesPerSample, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * bytesPerSample, true);
    view.setUint16(32, bytesPerSample, true);
    view.setUint16(34, bitsPerSample, true);
    writeString(view, 36, 'data');
    view.setUint32(40, length * bytesPerSample, true);
}

/** Convert Float32Array to 16-bit PCM samples in a DataView starting at offset 44 */
function write16BitSamples(view: DataView, data: Float32Array): void {
    let index = 44;
    for (let i = 0; i < data.length; i++) {
        const sample = Math.max(-1, Math.min(1, data[i]));
        view.setInt16(index, sample * 0x7FFF, true);
        index += 2;
    }
}

/** Convert Float32Array to 24-bit PCM samples in a DataView starting at offset 44 */
function write24BitSamples(view: DataView, data: Float32Array): void {
    let index = 44;
    for (let i = 0; i < data.length; i++) {
        const sample = Math.max(-1, Math.min(1, data[i]));
        const value = Math.floor(sample * 0x7FFFFF);
        view.setUint8(index, value & 0xFF);
        view.setUint8(index + 1, (value >> 8) & 0xFF);
        view.setUint8(index + 2, (value >> 16) & 0xFF);
        index += 3;
    }
}

export class AudioRecorder {
    private audioContext: AudioContext | null = null;
    private mediaStream: MediaStream | null = null;
    private source: MediaStreamAudioSourceNode | null = null;
    private processor: ScriptProcessorNode | null = null;
    private recording = false;
    private recordedChunks: Float32Array[] = [];
    private sampleRate = 48000;

    async startRecording(): Promise<void> {
        const AudioContextClass = window.AudioContext || (window as unknown as Record<string, unknown>).webkitAudioContext as typeof AudioContext;

        if (!AudioContextClass) {
            throw new Error('AudioContext not supported');
        }

        this.audioContext = new AudioContextClass({
            sampleRate: this.sampleRate,
            latencyHint: 'interactive'
        });

        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }


        this.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false,
                sampleRate: this.sampleRate,
                channelCount: 1,
                // Для iOS важно указать конкретное устройство
                deviceId: 'default'
            }
        });

        this.source = this.audioContext.createMediaStreamSource(this.mediaStream);

        const bufferSize = 4096;
        this.processor = this.audioContext.createScriptProcessor(bufferSize, 1, 1);

        this.recordedChunks = [];
        this.recording = true;

        this.processor.onaudioprocess = (e) => {
            if (!this.recording) {return;}

            const inputData = e.inputBuffer.getChannelData(0);
            const chunk = new Float32Array(inputData.length);
            chunk.set(inputData);
            this.recordedChunks.push(chunk);
        };

        this.source.connect(this.processor);
        this.processor.connect(this.audioContext.destination);
    }

    stopRecording(): Blob {
        this.recording = false;

        if (this.processor) {
            this.processor.disconnect();
            this.processor = null;
        }

        if (this.source) {
            this.source.disconnect();
            this.source = null;
        }

        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }

        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }

        return this.createWAVBlob(this.recordedChunks);
    }

    private createWAVBlob(chunks: Float32Array[]): Blob {
        const audioData = mergeChunks(chunks);
        const quality = AudioQualityDetector.analyzeBuffer(audioData);
        const processedData = quality.hasSound ? AudioQualityDetector.normalizeAudio(audioData) : audioData;

        const buffer = new ArrayBuffer(44 + processedData.length * 2);
        const view = new DataView(buffer);
        writeWavHeader(view, this.sampleRate, processedData.length, 16);
        write16BitSamples(view, processedData);

        return new Blob([buffer], { type: 'audio/wav' });
    }
}

// Альтернативный метод с использованием AudioWorklet (более современный)
export class AudioWorkletRecorder {
    private audioContext: AudioContext | null = null;
    private mediaStream: MediaStream | null = null;
    private source: MediaStreamAudioSourceNode | null = null;
    private workletNode: AudioWorkletNode | null = null;
    private recording = false;
    private recordedChunks: Float32Array[] = [];
    private sampleRate = 48000; // Выше качество для iPhone

    async initialize(): Promise<void> {
        const AudioContextClass = window.AudioContext || (window as unknown as Record<string, unknown>).webkitAudioContext as typeof AudioContext;

        if (!AudioContextClass) {
            throw new Error('AudioContext not supported');
        }

        this.audioContext = new AudioContextClass({
            sampleRate: this.sampleRate,
            latencyHint: 'interactive'
        });

        // Для iOS Safari нужно "разбудить" AudioContext
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }

        // Загружаем AudioWorklet процессор
        const processorCode = `
        class RecorderProcessor extends AudioWorkletProcessor {
          constructor() {
            super();
            this.recording = false;
            this.port.onmessage = (e) => {
              if (e.data.command === 'start') {
                this.recording = true;
              } else if (e.data.command === 'stop') {
                this.recording = false;
              }
            };
          }

          process(inputs, outputs, parameters) {
            if (this.recording && inputs[0][0]) {
              const inputData = inputs[0][0];
              const buffer = new Float32Array(inputData.length);
              buffer.set(inputData);
              this.port.postMessage({ audioData: buffer });
            }
            return true;
          }
        }

        registerProcessor('recorder-processor', RecorderProcessor);
      `;

        const blob = new Blob([processorCode], { type: 'application/javascript' });
        const processorUrl = URL.createObjectURL(blob);

        await this.audioContext.audioWorklet.addModule(processorUrl);
        URL.revokeObjectURL(processorUrl);
    }

    async startRecording(): Promise<void> {
        if (!this.audioContext) {
            await this.initialize();
        }

        this.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false,
                sampleRate: this.sampleRate,
                sampleSize: 24, // Высокая битность
                channelCount: 1
            }
        });

        this.source = this.audioContext!.createMediaStreamSource(this.mediaStream);
        this.workletNode = new AudioWorkletNode(this.audioContext!, 'recorder-processor');

        this.recordedChunks = [];
        this.recording = true;

        this.workletNode.port.onmessage = (e) => {
            if (e.data.audioData && this.recording) {
                this.recordedChunks.push(e.data.audioData);
            }
        };

        this.source.connect(this.workletNode);
        this.workletNode.connect(this.audioContext!.destination);
        this.workletNode.port.postMessage({ command: 'start' });
    }

    stopRecording(): Blob {
        this.recording = false;

        if (this.workletNode) {
            this.workletNode.port.postMessage({ command: 'stop' });
            this.workletNode.disconnect();
            this.workletNode = null;
        }

        if (this.source) {
            this.source.disconnect();
            this.source = null;
        }

        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }

        // Создаем высококачественный WAV файл
        return this.createHighQualityWAV(this.recordedChunks);
    }

    private createHighQualityWAV(chunks: Float32Array[]): Blob {
        const audioData = mergeChunks(chunks);
        const quality = AudioQualityDetector.analyzeBuffer(audioData);

        // Apply noise gate if needed, then normalize
        const gated = quality.silenceRatio > 0.3 ? AudioQualityDetector.applyNoiseGate(audioData) : audioData;
        const normalizedData = AudioQualityDetector.normalizeAudio(gated);

        const buffer = new ArrayBuffer(44 + normalizedData.length * 3);
        const view = new DataView(buffer);
        writeWavHeader(view, this.sampleRate, normalizedData.length, 24);
        write24BitSamples(view, normalizedData);

        return new Blob([buffer], { type: 'audio/wav' });
    }
}