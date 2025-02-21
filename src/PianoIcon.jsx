import React from 'react';

const PianoIcon = () => {
  return (
    <svg
      className="w-12 h-auto"
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
        onClick={() => alert('C pressed')}
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
        onClick={() => alert('D pressed')}
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
        onClick={() => alert('E pressed')}
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
        onClick={() => alert('F pressed')}
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
        onClick={() => alert('G pressed')}
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
        onClick={() => alert('A pressed')}
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
        onClick={() => alert('B pressed')}
      />

      {/* Black keys (5) */}
      <g
        id="black-key-C#"
        transform="translate(14, 0)"
        onClick={() => alert('C# pressed')}
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
        onClick={() => alert('D# pressed')}
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
        onClick={() => alert('F# pressed')}
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
        onClick={() => alert('G# pressed')}
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
        onClick={() => alert('A# pressed')}
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
