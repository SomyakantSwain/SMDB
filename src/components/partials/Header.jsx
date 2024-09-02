import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div>
      <div
           style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.8)) ,url(https://image.tmdb.org/t/p/original/${
              data.backdrop_path || data.profile_path
            })`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        className=" h-[60vh]  flex flex-col justify-end p-10 items-start "
      >
        <h1 className="  w-[70%] text-5xl font-black text-white">
          {data.name || data.title || data.original_name || data.original_title}
        </h1>
        <p className="w-[70%] mt-3 text-white">
          {data.overview.slice(0, 200)}...
          <Link
            to={`/${data.media_type}/details/${data.id}`}
            className="text-blue-400"
          >
            more
          </Link>
        </p>

        <p className="text-white flex gap-5">
          <i className=" text-yellow-500 ri-megaphone-fill">
            {" "}
            {data.release_date || "No information"}
          </i>
          <i className=" text-yellow-500 ri-album-fill">
            {" "}
            {data.media_type.toUpperCase()}
          </i>
        </p>
        <Link
          to={`/${data.media_type}/details/${data.id}/trailer`}
          className="p-3 mt-2 text-white font-semibold rounded bg-[#6556CD]"
        >
          Watch Trailer
        </Link>
      </div>
    </div>
  );
};

export default Header;
