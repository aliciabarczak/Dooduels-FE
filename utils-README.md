# Dooduel Database Util Functions

​
Using Firebase Realtime Database means the users and rooms are stored as key-value pairs in a JSON tree. Paths to each 'value' are created and terminated when needed. This is NOT a RESTful api, it is a live, noSQL database.
​

## These functions replace the need for 'endpoints':

​

### getAllUsers

​
Takes one argument - a setState function (eg. setUsers)
​
Gets all the users currently 'signed up' to dooduels and sets 'State' with an array of objects, where each object constains all user details.
​
Example response:

```
[
  {
    avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141',
    description: 'A cool lass',
    friends: [ [Object], [Object], [Object] ],
    password: 'password123',
    points: 450,
    status: 'offline',
    user_name: 'jessjelly',
    user_id: '-N5_Z_EYyZBrivsr1pdL'
  },
  {...},
  {...}
]
```

​

### getAllRooms

​
Takes one argument - a setState function (eg. setRooms)
​
Gets all the rooms currently in existence and sets 'State' with an array of objects, where each object constains all room details.
​
Example response:

```
[
  {
    full: false,
    host: 'tomtickle',
    messages: {
      '-N5iVlC-p5xgUItrAMGV': "Hi mum, i'm on TV",
      '-N5iVo0GHu537d7YNEDg': 'hello world',
      '-N5iVsWCXjTPWzay13ha': 'howdy',
      '-N5iVzxwc9rGrq0LZHNf': 'bananas in pjamas'
    },
    mode: "'easy'",
    players: [ 'jessjelly', 'sparkles', 'sparkles' ],
    room_name: 'Room 1',
    room_id: '1'
  },
  {...},
  {...}
]
```

No return value.
​

### getUserById

​
Takes two arguments

- 1st: a user's user_id (string)
- 2nd: a setState function (eg. setThisUser)
  ​
  Gets an object containing all the user's details and sets 'State' with the user object.
  ​

```
{
    avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141',
    description: 'A cool lass',
    friends: [ [Object], [Object], [Object] ],
    password: 'password123',
    points: 450,
    status: 'offline',
    user_name: 'jessjelly',
    user_id: '-N5_Z_EYyZBrivsr1pdL'
}
​
```

No return value.
​

### getRoomById

​
Takes two arguments

- 1st: a room's room_id (string)
- 2nd: a setState function (eg. setThisRoom)
  ​
  Gets an object containing all the room's details and sets 'State' with the room object.
  ​
  Example response:
  ​

```
{
    full: false,
    host: 'tomtickle',
    messages: {
      '-N5iVlC-p5xgUItrAMGV': "Hi mum, i'm on TV",
      '-N5iVo0GHu537d7YNEDg': 'hello world',
      '-N5iVsWCXjTPWzay13ha': 'howdy',
      '-N5iVzxwc9rGrq0LZHNf': 'bananas in pjamas'
    },
    mode: "'easy'",
    players: [ 'jessjelly', 'sparkles', 'sparkles' ],
    room_name: 'Room 1',
    room_id: '1'
  }
```

No return value.
​

### addUser

​
Takes one argument - a user (Object), which only needs basic details for setup (but can take some optional extra details if wanted).
​
Example new user Object:
​

```
{
    user_name: 'jessjelly',
    password: 'password123',
    points: 0
}
​
OR
​
{
    avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141',
    description: 'A cool lass',
    friends: [ [Object], [Object], [Object] ],
    password: 'password123',
    points: 0,
    status: 'offline',
    user_name: 'jessjelly',
}
​
```

**NB. a new user must have a points value (eg points: 0) on creation.**
​
No return value.
​

### awardPointsToUser

​
Takes two arguments

- 1st: points to award (number)
- 2nd: a user's user_id (string)
  ​
  Increments the points of that user.
  Accepts positive numbers (to award points) or negativenumbers (to remove points).
  ​
  **NB. a new user must have a points value (eg points: 0) on creation.**
  ​
  No return value.
  ​

### updateUserAvatar

​
Takes two arguments

- 1st: avatar_url (string)
- 2nd: a user's user_id (string)
  ​
  Update's the user's avatar_url.
  ​
  A new user does not require an avatar_url property on creation. updateUserAvatar will add the avatar_url property, or overwrite the avatar_url property if it already exists.
  ​
  No return value.
  ​

### getUserKeyByUsername

​
Takes two arguments

- 1st: a user's user_name (string)
- 2nd: a setState function (eg setUserId)
  ​
  Gets the user's user_id (String) if user exists and sets 'State' with the user's user_id string.
  ​
  Example response:
  ​

```
"-N5dwLjNG1_AGdWrDGXW"
```

No return value.
​

### addRoom

​
Takes three arguments

- 1st: the host's user_name (string)
- 2nd: the chosen room_name (string)
- 3rd: the chosen mode (string)
  ​
  Creates a new room with a unique room_id
  ​
  Example of a new room in the database
  ​

```
{
    full: false,
    host: 'tomtickle',
    mode: "easy",
    room_name: 'Room 1',
}
```

​
Rooms are initially 'empty'...

- no players have joined yet, so there is no 'players' key at this time.
- there have been no chat messages, so there is no 'messages' key at this time.
  ​
  No return value.
  ​

### addPlayerToRoom

​
Takes three arguments

- 1st: the joining player's user_name (String)
- 2nd: the joining player's user_id (String)
- 3rd: the room's room_id (String)
  ​
  Creates a new 'players' key if no players are in the room yet.
  ​
  Adds the player's user_name to the list of players.
  ​
  Updates the 'full' property to true when 5 players have joined.
  ​
  Updates the 'full' property to false as soon as the number of players is less than 5.
  ​

```
players: [ 'jessjelly', 'javier'],
full: false
```

​

```
players: [ 'jessjelly', 'javier', 'phil', 'lewis', 'alicia'],
full: true
```

​
No Return value
​

### deleteRoom

​
Takes one argument - a room's room_id (String)
​
Deletes the room and all its child data from the database.
​
No return value
​

### deleteRoom

​
Takes one argument - a user's user_id (String)
​
Deletes the user and all its child data from the database.
​
No return value
​

### removePlayerFromRoom

​
Takes two arguments

- 1st: the leaving player's user_id (String)
- 2nd: the room's room_id
  ​
  Deletes the user's user_name from the 'players' property of the room.
  ​
  No return value
  ​
  ​

### addFriendToUser

​
Takes two arguments

- 1st: the current user's user_id (String)
- 2nd: the friend to add (Object)
  ​
  Creates a new 'friends' key on the current user if they have no friends added yet.
  ​
  Adds a 'friend' Object with 2 properties: user_name and profile_pic to the list of friends.
  ​
  There is no limit to how many friends a user can have.
  ​

```
friends: [ [Object], [Object], [Object] ],
```

No return value
​

### removeFriendFromUser

​
Takes two arguments

- 1st: the current user's user_id (String)
- 2nd: the friend to remove (Object)
  ​
  Deletes the 'friend' Object from the 'friends' property of the user.
  ​
  No return value
  ​

### upDateUserStatus

​
Takes two arguments

- 1st: the current user's user_id (String)
- 2nd: the status to be set (String)
  ​
  Creates a new 'status' key on the current user if they have no status yet.
  ​
  Over-writes the user's 'status' value to the given status.
  ​

```
status: "Online"
```

```
status: "Offline"
```

```
status: "Other"
```

​
No return Value
​

### updateUserDescription

​
Takes two arguments

- 1st: the current user's user_id (String)
- 2nd: the description to be set (String)
  ​
  Creates a new 'description' key on the current user if they have no description yet.
  ​
  Over-writes the user's 'description' value to the given description.
  ​

```
description: "The best doodler in the world!"
```

​
No return Value
