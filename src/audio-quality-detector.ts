/** Accumulate sample statistics in a single pass */
function accumulateSampleStats(audioData: Float32Array) {
    let sum = 0;
    let peak = 0;
    let silentSamples = 0;
    let clippingSamples = 0;
    let min = 1;
    const threshold = 0.01;
    const clippingThreshold = 0.95;

    for (let i = 0; i < audioData.length; i++) {
        const abs = Math.abs(audioData[i]);
        sum += abs;
        if (abs > peak) {peak = abs;}
        if (abs < min && abs > 0) {min = abs;}
        if (abs < threshold) {silentSamples++;}
        if (abs > clippingThreshold) {clippingSamples++;}
    }

    return { sum, peak, min, silentSamples, clippingSamples, threshold };
}

const AUDIO_TYPES = [
    'audio/webm', 'audio/webm;codecs=opus', 'audio/webm;codecs=pcm',
    'audio/mp4', 'audio/mp4;codecs=mp4a.40.2', 'audio/wav',
    'audio/ogg;codecs=opus', 'audio/mpeg'
];

function detectSupportedTypes(): string[] {
    if (!('MediaRecorder' in window)) {return [];}
    return AUDIO_TYPES.filter(type => MediaRecorder.isTypeSupported(type));
}

function detectSampleRates(hasAudioContext: boolean): number[] {
    if (!hasAudioContext) {return [];}
    const testRates = [8000, 16000, 22050, 44100, 48000, 96000];
    const supported: number[] = [];
    for (const rate of testRates) {
        try {
            const ctx = new (window.AudioContext || (window as unknown as Record<string, unknown>).webkitAudioContext as typeof AudioContext)({ sampleRate: rate });
            if (ctx.sampleRate === rate) {supported.push(rate);}
            ctx.close();
        } catch (_) {
            // Ignore audio context cleanup errors
        }
    }
    return supported;
}

async function detectAudioConstraints(hasGetUserMedia: boolean): Promise<MediaTrackConstraints> {
    if (!hasGetUserMedia) {return {};}
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const track = stream.getAudioTracks()[0];
        const constraints = track.getConstraints();
        const settings = track.getSettings();
        stream.getTracks().forEach(t => t.stop());
        return { ...constraints, ...settings };
    } catch (_e) {
        return {};
    }
}

export class AudioQualityDetector {
    static analyzeBuffer(audioData: Float32Array): {
        hasSound: boolean;
        avgVolume: number;
        peakVolume: number;
        silenceRatio: number;
        clippingRatio: number;
        dynamicRange: number;
    } {
        const stats = accumulateSampleStats(audioData);
        const avgVolume = stats.sum / audioData.length;
        const silenceRatio = stats.silentSamples / audioData.length;
        const clippingRatio = stats.clippingSamples / audioData.length;
        const dynamicRange = stats.peak > 0 && stats.min > 0 ? 20 * Math.log10(stats.peak / stats.min) : 0;

        return {
            hasSound: avgVolume > stats.threshold && silenceRatio < 0.9,
            avgVolume,
            peakVolume: stats.peak,
            silenceRatio,
            clippingRatio,
            dynamicRange
        };
    }

    static async runDiagnostics(): Promise<{
        mediaDevices: boolean;
        getUserMedia: boolean;
        audioContext: boolean;
        audioWorklet: boolean;
        mediaRecorder: boolean;
        supportedTypes: string[];
        audioConstraints: MediaTrackConstraints;
        sampleRates: number[];
    }> {
        const diagnostics = {
            mediaDevices: 'mediaDevices' in navigator,
            getUserMedia: 'getUserMedia' in navigator.mediaDevices,
            audioContext: 'AudioContext' in window || 'webkitAudioContext' in window,
            audioWorklet: 'AudioWorklet' in window,
            mediaRecorder: 'MediaRecorder' in window,
            supportedTypes: [] as string[],
            audioConstraints: {} as MediaTrackConstraints,
            sampleRates: [] as number[]
        };

        diagnostics.supportedTypes = detectSupportedTypes();
        diagnostics.sampleRates = detectSampleRates(diagnostics.audioContext);
        diagnostics.audioConstraints = await detectAudioConstraints(diagnostics.getUserMedia);

        return diagnostics;
    }

    static calculateNoiseFloor(audioData: Float32Array): number {
        const sorted = Array.from(audioData)
            .map(v => Math.abs(v))
            .sort((a, b) => a - b);

        const index = Math.floor(sorted.length * 0.1);
        return sorted[index];
    }

    static applyNoiseGate(audioData: Float32Array, threshold: number = 0.01): Float32Array {
        const result = new Float32Array(audioData.length);
        const noiseFloor = this.calculateNoiseFloor(audioData);
        const gateThreshold = Math.max(noiseFloor * 2, threshold);

        for (let i = 0; i < audioData.length; i++) {
            result[i] = Math.abs(audioData[i]) > gateThreshold ? audioData[i] : 0;
        }

        return result;
    }

    static normalizeAudio(audioData: Float32Array, targetPeak: number = 0.95): Float32Array {
        const quality = this.analyzeBuffer(audioData);

        if (quality.clippingRatio > 0.01) {
            return audioData;
        }

        if (quality.peakVolume < 0.05) {
            return audioData;
        }

        const scaleFactor = targetPeak / quality.peakVolume;
        const result = new Float32Array(audioData.length);

        for (let i = 0; i < audioData.length; i++) {
            result[i] = Math.max(-1, Math.min(1, audioData[i] * scaleFactor));
        }

        return result;
    }
}