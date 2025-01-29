import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi"
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from "../redux/features/userSlice";
import { logo } from "../assets";
import { All_API } from "..//../apis"
import { setIsSearching } from "../redux/features/playerSlice";
import { SpinnerLoader } from "../assets/AnimatedComponents/Spinner";



const Searchbar = () => {
  // useEffect(() => { console.log("form searchBar component") }, [])
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const name = useSelector((state) => state.user.name);
  const { isSearching } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [inputSong, setInputSong] = useState("");
  const [show, setShow] = useState(false);
  function searchPage(data) {
    navigate("/search", { state: { data } })
  }
  async function searchSong() {
    dispatch(setIsSearching(true));
    if (!inputSong) return; // Prevent search if input is empty

    const encodedName = encodeURIComponent(inputSong);
    let fullAPI;
    if (window.location.pathname.includes("/videos")) {
      fullAPI = `${All_API.videos}?q=${encodedName}`;
    } else {
      fullAPI = All_API.search + encodedName;
    }

    try {
      let res = await fetch(fullAPI);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      let data = await res.json();
      searchPage(data);
      setShow(true);
      dispatch(setIsSearching(false));
    } catch (error) {
      console.error("Error fetching the song data:", error);
    }
  }
  function submitForm(e) {
    e.preventDefault();
    searchSong();
  }

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/search" && (!inputSong || !show)) {
      navigate("/");
      setShow(false);
    }
  }, [inputSong, show, navigate, location.pathname]);
  return (
    <form onSubmit={submitForm} autoComplete="off" className="p-2 text-gray-400 focus-within:text-gray-600 relative" >

      <div className="relative flex flex-row justify-between ">

        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-[170px] h-32 object-contain"></img>
        </Link>
        <div className=" w-[50%]">
          <div onSubmit={submitForm} className='absolute top-5 right-[24rem] flex flex-row  items-center w-[50%] bg-black border-2 border-red-900  rounded-[20px]'>
            <input
              name="search-field"
              autoComplete="off"
              id="search-field"
              placeholder="Search"
              type="text"
              onChange={(e) => setInputSong(e.target.value)}
              className="lex-1 bg-black border-none outline-none placeholder-gray-500 text-base text-white p-2 rounded-[20px] pl-10 w-[95%] ml-1"
            ></input>

            {isSearching ? (
              <SpinnerLoader height="5" width="5"></SpinnerLoader>
            ) : (<div></div>)}
            <FiSearch onClick={submitForm} size={20} className="h-5 ml-2 mr-4  text-lg text-white">
            </FiSearch>


          </div>
          <div className="mt-8 text-white text-xl -ml-80">
            {
              inputSong && show ? <h1>Results for : {inputSong} </h1> : null
            }
          </div>
        </div>

        {isLoggedIn ? (
          <div className="flex justify-center items-center absolute top-4 right-6">
            <button type="button" className="text-white mr-14 md:mr-4 bg-gradient-to-r from-[#1f1e1e] via-[#1f1e1e] to-[#aa3131] hover:bg-gradient-to-r hover:from-[#aa3131] hover:via-[#1f1e1e] hover:to-[#1f1e1e] font-bold rounded-full text-md px-5 py-2.5 text-center  mb-2  border-2 border-gray-600 "
              onClick={() => {
                dispatch(logout());
                localStorage.setItem('token', null)
                navigate('/signin');
              }}>Log Out</button>


            <div className="relative text-center w-8 h-8 sm:w-12 sm:h-12 border-2 border-gray-600 overflow-hidden bg-gradient-to-br from-red-600 to-black rounded-full -mt-3">
              <span className="text-3xl text-gray-600 dark:text-gray-300">{name.split("")[0]}</span>
            </div>
          </div>
        ) :

          <button type="button" className="text-white mr-14 md:mr-4 bg-black font-bold rounded-full text-md px-5 py-2.5 text-center mb-2  border border-red-600 absolute top-4 right-3"
            onClick={() => {
              navigate('/signin');
            }}>Log In</button>
        }
      </div>
    </form>
  )
};

export default Searchbar;
