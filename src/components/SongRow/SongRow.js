import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from '../ProgressBar/ProgressBar';
import './SongRow.css';

const SongRow = ({ song }) => {
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleTogglePlay = () => {
    if (playing) {
      sound.pause();
    } else {
      let newSound;
      if (sound) {
        newSound = sound;
        newSound.seek((progress / 100) * newSound.duration());
        newSound.play();
      } else {
        newSound = new Howl({
          src: [song.file],
          html5: true,
          onend: () => setPlaying(false),
        });
        newSound.play();
      }

      setSound(newSound);
    }

    setPlaying(!playing);
  };

  const handleSeek = (seekPosition) => {
    if (sound) {
      sound.seek((seekPosition / 100) * sound.duration());
      setProgress(seekPosition);
    }
  };

  useEffect(() => {
    if (sound) {
      sound.on('play', () => {
        const interval = setInterval(() => {
          setProgress((sound.seek() / sound.duration()) * 100);
        }, 100);
        return () => clearInterval(interval);
      });
    }
  }, [sound]);

  return (
    <div className="songRow">
      <div className="table-row">
        <div className="table-cell-btn">
          <button className='btn' onClick={handleTogglePlay}>
            <FontAwesomeIcon icon={playing ? faStop : faPlay} />
          </button>
        </div>
        <div className="table-cell-row">{song.songName}</div>
        <div className="table-cell-row">{song.artistName}</div>
        <div className="table-cell-row">{song.trackNumber}</div>
        <div className="table-cell-icons">
        <span class="material-symbols-outlined">
            favorite
        </span>
        <span class="material-symbols-outlined">
            done
        </span>
        <span class="material-symbols-outlined">
            share
        </span>
        <span class="material-symbols-outlined">
            arrow_drop_down
        </span>
        </div>
      </div>
      {playing && (
        <div className="table-row-sec">
          <div className="table-cell" />
          <div className="table-cell-sec" colSpan="2">
            {Math.floor(sound.seek())}s
          </div>
          <div className="table-cell">
            <ProgressBar progress={progress} onSeek={handleSeek} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SongRow;
