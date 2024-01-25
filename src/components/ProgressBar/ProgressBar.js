import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, onSeek }) => {
  const [isSeeking, setIsSeeking] = useState(false);

  const handleSeek = (e) => {
    const seekPosition = (e.nativeEvent.offsetX / e.target.clientWidth) * 100;
    onSeek(seekPosition);
  };

  return (
    <div className="progress-bar" onClick={handleSeek}>
      <div style={{ width: `${progress}%` }} className="progress-bar-inner"></div>
    </div>
  );
};

export default ProgressBar;
