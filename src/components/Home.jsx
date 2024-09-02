import React, { useEffect, useState } from "react";
import SideNav from "./partials/SideNav";
import Topnav from "./partials/Topnav";
import axios from ".././utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./partials/Loading";

import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  document.title = "SMDB | HOMEPAGE";
  const [wallapaper, setwallapaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");
  const { loginWithRedirect, logout, isAuthenticated ,user} = useAuth0();
  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallapaper(randomdata);
    } catch (error) {
      console.log(error);
    }
  };
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !wallapaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);
 
  console.log(user);
 
  

  return wallapaper && trending ? (
    <>
      <SideNav />
      <div className="w-[83%] h-full  overflow-auto overflow-x-hidden ">
        <div className="flex items-center">
          <Topnav />
          
        </div>
        <Header data={wallapaper} />

        <div className="mb-4 flex justify-between p-4 ">
          <h1 className="  text-3xl text-zinc-400 font-bold">Trending</h1>

          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
