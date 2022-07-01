import { ref, get, push, set, goOffline, remove } from "firebase/database";
import db from "./db.js";

export function getAllUsers(setState) {
  const allUsersRef = ref(db, "users/");
  get(allUsersRef)
    .then((snapshot) => {
      const users = snapshot.val();

      const usersArray = [];

      for (let user in users) {
        users[user].user_id = user;
        usersArray.push(users[user]);
      }

      setState(usersArray);
    })
    .then(() => {});
}

export function getAllRooms(setState) {
  const allRoomsRef = ref(db, "rooms/");
  get(allRoomsRef)
    .then((snapshot) => {
      const rooms = snapshot.val();
      const roomsArray = [];
      for (let room in rooms) {
        rooms[room].room_id = room;
        const playersArray = [];
        for (let player in rooms[room].players) {
          playersArray.push(rooms[room].players[player]);
        }
        rooms[room].players = playersArray;
        roomsArray.push(rooms[room]);
      }
      setState(roomsArray);
    })
    .then(() => {});
}

export function getUserById(user_id, setState) {
  const oneUserRef = ref(db, "users/" + user_id);
  get(oneUserRef).then((snapshot) => {
    const user = snapshot.val();
    user.user_id = snapshot.key;
    setState(user);
  });
}

// getAllUsers(console.log);
// getUserById("-N5igFAsPoqwrMS0Q-zy", console.log);

export function getUserByUsername(user_name, setState) {
  const usersRef = ref(db, "users/");
  get(usersRef).then((snapshot) => {
    const users = snapshot.val();
    for (let user in users) {
      if (users[user].user_name === user_name) {
        users[user].user_id = user;
        setState(users[user]);
      }
    }
  });
}


export async function getRoomById(room_id) {
  const oneRoomRef = ref(db, "rooms/" + room_id);
  await get(oneRoomRef).then((snapshot) => {
    const room = snapshot.val();
    const playersArray = [];
    for (let player in room.players) {
      playersArray.push(room.players[player]);
    }
    room.players = playersArray;
    room.room_id = snapshot.key;
    return room;
  });
}

export function addUser(user) {
  const allUsersRef = ref(db, "users/");

  push(allUsersRef, user).then(() => {});
}

export function awardPointsToUser(points, user_id) {
  const oneUserRef = ref(db, "users/" + user_id);
  const userPointsRef = ref(db, "users/" + user_id + "/points");
  get(oneUserRef).then((snapshot) => {
    const user = snapshot.val();
    set(userPointsRef, user.points + points).then(() => {});
  });
}

export function updateUserAvatar(avatar_url, user_id) {
  const userAvatarRef = ref(db, "users/" + user_id + "/avatar_url");
  set(userAvatarRef, avatar_url).then(() => {});
}

export function getUserKeyByUsername(user_name, setState) {
  const allUsersRef = ref(db, "users/");
  get(allUsersRef)
    .then((snapshot) => {
      const users = snapshot.val();
      //console.log(users);
      let thisUserId;
      for (let user in users) {
        if (users[user].user_name === user_name) {
          thisUserId = user;
        }
      }
      setState(thisUserId);
    })
    .then(() => {});
}

export function addRoom(host, room_name, mode) {
  const allRoomsRef = ref(db, "rooms/");
  push(allRoomsRef, {
    host,
    room_name,
    players: [],
    full: false,
    mode,
  }).then(() => {});
}

export function addPlayerToRoom(user, room_id) {
  const oneRoomRef = ref(db, "rooms/" + room_id);
  let newPlayer;
  get(oneRoomRef)
    .then((snapshot) => {
      const room = snapshot.val();

      if (room.players) {
        if (Object.keys(room.players).length < 5) {
          const thisPlayerRef = ref(
            db,
            "rooms/" + room_id + `/players/${user.user_id}`
          );
          set(thisPlayerRef, user);

          if (Object.keys(room.players).length === 4) {
            const thisRoomFullRef = ref(db, "rooms/" + room_id + "/full");
            set(thisRoomFullRef, true).then(() => {});
          } else {
          }
        }
      } else {
        const thisPlayerRef = ref(
          db,
          "rooms/" + room_id + `/players/${user.user_id}`
        );
        set(thisPlayerRef, user).then(() => {});
      }
    })
    .then(() => {});
}


function changeHost(room_id, newHost) {
  const hostRef = ref(db, "rooms/" + room_id + "/host")
  set(hostRef, newHost)
}


export function deleteRoom(room_id) {
  const oneRoomRef = ref(db, "rooms/" + room_id);
  remove(oneRoomRef).then(() => {});
}

export function deleteUser(user_id) {
  const oneUserRef = ref(db, "users/" + user_id);
  remove(oneUserRef).then(() => {});
}

export function removePlayerFromRoom(user_id, room_id) {
  const oneRoomRef = ref(db, "rooms/" + room_id);
  get(oneRoomRef)
    .then((snapshot) => {
      const room = snapshot.val();
      for (let player in room.players) {
        if (player === user_id) {
          const playerToRemoveRef = ref(
            db,
            "rooms/" + room_id + `/players/${player}`
          );
          remove(playerToRemoveRef);
          const thisRoomFullRef = ref(db, "rooms/" + room_id + "/full");
          set(thisRoomFullRef, false);
        }
      }
    })
    .then(() => {});
}

export function addFriendtoUser(user_id, friend) {
  const username = friend.user_name;
  const profile_pic = friend.avatar_url;
  const friendId = friend.user_id;
  const newFriend = { username, profile_pic };
  const userFriendRef = ref(
    db,
    "users/" + user_id + `/friends/${friend.user_id}`
  );

  set(userFriendRef, newFriend).then(() => goOffline(db));
}

export function removeFriendFromUser(user_id, friend) {
  const userFriendRef = ref(
    db,
    "users/" + user_id + `/friends/${friend.user_id}`
  );
  remove(userFriendRef).then(() => {});
}

export function updateUserStatus(user_id, status) {
  const userStatusRef = ref(db, "users/" + user_id + "/status");
  set(userStatusRef, status).then(() => goOffline(db));
}

export function updateUserDescription(user_id, description) {
  const userDescriptionRef = ref(db, "users/" + user_id + "/description");
  set(userDescriptionRef, description).then(() => goOffline(db));
}

export function updateUserImage(user_id, newImg) {
  const userImageRef = ref(db, "users/" + user_id + "/avatar_url");
  set(userImageRef, newImg).then(() => goOffline(db));
}

export function getUserbyUsername(user_name, setState) {
  const usersRef = ref(db, "users/");
  get(usersRef).then((snapshot) => {
    const users = snapshot.val();
    for (let user in users) {
      if (users[user].user_name === user_name) {
        users[user].user_id = user;
        setState(users[user]);
      }
    }
  });
}
