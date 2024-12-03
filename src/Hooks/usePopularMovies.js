import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addPopularMovies} from "../Utils/movieSlice";
import { useEffect } from "react";



const usePopularMovies=()=>{
     //fetch the data  from the TMDB API and moving those data into the store

  const dispatch=useDispatch();

  const getPopularMovies= async ()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/popular', 
      API_OPTIONS
    );
    const json =await data.json();
     console.log(json.results);
    //need to pass the data into the slice using dispatch action
    dispatch(addPopularMovies(json.results));

  }

   useEffect(()=>{
      getPopularMovies();
   },[]);


};
export default usePopularMovies;