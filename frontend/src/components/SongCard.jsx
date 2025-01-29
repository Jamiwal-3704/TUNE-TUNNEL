import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[180px] p-4 bg-white bg-opacity-50 animate-slideup rounded-[20px] hover:scale-105 transition-all duration-[0.5s] cursor-pointer">
      <div className="relative w-full h-[10.5rem] group ">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-80 h-[9.3rem] rounded-xl group-hover:flex ${activeSong?.title === song.title
            ? "flex bg-red-500 bg-opacity-60"
            : "hidden"
            }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          className="object-cover h-45 rounded-xl"
          alt="song_img"
          src={song.photo_url}
        />
      </div>
      <div className="-mt-5 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <a href={`https://www.google.com/search?q=${song?.title}+lyrics`} target="_blank">
            <p className="text-xl font-bold text-white">
              {song?.title}
            </p>
          </a>
        </p>
        <p className="text-sm text-gray-300 truncate">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
