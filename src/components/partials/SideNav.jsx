
import { Link } from "react-router-dom";

const SideNav = () => {


  return (
    <div className="w-[17%] h-full  border-r-2 border-zinc-400 p-3">
      <h1 className="text-2xl text-white font-bold">
        <i className=" text-[#6556CD] ri-tv-fill mr-2"></i>
        <span className="text-2xl">SMDB.</span>{" "}
      </h1>

      <nav className="flex flex-col text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-2xl mt-10 mb-5">
          New Feeds
        </h1>

        <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5 ">
          <i className="mr-3 ri-fire-fill"></i>
          Trendings
        </Link>
        <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5">
          <i className=" mr-4 ri-bard-fill"></i>
          Popular
        </Link>
        <Link  to="/movie" className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5 ">
          <i className=" mr-4 ri-movie-2-fill"></i>
          Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5  ">
          <i className=" mr-4 ri-tv-2-fill"></i>
          tv Shows
        </Link>
        <Link to="/people" className="hover:bg-[#6556CD] hover:text-white duration-300  rounded-lg p-5   ">
          <i className=" mr-4 ri-team-fill"></i>
          People
        </Link>
      </nav>
      <hr className="border-none h-[2px] bg-zinc-400" />

      <nav className="flex flex-col text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mt-3 mb-5">
          Website Information
        </h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
        <i className=" mr-3 ri-information-fill"></i>
          About
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5 ">
        <i className=" mr-2 ri-phone-fill"></i>
          Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
