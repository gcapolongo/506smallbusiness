import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firebase-database"

//project configuration
var firebaseConfig = {
    apiKey: "AIzaSyCXlR1s70kqDry3eAts4HG0QYls-uZYJtc",
    authDomain: "test506-f4069.firebaseapp.com",
    projectId: "test506-f4069",
    storageBucket: "test506-f4069.appspot.com",
    messagingSenderId: "703994938854",
    appId: "1:703994938854:web:191e92c33377c646d5c227"
  };

  // Initializes Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  var auth = firebase.auth();

  export {firebase, auth, database };

  