import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../Utils/firebase";
import { useNavigate } from 'react-router-dom';
 import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';
import { LOGO } from '../Utils/Constants';
import { toggleGptSearchView } from '../Utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../Utils/Constants';
import { changeLanguage } from '../Utils/configSlice';

const Header = () => { 
  const navigate= useNavigate();
  const dispatch=useDispatch();
   const user=useSelector(store=> store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      // navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  
  }

  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth, (user) => {
        if (user) {
          // Sign In and Sign Up 
          const {uid,email,displayName,photoURL} = user;
          dispatch(
            addUser({
                uid:uid,
                email:email,
                displayName: displayName,
                photoURL:photoURL}));
           navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
      //Unsubscribed when the component is Unmounted
      return () => unsubscribe();

},[]);



const handleGptSearchClick=()=>{
  //toggle gpt search
  dispatch(toggleGptSearchView());
};

const handleLanguageChange=(e)=>{
  // console.log(e.target.value);
   dispatch(changeLanguage(e.target.value));
}

const showGptSearch= useSelector(store=>store.gpt.showGptSearch);

 return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
   <img className="w-44"
    src={LOGO}
     alt="logo" />

  {user && (
    <div className="flex p-2">
      { showGptSearch &&
      
      <select className="py-2 m-2 bg-gray-900 text-white"
      onChange={handleLanguageChange}>
        { SUPPORTED_LANGUAGES.map((lang)=>(
          <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>

        ))}
      </select>
  }

   <button  onClick={handleGptSearchClick}
    className="my-2 mx-4 py-2 px-2 bg-purple-500 text-white rounded-lg font-medium"
        > {showGptSearch ? "HomePage" :"Gpt Search"}
      </button>

      <img className="w-12 h-12"
      src ={user.photoURL}   
      alt="user-icon"   />
      {/* src="https://preview.redd.it/sgfxdosc4qo81.png?width=338&format=png&auto=webp&s=68081fe5673ff6ac567a531ae01a786ca80695f6" */}


     
     
     <button onClick={(handleSignOut)} className="font-bold text-white ">
        (Sign Out)
      </button>
    </div>
  )};
    </div>
  );
};

export default Header
