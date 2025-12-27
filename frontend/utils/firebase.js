// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-cfddf.firebaseapp.com",
  projectId: "loginvirtualcourses-cfddf",
  storageBucket: "loginvirtualcourses-cfddf.firebasestorage.app",
  messagingSenderId: "594163146924",
  appId: "1:594163146924:web:40a251e88110d85d1cff09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider};