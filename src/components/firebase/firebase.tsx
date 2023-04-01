// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3uV83DFkCdIqzDRctb2nBizqqSgsLSmA",
  authDomain: "d-hub-ec74f.firebaseapp.com",
  projectId: "d-hub-ec74f",
  storageBucket: "d-hub-ec74f.appspot.com",
  messagingSenderId: "572875800850",
  appId: "1:572875800850:web:3d96041498d06c756333cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged }