// SongRow.js
import React from 'react';

const SongRow = ({ song }) => {
  return (
    <li className="song-row">
      <span>{song.songName}</span>
      <span>{song.artistName}</span>
      <span>{song.trackNumber}</span>
    </li>
  );
};

export default SongRow;
