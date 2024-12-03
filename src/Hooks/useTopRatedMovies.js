import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTopRatedMovies} from "../Utils/movieSlice";
import { useEffect } from "react";



const useTopRatedMovies=()=>{
     //fetch the data  from the TMDB API and moving those data into the store

  const dispatch=useDispatch();

  const getTopRatedMovies= async ()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', 
      API_OPTIONS
    );
    const json =await data.json();
     console.log(json.results);
    //need to pass the data into the slice using dispatch action
    dispatch(addTopRatedMovies(json.results));

  }

   useEffect(()=>{
      getTopRatedMovies();
   },[]);


};
export default useTopRatedMovies;