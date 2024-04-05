// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVXX_wPWvzPsxIh6HV8KyJza4v-ndISZI",
  authDomain: "sawmillgo.firebaseapp.com",
  projectId: "sawmillgo",
  storageBucket: "sawmillgo.appspot.com",
  messagingSenderId: "669096213846",
  appId: "1:669096213846:web:1f0b14d42d93fc58582af7",
  measurementId: "G-0PY5BPSR63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export { app, analytics };