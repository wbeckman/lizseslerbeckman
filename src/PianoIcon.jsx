import React from 'react';

const PianoIcon = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var context = new AudioContext();
  
  const partial = (func, ...args) => (...remainingArgs) => func(...args, ...remainingArgs);
  function playSound(arr) {
    var buf = new Float32Array(arr.length)
    for (var i = 0; i < arr.length; i++) buf[i] = arr[i]
    var buffer = context.createBuffer(1, buf.length, context.sampleRate)
    buffer.copyToChannel(buf, 0)
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
  }
  
  function sineWaveAt(sampleNumber, tone) {
    var sampleFreq = context.sampleRate / tone
    return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)))
  }

  function noteAtFrequencyArray(frequency){
    var arr = []
    var volume = 0.3
    var seconds = 0.3
    
    for (var i = 0; i < context.sampleRate * seconds; i++) {
      arr[i] = sineWaveAt(i, frequency) * volume
    }
    return arr
  }

  var currentNote = 261.63; // Begin this at middle C 
  var halfTonePower = Math.pow(2, 1/12); // Power to get to next half tone
  var notes = []
  for (let i = 1; i <= 12; i++) {
    notes.push(partial(playSound, noteAtFrequencyArray(currentNote)))
    currentNote = currentNote * halfTonePower // Take current note to next half tone
    
  }

  return (
    <svg
      className="w-10 h-auto"
      viewBox="0 0 140 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White keys (7) */}
      <rect
        id="white-key-C"
        x="0"
        y="0"
        width="20"
        height="80"
        fill="white"
        stroke="black"
        strokeWidth="1"
        onClick={() => notes[0]()}
      />
      <rect
        id="white-key-D"
        x="20"
        y="0"
        width="20"
        height="80"
        fill="white"
        stroke="black"
        strokeWidth="1"
        onClick={() => notes[2]()}
      />
      <rect
        id="white-key-E"
        x="40"
        y="0"
        width="20"
        height="80"
        fill="white"
        stroke="black"
        strokeWidth="1"
        onClick={() => notes[4]()}
      />
      <rect
        id="white-key-F"
        x="60"
        y="0"
        width="20"
        height="80"
        fill="white"
        stroke="black"
        strokeWidth="1"
        onClick={() => notes[5]()}
      />
      <rect
        id="white-key-G"
        x="80"
        y="0"
        width="20"
        height="80"
        fill="white"
        stroke="black"
        strokeWidth="1"
        onClick={() => notes[7]()}
      />
      <rect
        id="white-key-A"
        x="100"
        y="0"
        width="20"
        height="80"
        fill="white"
        stroke="black"
        strokeWidth="1"
        onClick={() => notes[9]()}
      />
      <rect
        id="white-key-B"
        x="120"
        y="0"
        width="20"
        height="80"
        fill="white"
        stroke="black"
        strokeWidth="1"
        onClick={() => notes[11]()}
      />

      {/* Black keys (5) */}
      <g
        id="black-key-C#"
        transform="translate(14, 0)"
        onClick={() => notes[1]()}
      >
        <rect
          x="0"
          y="0"
          width="12"
          height="50"
          fill="black"
        />
        <line
          x1="0"
          y1="50"
          x2="12"
          y2="50"
          stroke="white"
          strokeWidth="1"
        />
      </g>

      <g
        id="black-key-D#"
        transform="translate(34, 0)"
        onClick={() => notes[3]()}
      >
        <rect
          x="0"
          y="0"
          width="12"
          height="50"
          fill="black"
        />
        <line
          x1="0"
          y1="50"
          x2="12"
          y2="50"
          stroke="white"
          strokeWidth="1"
        />
      </g>

      {/* No black key between E and F */}
      <g
        id="black-key-F#"
        transform="translate(74, 0)"
        onClick={() => notes[6]()}
      >
        <rect
          x="0"
          y="0"
          width="12"
          height="50"
          fill="black"
        />
        <line
          x1="0"
          y1="50"
          x2="12"
          y2="50"
          stroke="white"
          strokeWidth="1"
        />
      </g>

      <g
        id="black-key-G#"
        transform="translate(94, 0)"
        onClick={() => notes[8]()}
      >
        <rect
          x="0"
          y="0"
          width="12"
          height="50"
          fill="black"
        />
        <line
          x1="0"
          y1="50"
          x2="12"
          y2="50"
          stroke="white"
          strokeWidth="1"
        />
      </g>

      <g
        id="black-key-A#"
        transform="translate(114, 0)"
        onClick={() => notes[10]()}
      >
        <rect
          x="0"
          y="0"
          width="12"
          height="50"
          fill="black"
        />
        <line
          x1="0"
          y1="50"
          x2="12"
          y2="50"
          stroke="white"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};

export default PianoIcon;
