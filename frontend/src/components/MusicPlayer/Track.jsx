import React from "react";

const Track = ({ isPlaying, isActive, activeSong, isSongFullScreen }) => (
  < div className="flex-1 flex items-center justify-start" >
    <div
      className={`hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={activeSong?.thumbnails[0].url}
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="flex flex-row text-white gap-5 items-center">
      <div className="max-w-[60%]">
        <p className={`truncate text-white font-bold text-lg ${isSongFullScreen ? 'max-w-[20rem]' : 'max-w-[10rem]'}`}>
          {activeSong?.name ? activeSong?.name : "No active Song"}
        </p>
        <p className={`text-gray-300  ${isSongFullScreen ? 'w-[20rem] line-clamp-5 pr-20' : 'truncate max-w-[10rem]'}`}>
          {activeSong?.artist.name ? activeSong?.artist.name : "No active Song"}
        </p>
      </div>
      <a href={activeSong.ringtone} target="_blank">
        {/*Download icon */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="max-w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      </a>
    </div>
  </div >
);

export default Track;
