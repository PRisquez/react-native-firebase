import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC7g3pBctvV1f9ljnau38zaE5Xetvi8Gfg",
  authDomain: "react-native-firebase-fb42e.firebaseapp.com",
  projectId: "react-native-firebase-fb42e",
  storageBucket: "react-native-firebase-fb42e.appspot.com",
  messagingSenderId: "906678223383",
  appId: "1:906678223383:web:63370b5d14d9e02dd1d252"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};