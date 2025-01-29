const DetailsHeader = ({ artistInfo }) => (
  <div className="rounded-l-full bg-gradient-to-l from-transparent via-gray to-gray-900 w-full flex flex-row justify-space-between">
    <div className=" flex flex-row justify-evenly items-center">
      <img src={artistInfo.thumbnails[1].url ? artistInfo.thumbnails[1].url : artistInfo.thumbnails[0].url} className="rounded-full border-2 border-gray-300 shadow-2xl shadow-gray-600 h-22 w-22 sm:h-32 sm:w-32 m-5 object-cover" />
      <p className="text-white text-5xl font-bold">{artistInfo.name}</p>
    </div>
  </div>
);

export default DetailsHeader;
