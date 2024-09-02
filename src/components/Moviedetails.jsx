import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieAction";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./partials/Loading";

const Moviedetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(asyncloadmovie(id));
    return () => {
      dispath(removemovie());
    };
  }, [id]);
  console.log(info);
  

  return info ? (
    info && (
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.5),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}})`,
          backgroundPosition: "center",

          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-screen h-[130vh] mb-5 px-[10%]"
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
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
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
            className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5 )] w-[38vh] h-[61vh] object-cover "
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

              <small className="text-2xl font-bold text0zinc-300">
                ({info.detail.release_date.split("-")[0]})
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
              <h1> ({info.detail.release_date})</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
              <h1>{info.detail.runtime}min</h1>
            </div>
            <h1 className=" text-white text-2xl italic">
              {info.detail.tagline}
            </h1>
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

        {/* part 3 */}

        <div className=" w-[80%] flex-col gap-y-5 mt-5 ">
          {info.watchprovider && info.watchprovider.flatrate && (
            <div className="flex   text-white gap-x-10 items-center ">
              <h1> Available on platform</h1>
              {info.watchprovider.flatrate.map((w, i) => (
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

          {info.watchprovider && info.watchprovider.rent && (
            <div className="flex  mt-4 text-white gap-x-10 items-center ">
              <h1> Available on rent</h1>
              {info.watchprovider.rent.map((w, i) => (
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

          {info.watchprovider && info.watchprovider.buy && (
            <div className="flex  mt-4 text-white gap-x-10 items-center ">
              <h1> Available on buy</h1>
              {info.watchprovider.buy.map((w, i) => (
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

        <hr className=" w-[90%]  mt-10 mb-5 h-[2px] bg-zinc-300" />

        {/* part 4 */}
        <h1 className="text-white mb-6 text-2xl">Recommendatins and similar</h1>

        <HorizontalCards
        title="movie"
          data={
            info.recommendations.results
              ? info.recommendations.results
              : info.similar
          }
        />
        <Outlet />
      </div>
    )
  ):(
    <Loading/>
  );
};

export default Moviedetails;
