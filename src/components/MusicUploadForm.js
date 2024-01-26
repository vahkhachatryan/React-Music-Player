import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
// import '../styles/MusicUploadForm.css';


const MusicUploadForm = ({ onUpload, onAddToPlayAllButton, onAddToSongList }) => {
  const [uploadedSong, setUploadedSong] = useState(null);

  useEffect(() => {
    if (onAddToPlayAllButton) {
      onAddToPlayAllButton([uploadedSong]);
    }
    if (onAddToSongList) {
      onAddToSongList([uploadedSong]);
    }
  }, [uploadedSong, onAddToPlayAllButton, onAddToSongList]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const newSong = {
        file,
        name: file.name,
        url: URL.createObjectURL(file),
      };

      setUploadedSong(newSong);

      if (onUpload) {
        onUpload([newSong]);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.mp3, .wav',
    multiple: false,
  });

  return (
    <div>
      <h2>Upload Music</h2>
      <div className='upload_file' {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Upload file</p>
        )}
      </div>
      {uploadedSong && (
        <div>
          <h3>Last Uploaded Song</h3>
          <div className="uploaded-song">
            <p>Selected File: {uploadedSong.name}</p>
            <ReactPlayer url={uploadedSong.url} controls  />
          </div>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default MusicUploadForm;
