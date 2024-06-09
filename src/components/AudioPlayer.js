import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import Backdrop from "./Backdrop";
import "../styles/AudioPlayer.css";

const AudioPlayer = ({ audioRefArray, isPlayAll, setIsPlayAll }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { title, color, audioRef } = audioRefArray[trackIndex];

  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.ended) {
        if (isPlayAll) {
          toNextTrack();
        }
      } else {
        setTrackProgress(audioRef.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.currentTime = value;
    setTrackProgress(audioRef.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(audioRefArray.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < audioRefArray.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (audioRef) {
      if (isPlaying && !isFirst) {
        audioRef.play();
        startTimer();
      } else {
        audioRef.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    for (let i = 0; i < audioRefArray.length; i++) {
      const element = audioRefArray[i].audioRef;
      element.pause();
    }
    setTrackProgress(audioRef.currentTime);

    if (audioRef) {
      if (isReady.current && !isFirst) {
        audioRef.play();
        setIsPlaying(true);
        startTimer();
      } else {
        isReady.current = true;
      }
    }
  }, [trackIndex]);

  useEffect(() => {
    return () => {
      audioRef.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    setTrackIndex(audioRefArray.length - 1);
    setIsPlayAll(false);
  }, [audioRefArray]);

  useEffect(() => {
    if (isPlayAll) {
      for (let i = 0; i < audioRefArray.length; i++) {
        const element = audioRefArray[i].audioRef;
        element.currentTime = 0;
      }
      setTrackIndex(0);
    }
  }, [isPlayAll]);

  return (
    <div className="audio-player" onClick={() => setIsFirst(false)}>
      <div className="track-info">
        <h2 className="title">{title}</h2>
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
      <Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default AudioPlayer;
