import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvAction";
import Loading from "./partials/Loading";

import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";

const Tvdetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);

  const dispath = useDispatch();
  useEffect(() => {
    dispath(asyncloadtv(id));
    return () => {
      dispath(removetv());
    };
  }, [id]);

  console.log(info);

  return info ? (
    <div
    style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.8),rgba(0, 0, 0, .9)) ,url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      backgroundSize: "cover",
      backgroundPosition: "top",
    }}
      className="w-full min-h-screen overflow-auto mb-5 px-[10%]"
    >
      {/* part-1 navigation */}
      <nav className="w-full text-zinc-300 flex items-center gap-7 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-s-fill"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          className=""
          href={`https://www .wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdb
        </a>
      </nav>
      {/* part-2  information */}
      <div className="  w-full mt-4 flex   ">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5 )] w-[22vw] h-[55vh] object-cover "
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content text-white   ml-8">
          <h1 className="text-5xl  text-white font-black ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-2xl font-bold text-zinc-200">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className=" mt-3  mb-2 flex  text-white items-center gap-x-5">
            <span className="  ml-5  rounded-full text-xl text-white bg-yellow-600 w-[6vh] h-[6vh] flex items-center  justify-center">
              {(info.detail.vote_average * 10).toFixed()}
              {""}
              <sup>%</sup>
            </span>
            <h1 className="font-semi-bold text-2xl w-[60px] leading-6">
              User Score
            </h1>
            <h1> ({info.detail.first_air_date})</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
          </div>
          <h1 className=" text-white text-2xl italic">{info.detail.tagline}</h1>
          <h1 className="text-2xl mb-2 mt-1">
            <span className="italic text-3xl text-orange-300">O</span>verview
          </h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-2xl mb-2">
            <span className="italic text-3xl text-orange-300">A</span>vailable{" "}
            <span className=" text-3xl text-orange-300">l</span>anguages
          </h1>
          <p className="w-[140vh] mb-5 text-orange-300">
            {info.translations.join(" , ")}
          </p>
          <Link
            className=" py-2 px-5 rounded-md bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Available on Platform */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platfotms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* part 4    Seasons*/}
      <h1 className="text-white mb-6 text-2xl">Seasons</h1>

      <div className=" w-full flex overflow-y-hidden ">
        {info.detail.seasons.map((s, i) => (
          <Link
            to={`/tv/details/${s.id}/season/${s.season_number}`}
            key={i}
            className=""
          >
            <div key={i} className="w-[11.5vw] ">
              <img
                className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5 )]   h-[33vh]   object-cover "
                src={`https://image.tmdb.org/t/p/original/${
                  s.poster_path || s.backdrop_path || s.profile_path
                }`}
                alt=""
              />

              <h1 className="text-zinc-300 w-[11vw] mt-1  font-bold text-2xl">
                {s.name || s.title || s.original_name || s.original_title}
              </h1>
            </div>
          </Link>
        ))}
      </div>

      <hr className=" w-[90%]  mt-10 mb-5 h-[2px] bg-zinc-300" />

      {/* part 5 */}
      <h1 className="text-white mb-6 text-2xl">Recommendatins and similar</h1>

      <HorizontalCards
        title="tv"
        data={
          info.recommendations.results
            ? info.recommendations.results
            : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetails;
