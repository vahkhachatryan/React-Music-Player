import React from "react";
import { useDropzone } from "react-dropzone";
import "../styles/MusicUploadForm.css";

const MusicUploadForm = ({ setAudioRef, audioRef }) => {
  const generateRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const color = `rgb(${red}, ${green}, ${blue})`;

    return color;
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const audioFile = file;

    const audioElement = new Audio();

    audioElement.src = URL.createObjectURL(audioFile);

    audioElement.controls = true;
    console.log(file);
    const newAudion = [
      ...audioRef,
      {
        title: file.name,
        color: generateRandomColor(),
        audioRef: audioElement,
      },
    ];
    setAudioRef(newAudion);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".mp3, .wav",
    multiple: false,
  });

  return (
    <div className="parent_div">
      <h2>Upload Music</h2>
      <div className="upload_file" {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the file here...</p> : <p>Upload file</p>}
      </div>
    </div>
  );
};

const dropzoneStyles = {
  border: "2px solid #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default MusicUploadForm;
