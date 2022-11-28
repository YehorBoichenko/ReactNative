import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKTZqNi1XuZn_ISmspcJLfYywWUnzNBKQ",
  authDomain: "rectnativeproject.firebaseapp.com",
  projectId: "rectnativeproject",
  storageBucket: "rectnativeproject.appspot.com",
  messagingSenderId: "1071170561869",
  appId: "1:1071170561869:web:beca6e4f1e2dbf43f33904",
  measurementId: "G-PY22RRTSHX",
};
const db = firebase.initializeApp(firebaseConfig);

export default db;
