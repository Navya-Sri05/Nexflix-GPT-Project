import React, { useRef } from 'react';
import geminiai from "../Utils/geminiai";
import lang from '../Utils/langConstants' ;
import { useSelector } from 'react-redux';
import { API_OPTIONS } from '../Utils/Constants';
import { addGptMovieResult } from '../Utils/gptSlice';
import { useDispatch } from 'react-redux';


const GptSearchBar = () => {
    const langKey = useSelector (store=>store.config.lang);
    const searchText= useRef(null);


    const dispatch = useDispatch();

        // search movie in TMDB
        const searchMovieTMDB = async (movie) => {
            const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" +
                 movie + 
                 "&include_adult=false&language=en-US&page=1", 
                API_OPTIONS
            );
    
            const json = await data.json();
            
            return json.results;
        }

const handleGptSearchClick= async ()=>{
    console.log(searchText.current.value);
    //make an API call to GPT  API and get  movie results

    const model = geminiai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Act as a movie Recommendation system and suggest me some movies for the query:" +
        searchText.current.value + 
        ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result : Amaram,Lucky bhaskar,Chali,Pokiri,Kaleja  ";
        const result = await model.generateContent(prompt);
        // console.log(result.response.text());
        const geminiMovies = result.response.text().split(",");

        // For each movie I'll search TMDB API
        const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie)); 
        // console.log(promiseArray);
        //   (5) [Promise, Promise, Promise, Promise, Promise]
        
        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults);


        dispatch(addGptMovieResult({movieNames: geminiMovies, movieResults: tmdbResults}));

     

};
  return (
    <div className="pt-[10%] flex justify-center">
      <form className=" w-1/2 grid grid-cols-12 bg-black "
       onSubmit = {(e)=>e.preventDefault()}>
        <input
        ref={searchText}
         type="text" 
         className="p-4 m-4  text-black col-span-9 border-black" 
         placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button 
        className=" col-span-3  m-4 rounded-md text-white bg-red-800 py-2 px-4" onClick={handleGptSearchClick}> 
         {/* {lang.hindi.search} */}
         {lang[langKey].search}
        </button>

      </form>
    </div>
  )
}

export default GptSearchBar
