import {
  onValue,
  ref,
  get,
  push,
  set,
  goOffline,
  remove,
} from "firebase/database";
import db from "./index.js";

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
    .then(() => {
      goOffline(db);
    });
}

export function getAllRooms(setState) {
  const allRoomsRef = ref(db, "rooms/");
  get(allRoomsRef)
    .then((snapshot) => {
      const rooms = snapshot.val();

      const roomsArray = [];

      for (let room in rooms) {
        rooms[room].room_id = room;
        roomsArray.push(rooms[room]);
      }

      setState(roomsArray);
    })
    .then(() => {
      goOffline(db);
    });
}

export function getUserById(user_id, setState) {
  const oneUserRef = ref(db, "users/" + user_id);
  get(oneUserRef).then((snapshot) => {
    const user = snapshot.val();
    user.user_id = snapshot.key;
    setState(user);
    goOffline(db);
  });
}

export function getRoomById(room_id, setState) {
  const oneRoomRef = ref(db, "rooms/" + room_id);
  get(oneRoomRef)
    .then((snapshot) => {
      const room = snapshot.val();
      setState(room);
    })
    .then(() => {
      goOffline(db);
    });
}

export function addUser(user) {
  const allUsersRef = ref(db, "users/");

  push(allUsersRef, user).then(() => {
    goOffline(db);
  });
}

export function awardPointsToUser(points, user_id) {
  const oneUserRef = ref(db, "users/" + user_id);
  const userPointsRef = ref(db, "users/" + user_id + "/points");
  get(oneUserRef).then((snapshot) => {
    const user = snapshot.val();
    set(userPointsRef, user.points + points).then(() => {
      goOffline(db);
    });
  });
}

export function updateUserAvatar(avatar_url, user_id) {
  const userAvatarRef = ref(db, "users/" + user_id + "/avatar_url");
  set(userAvatarRef, avatar_url).then(() => {
    goOffline(db);
  });
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
    .then(() => {
      goOffline(db);
    });
}

export function addRoom(host, room_name, mode) {
  const allRoomsRef = ref(db, "rooms/");
  push(allRoomsRef, {
    host,
    room_name,
    players: [],
    full: false,
    mode,
  }).then(() => {
    goOffline(db);
  });
}

export function addPlayerToRoom(user_name, user_id, room_id) {
  const oneRoomRef = ref(db, "rooms/" + room_id);
  let newPlayer;
  get(oneRoomRef)
    .then((snapshot) => {
      const room = snapshot.val();

      if (room.players) {
        if (Object.keys(room.players).length < 5) {
          const thisPlayerRef = ref(
            db,
            "rooms/" + room_id + `/players/${user_id}`
          );
          set(thisPlayerRef, user_name);

          if (Object.keys(room.players).length === 4) {
            const thisRoomFullRef = ref(db, "rooms/" + room_id + "/full");
            set(thisRoomFullRef, true).then(() => {
              goOffline(db);
            });
          } else {
            goOffline(db);
          }
        }
      } else {
        const thisPlayerRef = ref(db, "rooms/" + room_id + `/players/player_1`);
        set(thisPlayerRef, user_name).then(() => {
          goOffline(db);
        });
      }
    })
    .then(() => {
      goOffline(db);
    });
}

export function deleteRoom(room_id) {
  const oneRoomRef = ref(db, "rooms/" + room_id);
  remove(oneRoomRef).then(() => {
    goOffline(db);
  });
}

export function deleteUser(user_id) {
  const oneUserRef = ref(db, "users/" + user_id);
  remove(oneUserRef).then(() => {
    goOffline(db);
  });
}

export function removePlayerFromRoom(user_id, room_id) {
  const oneRoomRef = ref(db, "rooms/" + room_id);
  get(oneRoomRef)
    .then((snapshot) => {
      const room = snapshot.val();
      for (let player in room.players) {
        console.log(room.players[player]);
        if (player === user_id) {
          console.log(player);
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
    .then(() => {
      goOffline(db);
    });
}

// removePlayerFromRoom("w23csaedeplz", 1);

// addPlayerToRoom("sparkles", "w23csaedeplz", 1);

// deleteUser("-N5drx7s6aMoy6gn9uQb");

// removeRoom("-N5dwLjNG1_AGdWrDGXW");

// addUser({
//   avatar_url: "http",
//   password: "password123",
//   points: 400,
//   user_name: "brownBob",
// });

// getAllUsers(console.log);

// getAllRooms(console.log);

// getUserById("-N5_Z_EYyZBrivsr1pdL", console.log);

getRoomById("1", console.log);

// awardPointsToUser(-100, 1);

// updateUserAvatar("hello", "-N5drx7s6aMoy6gn9uQb");

// getUserKeyByUsername("happyAmy", console.log);

// addRoom("fishFreddy", "Room 4", "medium");

// addPlayerToRoom("faz", 1);
