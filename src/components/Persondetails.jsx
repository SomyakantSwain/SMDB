import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./partials/Loading";

const Persondetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispath = useDispatch();
  const [category, setcategory] = useState("movie");
  console.log(info);
  useEffect(() => {
    dispath(asyncloadperson(id));
    return () => {
      dispath(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] w-screen min-h-full flex bg-[#1F1E24] flex-col">
      {/* part-1 navigation */}
      <nav className="w-full text-zinc-300 flex items-center gap-7 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-s-fill"
        ></Link>
      </nav>

      <div className="w-full flex ">
        {/* part 2 left poster anad details */}
        <div className="w-[20%]">
          <img
            className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5 )]  h-[35vh] object-cover "
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className=" w-[90%]  mt-3 mb-5 h-[2px] bg-zinc-300" />

          {/* Socialmedia Links */}
          <div className="text-2xl flex gap-x-6 text-white">
            <a
              target="_blank"
              className=""
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-line"></i>
            </a>

            <a
              target="_blank"
              className=""
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-line"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_x_id}`}
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>

          {/* Personal info  */}
          <h1 className="text-2xl font-bold text-zinc-400  my-5  ">
            Person info
          </h1>
          <h1 className="text-xl font-semibold  text-zinc-400">Known for</h1>
          <h1 className="text-xl font-semibold  text-zinc-400">
            {info.detail.known_for_department}
          </h1>
          <h1 className="text-xl font-semibold mt-2  text-zinc-400">Gender</h1>
          <h1 className=" text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-xl font-semibold  mt-2   text-zinc-400">
            Birthday
          </h1>
          <h1 className=" text-zinc-400">{info.detail.birthday}</h1>
          <h1 className="text-xl font-semibold  mt-2  text-zinc-400">
            Place of Birth
          </h1>
          <h1 className=" text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className="text-2xl font-semiboldl  mt-2  text-zinc-400">
            Deathday
          </h1>
          <h1 className=" text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className="text-xl font-semibold  mt-2  text-zinc-400">
            Also known as
          </h1>
          <h1 className=" text-zinc-400">
            {info.detail.also_known_as.join("     ,     ")}
          </h1>
        </div>

        {/* Part 3 right details and info */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl font-bold text-zinc-400  my-5  ">
            {info.detail.name}
          </h1>
          <h1 className="text-xl font-semibold  text-zinc-400">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="text-xl font-semibold my-4  text-zinc-400">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className=" mt-5 text-xl font-semibold  text-zinc-400">
              Acting Carrier
            </h1>
            <Dropdown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className=" list-disc mt-3 text-zinc-400 w-full h-[50vh]  mb-[20%] overflow-x-hidden overflow-y-auto shadow-[rgba(255,255,255,.3)]  borde-2 border-zi800 shadow-lg">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 duration-200 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block">
                    {c.character && `Character Name : ${c.character}`}{" "}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;
