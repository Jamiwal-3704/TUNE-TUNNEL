import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader } from "../"
import { SongBar } from "../index"
import { All_API } from "../../../apis";
import axios from "axios";

export const FullScreenAlbum = () => {
  const location = useLocation();
  const { albumId } = location.state || {};
  // const albumId = "MPREb_E4GfUXfDfhy";
  const { activeSong, isPlaying, isSongLoading } = useSelector((state) => state.player);

  // const { data } = location.state || {};
  // const { data } = location.state() || {};
  const [isLoading, setIsLoading] = useState(true); // Initially true because we're fetching data
  const [albumDetails, setAlbumDetails] = useState({});

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      const finalApi = All_API.album + albumId;
      try {
        const response = await fetch(finalApi);
        const jsonRes = await response.json();
        console.log(JSON.stringify(jsonRes));
        setAlbumDetails(jsonRes);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false); // Ensure loading state is set to false after data is fetched
      }
    };

    fetchAlbumDetails();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (isLoading) {
    return <Loader title="Fetching album details" />;
  }
  // console.log(`${All_API.artist}/UCDxKh1gFWeYsqePvgVzmPoQ`);
  // TODO: if nrtisteed to see the component real quick uncomment the following
  // return (
  //   <div className="flex flex-col mt-10 hidescrollbar">
  //     <DetailsHeader artistInfo={BesonBoone}></DetailsHeader>
  //     <div className="mb-10">
  //       <div className="mt-5">
  //
  //         <div className='text-3xl font-bold text-white my-10'>Top Songs:</div>
  //         {BesonBoone.tracks.hits.map((hitSong, i) => {
  //           return <SongBar hitSongDetails={hitSong} i={i}></SongBar>
  //
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // )


  return (
    <div className="flex flex-col hidescrollbar ">
      <DetailsHeader artistInfo={albumDetails}></DetailsHeader>
      <div className="mb-10 row-span-1 sm:col-span-1 w-[70rem] mx-auto max-h-[19rem] overflow-y-auto hide-scrollbar mt-8 ">
        <div className="pb-24">
          <div className='text-3xl font-bold text-white mb-5'>Songs:</div>
          {albumDetails.songs.map((song, i) => {
            return <SongBar songDetails={song} activeSong={activeSong} isPlaying={isPlaying} isSongLoading={isSongLoading} i={i}></SongBar>
          })}
        </div>
      </div>
    </div>
  )


};

