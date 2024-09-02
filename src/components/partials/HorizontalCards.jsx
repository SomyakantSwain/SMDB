import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const HorizontalCards = ({ data, title }) => {
  console.log(title);
  
  
  return (
    <div className="w-[100%] flex  overflow-y-hidden ">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          key={i}
          className=" min-w-[15%] h-[35vh] bg-zinc-900 mr-5 mb-5 "
        >
          <img
            className="w-[15vw] h-[55%] "
            src={
              d.backdrop_path || d.poster_path
                ? `https://image.tmdb.org/t/p/original/${
                    d.backdrop_path || d.poster_path
                  }`
                : noimage
            }
            alt=""
          />
          <div className="text-white p-3 h-[45%]  overflow-y-auto">
            <h1 className="  leading-tight  text-xl font-semibold ">
              {d.name || d.title || d.original_name || d.original_title}
            </h1>
            <hr className=" mb-2 mt-2 bg-zinc-800" />
            <p className=" leading-none  ">
              {d.overview.slice(0, 50)}...
              <span className="text-blue-400">more</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
