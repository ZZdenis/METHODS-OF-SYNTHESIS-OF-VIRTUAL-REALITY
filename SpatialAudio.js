
let context, audioId, mediaElementSource, notchFltr, panner;
function initAudioCtx() {
    audioId = document.getElementById('audio');

    audioId.addEventListener('play', () => {
        if (!context) {
            context = new AudioContext();
            mediaElementSource = context.createMediaElementSource(audioId);
            panner = context.createPanner();
            notchFltr = context.createBiquadFilter();

            mediaElementSource.connect(panner);
            panner.connect(notchFltr);
            notchFltr.connect(context.destination);

            notchFltr.type = 'notch';
            notchFltr.Q.value = 0.1;
            notchFltr.frequency.value = 5000;
            // gain is not used in this filter type
            context.resume();
        }
    })
    audioId.addEventListener('pause', () => {
        console.log('pause');
        context.resume();
    })
    const notchState = document.getElementById('notchState');
    notchState.addEventListener('change', function () {
        if (notchState.checked) {
            panner.disconnect();
            panner.connect(notchFltr);
            notchFltr.connect(context.destination);
        } else {
            panner.disconnect();
            panner.connect(context.destination);
        }
    });
    audioId.play();
}