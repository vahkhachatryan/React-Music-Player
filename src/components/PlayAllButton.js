import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import '../styles/PlayAllButton.css';

const PlayAllButton = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      playerRef.current.seekTo(0); // Reset playback to the beginning of the song
    }
  }, [currentSongIndex, isPlaying]);

  const handlePlayAll = () => {
    setIsPlaying(true);
  };

  const handleSongEnded = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsPlaying(false);
      setCurrentSongIndex(0); // Reset to the first song when all songs are played
    }
  };

  const handleSkipNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentSongIndex(0); // Wrap to the first song if at the end
    }
  };

  const handleSkipPrev = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1); // Wrap to the last song if at the beginning
    }
  };

  return (
    <div>
      <button onClick={handlePlayAll}>Play All</button>
      <button onClick={handleSkipPrev}>Skip Prev</button>
      <button onClick={handleSkipNext}>Skip Next</button>

      {isPlaying && (
        <div>
          <h3>Now Playing: {songs[currentSongIndex].name}</h3>
          <ReactPlayer
            ref={playerRef}
            url={songs[currentSongIndex].url}
            controls
            playing={isPlaying}
            onEnded={handleSongEnded}
          />
        </div>
      )}
    </div>
  );
};

export default PlayAllButton;
