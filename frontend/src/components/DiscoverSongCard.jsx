import { useDispatch } from "react-redux";
const DiscoverSongCard = ({ song }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/50 bg-opacity-80 backdrop-blur-md animate-slideup rounded-lg cursor-pointer group">
    <div className="relative w-full h-56">
      <img
        className="object-cover h-56 rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
        alt="song_img"
        src={song.thumbnails[1].url}
      />
    </div>
    <div className="mt-4 flex flex-col">
      <div className="text-lg text-white truncate group-hover:text-red-600">
        {song.name}
      </div>
    </div>
  </div>
  
  );
};

export default DiscoverSongCard;
