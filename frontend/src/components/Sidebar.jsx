import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom"


export default function Sidebar() {
  return (
    <div className='bg-black h-[500px] mt-[9rem] w-[75px] -ml-4  rounded-[20px] border-2 border-red-900' >
      <ul className='text-white flex -rotate-90 gap-10 text-lg cursor-pointer' >
        <NavLink to={"/videos"} className='mt-6 -ml-[21rem]'>
          <li className='hover:text-red-600'>Videos</li>
        </NavLink>
        <NavLink to={"/artist"}>
          <li className='mt-6 hover:text-red-600'>Artists</li>
        </NavLink>
        <NavLink to={"/"}>
          <li className='mt-6 hover:text-red-600'>Discover</li>
        </NavLink>
      </ul>
    </div>
  )
}


