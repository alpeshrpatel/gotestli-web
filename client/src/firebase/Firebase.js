// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg48NzYQLVyF44KdBZETMZwvzGz29lgck",
  authDomain: "gotestli-5d589.firebaseapp.com",
  projectId: "gotestli-5d589",
  storageBucket: "gotestli-5d589.appspot.com",
  messagingSenderId: "986628107024",
  appId: "1:986628107024:web:58511c57ef17fc2ca95395",
  measurementId: "G-ZG2QWNHP62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);