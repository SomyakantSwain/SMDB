import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmQ4N2U0NmZkNWUxODI0ODQ4MDc5MGFiY2I0Y2JhNCIsIm5iZiI6MTcyMzAzMTgzMC42NzI1ODIsInN1YiI6IjY2YjA0Y2YxODY1NzIxMGNmMGJkY2UyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.47s8txQ19LLnCAVHghEjGixCNIZbiPxHG6SkNPTvLNY'
    }
})
export default instance