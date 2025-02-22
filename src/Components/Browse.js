import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies'
import usePopularMovies from '../Hooks/usePopularMovies';
import useTopRatedMovies from '../Hooks/useTopRatedMovies';
import useUpcomingMovies from '../Hooks/useUpcomingMovies';
import Header from './Header'
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from './GptSearch';


const Browse = () => {

  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);

 useNowPlayingMovies();
 usePopularMovies();
 useTopRatedMovies();
 useUpcomingMovies();

  return (
    <div>
     
      <Header />
      {showGptSearch ? (<GptSearch />) : (
        <>
        <MainContainer />
        <SecondaryContainer />
      </>
      )}
      
    </div>
  )
}

export default Browse
