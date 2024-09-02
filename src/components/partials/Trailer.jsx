import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Trailer = () => {
  const navigate = useNavigate();
  // Extract movie or TV ID from the URL pathname.
  const { pathname } = useLocation();
  
  
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return  (
   <div className="z-[100] bg-[rgba(0,0,0,.9)] top-0 left-0  absolute w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className=" absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%]  top-[5%]"
      ></Link>

      {ytvideo ?(
        <ReactPlayer
        controls 
        height={500}
        width={1200}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />
      ): <h1>Not found</h1>}
    </div>
  ) 
};

export default Trailer;
