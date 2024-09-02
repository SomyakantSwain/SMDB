import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { useEffect } from "react";
import noimg from "/noimg.jpeg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      console.log(searches);

      setsearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-[65%]  h-[10vh]  relative flex justify-start items-center z-[]  ml-[15%]">
      <i className="  text-zinc-400 text-3xl   ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
          className="w-[35vw] mx-10 rounded px-5 py-1 outline-none border-none bg-[#6656cd5b] text-white "
        type="text"
        placeholder="serach Anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="  text-zinc-400 text-3xl  ri-close-circle-line"
        ></i>
      )}

      <div className=" z-[100] absolute w-[50%] max-h-[50vh]    left-[15%] overflow-y-auto top-[100%] ">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="  hover:text-black hover:bg-zinc-600 duration-300 font-semibold text-zinc-200 p-7 bg-zinc-800 w-full flex justify-start items-center  rounded-md  border-t-1 border-b-2 border-zinc-600"
          >
            <img
              className="w-[15vh] h-[10vh] object-cover mr-3 rounded shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimg
              }
              alt=""
            />
            <div className="ml-[10%]">
              <h4> Media : {s.media_type}</h4>
              <h1 className="text-xl">
                {s.name || s.title || s.original_name || s.original_title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
