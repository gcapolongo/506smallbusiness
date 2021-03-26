import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database"

var firebaseConfig = {
    apiKey: "AIzaSyD9-wyFdMI0dViZRgnjZt2mnBogOjfK42A",
    authDomain: "testproject-558df.firebaseapp.com",
    databaseURL: "https://testproject-558df-default-rtdb.firebaseio.com",
    projectId: "testproject-558df",
    storageBucket: "testproject-558df.appspot.com",
    messagingSenderId: "314979716793",
    appId: "1:314979716793:web:0eec13979952147e969568",
    measurementId: "G-JJFQVNV2GP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  var auth = firebase.auth()

  export {firebase, auth, database };