
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Cards from "./Cards";
import InfiniteScroll from "react-infinite-scroll-component";




const Popular = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("movie")

    const [popular, setpopular] = useState([])
   const [page, setpage] = useState(1)
   const [hasmore, sethasmore] = useState(true)
   document.title="SMDB | Popular" + category.toUpperCase();
   const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length>0) {
        
          setpopular((previousstate)=>[...previousstate,...data.results]);
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
    if(popular.length === 0){
        GetPopular();
    }else{
        setpage(1)
         setpopular([])
         GetPopular()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category])
 

  return (
    <div className=" px-10 w-screen h-screen ">
      <div className="w-full  flex items-center ">
        <h1 className="text-2xl w-[20%] flex font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-s-fill"
          ></i>{" "}
          Popular <h4 className="text-sm">({category})</h4>
        </h1>
        <Topnav />
        
        <Dropdown title="Category" options={["movie", "tv", "All"]} func={(e)=>setcategory(e.target.value)} />
                <div className="w-6"></div>
       
      </div>
       
        <InfiniteScroll
         dataLength={popular.length}
         next={GetPopular()}
         hasMore={hasmore}
        loader={<h1>Loading...</h1>}
        >


      <Cards data={popular} title={category} />
      
      </InfiniteScroll>
    </div>
  );
};



export default Popular