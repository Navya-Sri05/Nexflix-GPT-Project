import React, { useRef, useState } from 'react';
import Header from './Header';
import {checkValidData} from "../Utils/Validation";
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../Utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { backGroundImg, USER_AVATAR } from '../Utils/Constants';




const Login = () => {

  const [isSignInForm,setIsSignInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  
 const dispatch=useDispatch();
 
   
  //  const name=useRef(null);
  const email=useRef(null);
  const password= useRef(null);

  const handleButtonClick= ()=>{
    //validate the form here
    const message= checkValidData(email.current.value,password.current.value);

    // console.log(email.current.value);
    setErrorMessage(message);

  
    if(message) return;
    //Sign In and Sign Up LOgic
    if(!isSignInForm){
      //Sign Up logic

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value)
    .then((userCredential) => {
    // Sign up  LOgic
    const user = userCredential.user;
    updateProfile(user, 
      {
        // displayName=name.current.value;
      displayName: "Navya Sri",
        photoURL:USER_AVATAR,
      

    })
    .then(() => {
      const {uid,email,displayName,photoURL} = auth.current;
      dispatch(
        addUser({
            uid:uid,
            email:email,
            displayName: displayName,
            photoURL:photoURL}));
      // Profile updated!
     
    })
    .catch((error) => {
      // An error occurred
      setErrorMessage(error.message);
    });
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+ "-"+errorMessage);
   
  });
}
    else{
      // Sign In 
      signInWithEmailAndPassword(
        auth,
       email.current.value,
        password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode +"-"+errorMessage);
  });
}};

  const toggledSignInForm =()=>{
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
        <Header />
        <div className="absolute">
        <img src={backGroundImg} alt="bg-logo"/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-32 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 ">
        <h1 
        className="font-bold text-xl">
          {/* Sign In */}
          {isSignInForm ? "Sign In":"Sign Up"}
          </h1>
          {!isSignInForm && (<input 
          type="text" 
          // ref={name}
          placeholder="Full Name"  
          className="p-4 my-4 w-full bg-gray-900 bg-opacity-80"
          />)}
          <input  ref={email} type="text" 
          placeholder="Email or Mobile Address"  
          className="p-4 my-4 w-full bg-gray-900 bg-opacity-80"
          />
          <input  ref={password}
          type="password"  
          placeholder="password" 
          className="p-4 my-4 w-full bg-gray-900 bg-opacity-80" 
          />
          <p className="text-red-500 text-lg font-bold py-2">{errorMessage}</p>
          <button className="p-4 my-6 cursor-pointer bg-red-700 rounded-lg w-full" onClick={handleButtonClick}> 
             {isSignInForm ? "Sign In":"Sign Up"}
          </button>
          {/*  <h1 className="text-center">OR</h1> */}
          {/* <button className="rounded-lg bg-gray-600 p-4 my-4 w-full">Use a sign-in code</button>
          <h1 className="text-center">Forgot Password?</h1> */}
          {/* <h1 className="font-bold p-2 ">Rememder Me?</h1> */}
          <p className=" py-4 cursor-pointer " onClick={toggledSignInForm}>
            {!isSignInForm 
            ? "New to Netflix? Sign In Now" 
            :"Already registered Sign Up Now."}
          </p>

        </form>
    </div>
  )
}

export default Login

