import React, { useState } from "react";
import MusicUploadForm from "./components/MusicUploadForm";
import AudioPlayer from "./components/AudioPlayer";
import SongList from "./components/SongList";
import "./App.css";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [audioRef, setAudioRef] = useState([]);
  const [isPlayAll, setIsPlayAll] = useState(false);

  // const handleFileUpload = (newSongs) => {
  //   setSongs([...songs, ...newSongs]);
  // };

  
  return (
    <div>
      <SongList songs={audioRef} />
      {audioRef?.length && (
        <AudioPlayer
          audioRefArray={audioRef}
          isPlayAll={isPlayAll}
          setIsPlayAll={setIsPlayAll}
        />
      )}
      <MusicUploadForm setAudioRef={setAudioRef} audioRef={audioRef} />
      <button className="play_all" onClick={() => setIsPlayAll(true)}>
        Play All
      </button>
    </div>
  );
};

export default App;
