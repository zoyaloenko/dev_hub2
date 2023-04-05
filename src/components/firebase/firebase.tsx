import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: "AIzaSyC3uV83DFkCdIqzDRctb2nBizqqSgsLSmA",
  // authDomain: "d-hub-ec74f.firebaseapp.com",
  // projectId: "d-hub-ec74f",
  // storageBucket: "d-hub-ec74f.appspot.com",
  // messagingSenderId: "572875800850",
  // appId: "1:572875800850:web:3d96041498d06c756333cb"
  apiKey: "AIzaSyBlpujwZ91ZEtoNBD7mJJYnH0Ih4R9rV_8",
  authDomain: "dev-hub-9dcad.firebaseapp.com",
  databaseURL: "https://dev-hub-9dcad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dev-hub-9dcad",
  storageBucket: "dev-hub-9dcad.appspot.com",
  messagingSenderId: "969317069452",
  appId: "1:969317069452:web:61a5c7036b1cbd088381a9",
  measurementId: "G-2PMPX9XVBW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged }