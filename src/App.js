// App.js
import React, { useState } from 'react';
import SongList from './components/SongList';
import PlayAllButton from './components/PlayAllButton';
import MusicUploadForm from './components/MusicUploadForm';

const App = () => {
  const [songs, setSongs] = useState([]);

  const handleFileUpload = (newSongs) => {
    setSongs([...songs, ...newSongs]);
  };

  return (
    <div>
      <SongList songs={songs} />
      <PlayAllButton songs={songs} />
      <MusicUploadForm onUpload={handleFileUpload} />
    </div>
  );
};

export default App;
