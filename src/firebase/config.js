import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBxKfwyZIkIDwON58i9CG_41iG_Hzu4uTg",
  authDomain: "elibrary-38a3f.firebaseapp.com",
  projectId: "elibrary-38a3f",
  storageBucket: "elibrary-38a3f.appspot.com",
  messagingSenderId: "556454138437",
  appId: "1:556454138437:web:cc27ed93f29be290e3092c"
};

// initialize firebase
firebase.initializeApp(firebaseConfig)

// initialize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }
