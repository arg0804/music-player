import React, { useState } from 'react';
import axios from 'axios';
import './MusicUploadForm.css';

const MusicUploadForm = ({ setSongs }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newSong = {
        id: response.data.id,
        songName: response.data.songName,
        artistName: response.data.artistName,
        trackNumber: response.data.trackNumber,
        file: selectedFile,
      };

      setSongs((prevSongs) => [...prevSongs, newSong]);
      setSelectedFile(null);
    } catch (error) {
      setUploadError('Error uploading file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="uploadForm">
      <label htmlFor="fileInput" className="fileInputLabel">
        Choose File
      </label>
      <input
        id="fileInput"
        type="file"
        accept=".mp3, .wav"
        onChange={handleFileChange}
        className="fileInput"
      />
      {selectedFile && <p className="selectedFile">Selected file: {selectedFile.name}</p>}
      <button onClick={handleUpload} disabled={!selectedFile || uploading} className="upload">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadError && <p className="uploadError">{uploadError}</p>}
    </div>
  );
};

export default MusicUploadForm;
