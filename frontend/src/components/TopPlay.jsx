import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper";
import { topCharts } from "../assets/constants"

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice"
import { useGetTopChartsQuery } from "../redux/services/shazamCore"

import "swiper/css"
import "swiper/css/free-mode"

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  const lyricsSearchQuery = `https://www.google.com/search?q=${song?.title}+by+${song.subtitle}+lyrics`.replaceAll("&", "and");
  console.log(lyricsSearchQuery)
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2 text-white gap-7">
      <h2 className="text-white">{i + 1}.</h2>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img src={song?.photo_url} alt={song?.title} className="w-20 h-20 rounded-lg" />
        <div className="flex-1 flex flex-col justify-center w-full mx-4">
          <a href={lyricsSearchQuery} target="_blank">
            <p className="text-xl font-bold text-white">
              {song?.title}
            </p>
          </a>

          <Link to={`/artists/${song.subtitle}`}>
            <p className="text-base  text-gray-300">
              {song?.subtitle}
            </p>
          </Link>

        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      >
      </PlayPause>
    </div>
  )
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // this is for retireving the data
  // const {data} = useGetTopChartsQuery();
  const data = topCharts;
  const divRef = useRef(null);
  const topPlays = data?.slice(0, 5);


  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" })
    // this command is basically making the topplay component come into view 
    // and since this useEffect doesn't take a dependency array, it runs on 
    // every render, apart from the first render
  })

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white text-2xl font-bold">Top Plays</h2>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard song={song} i={i} key={song.key} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} ></TopChartCard>
          ))}
        </div>
      </div>
      {/* <div className="w-full flex flex-col mt-8"> */}
      {/*   <div className="flex flex-row justify-between items-center"> */}
      {/*     <h2 className="text-white text-2xl font-bold">Top Artists</h2> */}
      {/*     <Link className="text-gray-300 text-base cursor-pointer" to="/top-artists">See more</Link> */}
      {/*   </div> */}


      {/* <Swiper */}
      {/*   slidesPerView="auto" */}
      {/*   spaceBetween={15} */}
      {/*   freeMode */}
      {/*   centeredSlides */}
      {/*   centeredSlidesBounds */}
      {/*   modules={[FreeMode]} */}
      {/*   className="mt-4" */}
      {/* > */}
      {/*   {topPlays?.map((song, i) => ( */}
      {/*     <SwiperSlide */}
      {/*       key={song.key} */}
      {/*       style={{ width: '25%', height: "auto" }} */}
      {/*       className="shadow-lg rounded-full animate-slideright" */}
      {/*     > */}
      {/*       <Link to={`/artists/${song?.subtitle}`}> */}
      {/*         <img src={song?.photo_url} alt="name" className="w-full h-full  rounded-full object-cover" /> */}
      {/*       </Link> */}
      {/*     </SwiperSlide> */}
      {/*   ))} */}
      {/* </Swiper> */}



      {/* </div> */}
    </div>
  )
}


export default TopPlay;
