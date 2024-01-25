import React from 'react';
import SongRow from '../SongRow/SongRow';
import './SongList.css';

const SongList = ({ songs }) => {
    return (
      <div className="songList">
        <div className="table-header">
          <div className="table-cell-head">Song Name</div>
          <div className="table-cell-head">Artist Name</div>
          <div className="table-cell-head-track">Track</div>
        </div>
        {songs.map((song) => (
          <SongRow key={song.id} song={song} />
        ))}
      </div>
    );
  };
  
  export default SongList;
