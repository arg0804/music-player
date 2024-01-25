import React from 'react';
import './AddAllButton.css';

const AddAllButton = ({ songs, onAddAll }) => {
  const handleAddAll = () => {
    console.log('Adding all songs to the queue:', songs);
    if (onAddAll) {
      onAddAll(songs);
    }
  };

  return (
    <button onClick={handleAddAll} className="addAllButton">
      Add All
    </button>
  );
};

export default AddAllButton;