import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
//var dateFormat = require('dateformat');

var firebaseConfig = {
   apiKey: "AIzaSyDAnG8H-CnhCorWeh0R1WPv1jB2Z3xcSEQ",
   authDomain: "gotogether-78a33.firebaseapp.com",
   databaseURL: "https://gotogether-78a33.firebaseio.com",
   projectId: "gotogether-78a33",
   storageBucket: "gotogether-78a33.appspot.com",
   messagingSenderId: "57700017956",
   appId: "1:57700017956:web:1bc9c8ff66159d25f6b5b1",
   measurementId: "G-7YLN2ZD2YF"
 };
 export const fire = firebase.initializeApp(firebaseConfig);
 const storage = firebase.storage();
 export var database = firebase.database();
 export const auth = firebase.auth();
 export {
   storage, fire as default
 }
