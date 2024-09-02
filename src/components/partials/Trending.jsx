import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
const Trending = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all")
  const [duration, setduration] = useState("day")
  const [trending, settrending] = useState([])
 const [page, setpage] = useState(1)
 const [hasmore, sethasmore] = useState(true)
 document.title="SMDB | Trending" + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if (data.results.length>0) {
        
          settrending((previousstate)=>[...previousstate,...data.results]);
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
    if(trending.length === 0){
        GetTrending();
    }else{
        setpage(1)
         settrending([])
         GetTrending()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category,duration])
  
  
  
  return trending.length > 0 ? (
    <div className=" px-10 w-screen h-screen ">
      <div className="w-full  flex items-center ">
        <h1 className="text-2xl w-[20%]  font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-s-fill"
          ></i>{" "}
          Trending
        </h1>
        <Topnav />
        
        <Dropdown title="Category" options={["movie", "tv", "All"]} func={(e)=>setcategory(e.target.value)} />
                <div className="w-6"></div>
        <Dropdown title="Duration" options={["week", "day"]} func={(e)=>setduration(e.target.value)}   />
      </div>
       
        <InfiniteScroll
         dataLength={trending.length}
         next={GetTrending()}
         hasMore={hasmore}
        loader={<h1>Loading...</h1>}
        >


      <Cards data={trending} title={category} />
      
      </InfiniteScroll>
    </div>
  ): (
    <Loading/>
  )
};

export default Trending;
