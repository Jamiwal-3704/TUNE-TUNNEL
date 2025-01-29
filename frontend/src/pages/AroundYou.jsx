import React, { useState, useEffect } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { All_API } from '../../apis';
import { Loader } from '../components';
import { useNavigate } from 'react-router-dom';

function AroundYou() {
  const navigate = useNavigate();
  const [artistDetails, setArtistDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state

  const artists = {
    // ar_rahman: 'UCtJe0RYzgPddQXKtWduxz_w',
    arijit_singh: 'UCDxKh1gFWeYsqePvgVzmPoQ',
    honey_singh: 'UCGPCYz1FTl_dvFFnzQTQzjw',
    // shreya_ghosal: 'UCrC-7fsdTCYeaRBpwA6j-Eg',
    atif_aslam: 'UCVGomUS__PL0c4jDXa0QwXA',
    kk: 'UCeBxx7m7yrwSyvpVpKcMI8w',
    UDIT_NARAYAN: "UC13ToEQgfmTe8_GW19LYtCg",
    // Neha_Kakkar:"UCsmm-jjSLILh12mZ2aR6Qrg",
    Karan_Aujla: "UCSmK5WX5U4gdtebWjoL81og",
    // Sonu_Nigam:"UCsC4u-BJAd4OX1hJXtwXSOQ"
  };

  useEffect(() => {
    async function fetchArtistDetails() {
      try {
        const fetchedDetails = [];

        for (const artistId of Object.values(artists)) {
          const fullUrl = All_API.artist + artistId;
          const response = await fetch(fullUrl);
          const data = await response.json();
          fetchedDetails.push(data);
        }

        setArtistDetails(fetchedDetails);
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error('Error fetching artist details:', error);
        setLoading(false); // Stop loading if there's an error
      }
    }

    fetchArtistDetails();
  }, []);

  function artistHandler(artistId) {
    navigate(`/specific-artist/${artistId}`, { state: { artistId } });
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="grid grid-cols-4 gap-4 overflow-y-scroll hide-scrollbar pb-24 w-[80%] mx-auto">
      {loading ? (
        <Loader />
      ) : artistDetails.length > 0 ? (
        artistDetails.map((details, index) => (
          <div
            key={index}
            onClick={() => artistHandler(details.artistId)} // Pass the artistId to the handler
            className="rounded-3xl bg-gradient-to-l from-gray-900 via-transparent to-gray-900 w-full h-full flex flex-row justify-space-between hover:text-red-400 cursor-pointer"
          >
            <div className="flex flex-col">
              {details.thumbnails && details.thumbnails[0] ? (
                <img
                  src={details.thumbnails[1].url}
                  alt={details.name}
                  className="rounded-full shadow-2xl shadow-gray-600 h-32 w-32 sm:h-48 sm:w-48 m-5 object-cover ml-10 "
                />
              ) : (
                <div className="h-32 w-32 sm:h-48 sm:w-48 m-5 bg-gray-800 rounded-full flex items-center justify-center">
                  <p className="text-white">No Image</p>
                </div>
              )}
              <div className="text-white px-5">
                <p className="text-white text-2xl font-bold">{details.name}</p>
                <p className="pb-2">Artist</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No artists found</div>
      )}
    </div>
  );
}

export default AroundYou;
