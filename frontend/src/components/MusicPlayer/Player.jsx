/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
import { All_API } from "../../../apis";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  onCanPlay,
  onWaiting,
  onPlaying,
  repeat,
}) => {
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      // src={activeSong.ringtone}
      src={`${All_API.stream}?videoId=${activeSong.videoId}`}
      // src="http://localhost:3001/api/v1/stream?videoId=XxxfQ7-aMrE"

      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
      onCanPlay={onCanPlay}
      onWaiting={onWaiting}
      onPlaying={onPlaying}
    />
  );
};

export default Player;
