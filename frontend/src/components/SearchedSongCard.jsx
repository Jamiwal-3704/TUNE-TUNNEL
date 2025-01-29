import React from 'react'
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { All_API } from '../../apis';
import { useLocation, useNavigate } from 'react-router-dom';


function SearchedSongCard({ isSongLoading, artistId, song, isPlaying, activeSong, data, i }) {
  const songplay = All_API.songUrl + song.videoId;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    // dispatch(setActiveSong({ song, data, i }));
    console.log(song);
    dispatch(setActiveSong({ song }));
    dispatch(playPause(true));
  };
  function nameHandler() {
    navigate(`/specific-artist/${song.artist.artistId}`, { state: { artistId } })
  }
  return (

    <div className='flex justify-between gap-5 mb-5 backdrop-blur-xl hover:bg-[#4c426e] hover:backdrop-blur-lg py-2 px-3 pb-2 rounded-lg cursor-pointer hover:text-red-400 w-[90%] h-18'>
      <div className='h-[60px] w-[1000px] object-contain relative flex gap-3'>
        <img src={song.thumbnails[0].url} className='rounded-lg z-1 max-w-[60px] max-h-[60px] object-cover'></img>
        <div className='flex flex-col'>
          <h2 className='font-bold text-lg mb-1' >{song.name || ""}</h2>
          <p onClick={nameHandler} className='text-sm hover:underline ' >{song.artist.name}</p>
        </div>
      </div>

      <div className='z-100 mt-3'>
        <PlayPause
          isSongLoading={isSongLoading}
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </div>
    </div>
  )
}

export default SearchedSongCard
