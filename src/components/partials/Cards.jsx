import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";




const Cards = ({ data, title }) => {
  
  return (
    <div className=" relative grid grid-cols-5  w-full ">
      {data.map((c, i) => (
        <Link
          
          to={`/${c.media_type || title}/details/${c.id}`}
          className="w-[45vh] ml-[5%]   "
          key={i}
        >
          <img
            className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5 )] w-[35vh] h-[45vh] object-cover "
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : noimage
            }
            alt=""
          />
          <hr className="w-[35vh] border-yellow-300" />
          <h1 className="text-zinc-300 w-[35vh] mt-2 pb-[15%] font-bold text-2xl">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
