/**
 * @file recorderjs-plugin.js
 * @since 1.1.0
 */

const RecordEngine = videojs.getComponent('RecordEngine');

/**
 * Audio-only engine for the recorder.js library.
 *
 * @class
 * @augments videojs.RecordEngine
 */
class RecorderjsEngine extends RecordEngine {
    /**
     * Setup recording engine.
     */
    setup(stream, mediaType, debug) {
        this.inputStream = stream;
        this.mediaType = mediaType;
        this.debug = debug;

        this.audioContext = new AudioContext();
        this.audioSourceNode = this.audioContext.createMediaStreamSource(
            this.inputStream);

        // setup recorder.js
        this.engine = new Recorder(this.audioSourceNode, {
            bufferLen: this.bufferSize,
            numChannels: this.audioChannels
        });
    }

    /**
     * Start recording.
     */
    start() {
        this.engine.record();
    }

    /**
     * Stop recording.
     */
    stop() {
        this.engine.stop();

        this.engine.exportWAV(this.onStopRecording.bind(this));

        this.engine.clear();
    }
}

// expose plugin
videojs.RecorderjsEngine = RecorderjsEngine;

export default RecorderjsEngine;
