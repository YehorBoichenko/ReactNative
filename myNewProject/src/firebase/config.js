import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-pN1e4er0PxZc76ZAc2KaV9TV0ybz1CQ",
  authDomain: "rn-project-de18a.firebaseapp.com",
  projectId: "rn-project-de18a",
  storageBucket: "rn-project-de18a.appspot.com",
  messagingSenderId: "593105744164",
  appId: "1:593105744164:web:3d9d5b3b70d36b2606c3b1",
  measurementId: "G-1H04513493",
};
const db = firebase.initializeApp(firebaseConfig);

export default db;
