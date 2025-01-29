import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong, setIsSongFullScreen, setIsSongLoading } from "../redux/features/playerSlice";
import PlayPause from './PlayPause';


function toCapitalCase(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const SongBar = ({ i, songDetails, isPlaying, activeSong, isSongLoading }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const handlePlayClick = async () => {
    // dispatch(setActiveSong({ song, data, i }));
    // console.log(songDetails);
    dispatch(setActiveSong({ song: songDetails }));
    dispatch(playPause(true));
    dispatch(setIsSongLoading(true));
    await sleep(10);
    dispatch(setIsSongFullScreen(true));

  };
  return (
    <div className={`w-full flex flex-row items-center hover:bg-black  py-2 p-4 rounded-lg cursor-pointer mb-2 justify-between `}>
      <div>
        <div className="flex-1 flex flex-row justify-between items-center">
          <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
          <img
            className="w-20 h-20 rounded-lg"
            src={songDetails?.thumbnails[0].url}
            alt={songDetails?.name}
          />
          <div className="flex-1 flex flex-col justify-center mx-3">
            <a href={`https://www.google.com/search?q=${songDetails?.name}+by+${songDetails?.artist.name}+lyrics`} target="_blank">
              <p className='text-white text-2xl '>
                {toCapitalCase(songDetails?.name)}
              </p>
            </a>
            <p className='text-gray-300 text-base '>
              {songDetails.artist.name}
            </p>
          </div>
        </div>
      </div>

      <div>
        <PlayPause
          isSongLoading={isSongLoading}
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={songDetails}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </div>
      {/* {!artistId */}
      {/*   ? ( */}
      {/*     <PlayPause */}
      {/*       isPlaying={isPlaying} */}
      {/*       activeSong={activeSong} */}
      {/*       song={song} */}
      {/*       handlePause={handlePauseClick} */}
      {/*       handlePlay={() => handlePlayClick(song, i)} */}
      {/*     /> */}
      {/*   ) */}
      {/*   : null} */}
    </div>
  );

}
export default SongBar;
