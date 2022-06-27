import { onValue, ref, get } from "firebase/database";
import db from "./index.js";
const allUsersRef = ref(db, "users/");

export function getAllUsers() {
  onValue(allUsersRef, (snapshot) => {
    const data = snapshot.val();

    console.log(data);
  });
  // return users;
}

// console.log(getAllUsers());

getAllUsers();
