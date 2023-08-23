

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
console.log(process.env)
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APIKEY}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINID}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };