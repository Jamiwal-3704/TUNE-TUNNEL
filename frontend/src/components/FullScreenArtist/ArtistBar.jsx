import React from 'react';
// import { Link } from 'react-router-dom';
//
// import PlayPause from './PlayPause';
// import { HiTag } from 'react-icons/hi';
import {useNavigate} from "react-router-dom";
function toCapitalCase(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}


const ArtistBar = ({ albumDetails, i }) => {
  const navigate = useNavigate();
  function albumHandler(albumId){
    navigate('/specific-album',{state:{albumId}});
  }
  return (
  <div onClick={() => {albumHandler(albumDetails.albumId)} } className="w-full flex flex-row items-center hover:bg-[#4c426e]  py-2 p-4 rounded-lg cursor-pointer mb-2" >
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={albumDetails?.thumbnails[0].url}
        alt={albumDetails?.name}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <p className='text-white text-2xl '>
          {toCapitalCase(albumDetails?.name)}
        </p>
        <p className='text-gray-300 text-base '>
          {albumDetails.artist.name}
        </p>
      </div>
    </div>
    
  </div>
)};

export default ArtistBar;
