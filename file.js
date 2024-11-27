const distortion = new Tone.Distortion(4.8).toDestination();
const delay = new Tone.Delay(0.25).toDestination();
const phaser = new Tone.Phaser({
    frequency:5,
    octaves: 3,
    baseFrequency: 1000
}).toDestination();
const chorus = new Tone.Chorus(5, 1, 3.5).toDestination();
const pingPong = new Tone.PingPongDelay("1n", 0.2).toDestination();

const synth = new Tone.Synth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.5
    }
}).toDestination();

const synth_Delay = new Tone.Synth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.5
    }
}).toDestination().connect(delay);

const synth_Dist = new Tone.Synth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.5
    }
}).toDestination().connect(distortion);

const synth_Ph = new Tone.Synth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.5
    }
}).toDestination().connect(phaser);

const synth_Ch = new Tone.Synth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.5
    }
}).toDestination().connect(chorus);

const synth_Pp = new Tone.Synth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.5,
        release: 0.5
    }
}).toDestination().connect(pingPong);





function playbutton(name) {
    
    const pjanooMelody = [
        { time: "0:0:0", note: "A4", duration: "8n" },
        { time: "0:0:2", note: "C5", duration: "8n" },
        { time: "0:1:0", note: "E5", duration: "8n" },
        { time: "0:1:2", note: "G4", duration: "8n" },
        { time: "0:2:0", note: "A4", duration: "8n" },
        { time: "0:2:2", note: "E5", duration: "8n" },
        { time: "0:3:0", note: "G5", duration: "8n" },
        { time: "0:3:2", note: "F#5", duration: "8n" }
    ];

    
    const melodyPart = new Tone.Part((time, value) => {
        name.triggerAttackRelease(value.note, value.duration, time);
    }, pjanooMelody);

  
    melodyPart.loop = true;
    melodyPart.loopStart = "0:0:0";  
  

    
    const drumKit = new Tone.Players({
        kick: "https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3",
        snare: "https://tonejs.github.io/audio/drum-samples/CR78/snare.mp3",
        hiHat: "https://tonejs.github.io/audio/drum-samples/CR78/hihat.mp3"
    }).toDestination();

    
    const drumPart = new Tone.Part((time, value) => {
        drumKit.player(value.drum).start(time);
    }, [
        { time: "0:0:0", drum: "kick" },
        { time: "0:0:2", drum: "hiHat" },
        { time: "0:1:0", drum: "snare" },
        { time: "0:1:2", drum: "hiHat" },
        { time: "0:2:0", drum: "kick" },
        { time: "0:2:2", drum: "hiHat" },
        { time: "0:3:0", drum: "snare" },
        { time: "0:3:2", drum: "hiHat" }
    ]);

    drumPart.loop = true;
    drumPart.loopStart = "0:0:0";  
    

   
    Tone.Transport.bpm.value = 150; 
    Tone.Transport.start();
    melodyPart.start("0:0:0");
    drumPart.start("0:0:0");
}


document.getElementById('button1').addEventListener('click', () => playbutton(synth));
document.getElementById('button2').addEventListener('click', () => playbutton(synth_Delay));
document.getElementById('button3').addEventListener('click', () => playbutton(synth_Dist));
document.getElementById('button4').addEventListener('click', () => playbutton(synth_Ph));
document.getElementById('button5').addEventListener('click', () => playbutton(synth_Ch));
document.getElementById('button6').addEventListener('click', () => playbutton(synth_Pp));


document.getElementById('stopButton').addEventListener('click', () => {
    Tone.Transport.cancel();
    Tone.Transport.stop();
});

