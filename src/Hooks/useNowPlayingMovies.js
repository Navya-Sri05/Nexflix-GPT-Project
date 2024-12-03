import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addNowPlayingMovies } from "../Utils/movieSlice";
import { useEffect } from "react";



const useNowPlayingMovies=()=>{
     //fetch the data  from the TMDB API and moving those data into the store

  const dispatch=useDispatch();

  const nowPLayingMovies = useSelector(store=>store.movies.nowPLayingMovies);

  const getNowPlayingMovies= async ()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', 
      API_OPTIONS
    );
    const json =await data.json();
     console.log(json.results);
    //need to pass the data into the slice using dispatch action
    dispatch(addNowPlayingMovies(json.results));

  }

   useEffect(()=>{
    if(!nowPLayingMovies)
      getNowPlayingMovies();
   },[]);


};
export default useNowPlayingMovies;