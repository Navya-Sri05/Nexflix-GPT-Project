import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggesitions from './GptMovieSuggesitions'
import { backGroundImg } from '../Utils/Constants'

const GptSearch = () => {
  return (
    <div>
        <div className="fixed -z-20">
        <img src={backGroundImg} alt="bg-logo"/>
        </div>
        <GptSearchBar />
        <GptMovieSuggesitions />
     
    </div>
  )
}

export default GptSearch
