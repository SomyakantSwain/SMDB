import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";

import axios from "../utils/axios";
import Cards from "./partials//Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./partials/Loading";

const People = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");

  const [person, setperson] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  document.title = "SMDB | person" + category.toUpperCase();
  const Getperson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setperson((previousstate) => [...previousstate, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      Getperson();
    } else {
      setpage(1);
      setperson([]);
      Getperson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className=" px-10 w-screen h-screen ">
      <div className="w-full  flex items-center ">
        <h1 className="text-2xl w-[23%]  font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-s-fill"
          ></i>{" "}
        </h1>
        <Topnav />
      </div>

      <InfiniteScroll
        dataLength={person.length}
        next={Getperson()}
        hasMore={hasmore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ):(
    <Loading/>
  );
};

export default People;
