// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";
import conf from "../conf/conf";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: conf.apiKey,
  authDomain: conf.authUrl,
  projectId: conf.projectId,
  storageBucket: conf.bucketId,
  messagingSenderId: conf.senderId,
  appId: conf.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app)

export{fireDB, auth}