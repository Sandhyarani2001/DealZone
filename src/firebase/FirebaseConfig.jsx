// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0K_gyIYh-VXjUt2OdggM9sZZoKzZHR08",
  authDomain: "my-first-app-e2ce9.firebaseapp.com",
  projectId: "my-first-app-e2ce9",
  storageBucket: "my-first-app-e2ce9.appspot.com",
  messagingSenderId: "14592591742",
  appId: "1:14592591742:web:391add5ed5ecbe8b49152f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app)

export{fireDB, auth}