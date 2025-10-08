// client/src/components/VideoPlayer.js
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/effect1.json'; // One of 50-60 effects

const VideoPlayer = ({ url, isFree }) => {
  return (
    <div className="relative">
      {isFree ? (
        <video src={url} controls className="w-full" />
      ) : (
        <div className="blur-sm">
          <video src={url} controls className="w-full" />
          <Lottie options={{ animationData }} height={100} width={100} />
          <p>Pay Rs. 500 to unlock this video</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
