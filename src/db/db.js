import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBe3ElmhQiRZIye8JqruqtqlZ2BEqNG5_8",
  authDomain: "dooduel-lw.firebaseapp.com",
  databaseURL:
    "https://dooduel-lw-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dooduel-lw",
  storageBucket: "dooduel-lw.appspot.com",
  messagingSenderId: "766980820124",
  appId: "1:766980820124:web:583a2d2001bd5385a5f159",
  measurementId: "G-9K2XBBV1K7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();

export default db;
