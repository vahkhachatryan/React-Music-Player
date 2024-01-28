import React from "react";

const SongList = ({ songs }) => {
  const songItems = songs ? (
    songs.map((song) => (
      <div key={song.title}>
        <h3>{song.title}</h3>
      </div>
    ))
  ) : (
    <p>No songs available</p>
  );

  return (
    <div>
      <h2>Song List</h2>
      {songItems}
    </div>
  );
};

export default SongList;
