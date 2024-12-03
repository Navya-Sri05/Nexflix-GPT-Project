import  { useEffect } from 'react'
import { API_OPTIONS } from '../Utils/Constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../Utils/movieSlice';

const useMovieTrailer = (movieId) => {
  const dispatch=useDispatch();

  //creating state variable for the trailer key 
  // const [trailerId,setTrailerId]=useState(null);

  const getMovieVideos = async ()=>{
    const data =await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",API_OPTIONS);
    const json =await data.json();
     console.log(json);

    const filterData= json.results.filter((video)=>video.type ==="Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    // console.log(trailer);
    // setTrailerId(trailer.key);
    dispatch(addTrailerVideo(trailer));
 };
 useEffect(()=>{
  getMovieVideos();

 },[]);
 
}

export default useMovieTrailer
