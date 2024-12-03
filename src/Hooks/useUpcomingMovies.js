import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addUpcomingMovies} from "../Utils/movieSlice";
import { useEffect } from "react";



const useUpcomingMovies=()=>{
     //fetch the data  from the TMDB API and moving those data into the store

  const dispatch=useDispatch();

  const getUpcomingMovies= async ()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', 
      API_OPTIONS
    );
    const json =await data.json();
     console.log(json.results);
    //need to pass the data into the slice using dispatch action
    dispatch(addUpcomingMovies(json.results));

  }

   useEffect(()=>{
      getUpcomingMovies();
   },[]);


};
export default useUpcomingMovies;