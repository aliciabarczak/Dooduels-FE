import { onValue, ref, get, child, push, set, } from "firebase/database";
import db from "./index.js";

export function getAllUsers(setState) {
  const allUsersRef = ref(db, "users/");
  geet(allUsersRef).then(snapshot => {
    const users = snapshot.val();
    // console.log(data);
    setState(users)
  });
}

export function getAllRooms(setState) {
  const allRoomsRef = ref(db, "rooms/")
  get(allRoomsRef).then(snapshot => {
    const rooms = snapshot.val()
    setState(rooms)
  })
}

export function getUserById(user_id, setState) {
  const oneUserRef = ref(db, "users/" + user_id)
  get(oneUserRef).then(snapshot => {
    const user = snapshot.val()
    setState(user)
  }) 
}

export function getRoomById(room_id, setState) {
  const oneRoomRef = ref(db, "rooms/" + room_id)
  get(oneRoomRef).then(snapshot => {
    const room = snapshot.val()
    setState(room)
  }) 
}

export function addUser(user) {
  const allUsersRef = ref(db, "users/")
  push(allUsersRef, user);
}

const happyAmy = {
  user_name: 'happyAmy',
  password: 'password123',
  avatar_url: 'https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729',
  points: 350
}

export function awardPointsToUser(points, user_id) {
  const oneUserRef = ref(db, "users/" + user_id)
  const userPointsRef = ref(db, "users/" + user_id + "/points")
  get(oneUserRef).then((snapshot) => {
    const user = snapshot.val()
    set(userPointsRef, (user.points + points))
  }) 
}

export function updateUserAvatar(avatar_url, user_id) {
  const userAvatarRef = ref(db, "users/" + user_id + "/avatar_url")
  set(userAvatarRef, (avatar_url))

}

export function getUserKeyByUsername(user_name, setState) {
  const allUsersRef = ref(db, "users/");
  get(allUsersRef).then(snapshot => {
    const users = snapshot.val();
    //console.log(users);
    let thisUserId;
    for (let user in users) {
     if (users[user].user_name === user_name) {
      thisUserId = user
      }
    }
    setState(thisUserId)
  })
}

getUserKeyByUsername('happyAmy', console.log)