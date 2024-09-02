

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";


const Movie = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("now_playing")

    const [movie, setmovie] = useState([])
   const [page, setpage] = useState(1)
   const [hasmore, sethasmore] = useState(true)
   document.title="SMDB | movie" + category.toUpperCase();
   const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length>0) {
        
          setmovie((previousstate)=>[...previousstate,...data.results]);
          setpage(page+1)
      }else{
        sethasmore(false)

      }
    //   console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler =  () => {
    if(movie.length === 0){
        GetMovie();
    }else{
        setpage(1)
         setmovie([])
         GetMovie()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category])
 



    return  movie.length > 0 ? (
    <div className=" px-10 w-screen h-screen ">
      <div className="w-full  flex items-center ">
        <h1 className="text-2xl w-[23%]  flex font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-s-fill"
          ></i>{" "}
          Movie <h4 className=" text-sm">({category})</h4>
        </h1>
        <Topnav />
        
        <Dropdown title="Category" options={["popular","top_rated","upcoming"]} func={(e)=>setcategory(e.target.value)} />
                <div className="w-6"></div>
       
      </div>
       
        <InfiniteScroll
         dataLength={movie.length}
         next={GetMovie()}
         hasMore={hasmore}
        loader={<h1>Loading...</h1>}
        >


      <Cards data={movie} title="movie" />
      
      </InfiniteScroll>
    </div>
  ):(
    <Loading/>
  );
};



export default Movie