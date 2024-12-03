// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB121YyOlygdD4GD0I7BRilIT0RYu__0WU",
  authDomain: "netflix-gpt-d51af.firebaseapp.com",
  projectId: "netflix-gpt-d51af",
  storageBucket: "netflix-gpt-d51af.appspot.com",
  messagingSenderId: "458200796902",
  appId: "1:458200796902:web:7cd0992f8da0bada72b527",
  measurementId: "G-VDJ8T82NN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();