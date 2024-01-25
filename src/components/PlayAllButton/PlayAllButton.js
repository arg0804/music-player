import React, { useState, useRef } from 'react';
import { Howl } from 'howler';
import './PlayAllButton.css';

const PlayAllButton = ({ songs }) => {
  const [playing, setPlaying] = useState(false);
  const soundRefs = useRef([]);

  const handlePlayAll = () => {
    if (playing) {
      soundRefs.current.forEach((sound) => sound?.stop());
    } else {
      soundRefs.current = songs.map((song) => {
        const sound = new Howl({
          src: [song.file],
        });
        sound.play();
        return sound;
      });
    }

    setPlaying(!playing);
  };

  return (
    <button onClick={handlePlayAll} className={`playAllButton ${playing ? 'playing' : ''}`}>
      {playing ? 'Stop All' : 'Play All'}
    </button>
  );
};

export default PlayAllButton;
