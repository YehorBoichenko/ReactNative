import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHDFfdxGX99FQXApjwzpqzOER9iKUW_t0",
  authDomain: "react-native-909f4.firebaseapp.com",
  projectId: "react-native-909f4",
  storageBucket: "react-native-909f4.appspot.com",
  messagingSenderId: "293830603032",
  appId: "1:293830603032:web:f68e320d22f03527d82e6d",
  measurementId: "G-TGNLJ3CMH0",
};
const db = firebase.initializeApp(firebaseConfig);

export default db;
