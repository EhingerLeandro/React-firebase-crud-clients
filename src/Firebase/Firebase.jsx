// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPIPp2i1u46ewa6_q9dl99N0M13v545Zo",
  authDomain: "project-react-firebase-crud.firebaseapp.com",
  projectId: "project-react-firebase-crud",
  storageBucket: "project-react-firebase-crud.appspot.com",
  messagingSenderId: "825139944635",
  appId: "1:825139944635:web:3704e2a263223cc2031d9e",
  measurementId: "G-D3ZYPYT7WF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;