import React from 'react'
import { useLocation } from 'react-router-dom';
import SearchedSongCard from './SearchedSongCard'
import { useSelector } from 'react-redux';

function SearchSong() {
  const location = useLocation();
  const { data } = location.state || {};
  const { activeSong, isPlaying, isSongLoading } = useSelector((state) => state.player);

  // console.log(isPlaying);
  return (

    <div className='h-[70vh] w-[70%] mx-auto -mt-6 rounded-xl' >
      <div className='  flex flex-col justify-start h-full w-full text-white overflow-auto hide-scrollbar py-5'>

        {data.map((song, index) => {
          return (
            <SearchedSongCard key={index} isSongLoading={isSongLoading} song={song} activeSong={activeSong} isPlaying={isPlaying} />
          )
        })}
      </div>
    </div>
  )
}

export default SearchSong
