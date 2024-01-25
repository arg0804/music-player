import React, { useState } from 'react';
import SongList from './components/SongList/SongList';
import MusicUploadForm from './components/MusicUploadForm/MusicUploadForm';
import './App.css';
import PlayAllButton from './components/PlayAllButton/PlayAllButton';
import AddAllButton from './components/AddAllButton/AddAllButton';

import song1 from './audio/she.mp3';
import song2 from './audio/sinatra.mp3';
import song3 from './audio/billy.mp3';
import song4 from './audio/charles.mp3';
import song5 from './audio/nina.mp3';
import song6 from './audio/eminem.mp3';

const songs = [
  { id: 'song1', songName: 'She', artistName: 'Charles Aznavour', trackNumber: 1, file: song1 },
  { id: 'song2', songName: 'Rain in my heart', artistName: 'Frank Sinatra', trackNumber: 2, file: song2 },
  { id: 'song3', songName: 'Stormy weather', artistName: 'Billy Holiday', trackNumber: 3, file: song3 },
  { id: 'song4', songName: 'Hier encore', artistName: 'Charles Aznavour', trackNumber: 4, file: song4 },
  { id: 'song5', songName: 'Sinnerman', artistName: 'Nina Simone', trackNumber: 5, file: song5 },
  { id: 'song6', songName: 'Mockingbird', artistName: 'Eminem', trackNumber: 6, file: song6 },
];

function App() {
  const [filteredSongs, setFilteredSongs] = useState(songs);

  const handleFilterChange = (filter) => {
    const trimmedFilter = filter.trim();
    if (!trimmedFilter) {
      setFilteredSongs(songs);
      return;
    }

    const filtered = songs.filter(
      (song) =>
        song.songName.toLowerCase().includes(trimmedFilter.toLowerCase()) ||
        song.artistName.toLowerCase().includes(trimmedFilter.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  const handleTrackNumberChange = (selectedTrackNumber) => {
    const filtered = songs.filter((song) => song.trackNumber === parseInt(selectedTrackNumber));
    setFilteredSongs(filtered);
  };

  return (
    <div>
      <nav className="navbar">
        <PlayAllButton songs={filteredSongs} />
        <AddAllButton />
        <select
          className="navInput-track"
          onChange={(e) => handleTrackNumberChange(e.target.value)}
          aria-label="Filter by track number"
        >
          <option value="">Track Number</option>
          {songs.map((song) => (
            <option key={song.id} value={song.trackNumber}>
              {song.trackNumber}
            </option>
          ))}
        </select>
        <span class="material-symbols-outlined search">
            search
        </span>
        <input
          type="text"
          onChange={(e) => handleFilterChange(e.target.value)}
          className="navInput"
          aria-label="Filter by song or artist"
          placeholder="Filter"
        />
      </nav>
      <SongList songs={filteredSongs} />
      <MusicUploadForm />
    </div>
  );
}

export default App;
