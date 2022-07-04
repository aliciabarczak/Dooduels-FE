import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC750zFfrLEjsZLwICM4LG69DzUFYbvkNQ",
  authDomain: "dooduel-2.firebaseapp.com",
  databaseURL: "https://dooduel-2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dooduel-2",
  storageBucket: "dooduel-2.appspot.com",
  messagingSenderId: "806133482818",
  appId: "1:806133482818:web:d98e1320c8e938052234db",
  measurementId: "G-FSNPZVVV5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();

export default db;
