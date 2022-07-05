import { ref, get, set } from "firebase/database";
import db from "./db.js";

let words = [
  "dog",
  "cat",
  "hippo",
  "snake",
  "zebra",
  "spider",
  "axolotl",
  "dragon",
  "monkey",
  "ostrich",
  "penguin",
  "elephant",
  "reindeer",
  "swordfish",
  "armadillo",
  "gong",
  "harp",
  "piano",
  "drums",
  "guitar",
  "violin",
  "trumpet",
  "ukulele",
  "clarinet",
  "bagpipes",
  "saxophone",
  "harmonica",
  "running",
  "jumping",
  "dancing",
  "flying",
  "sitting",
  "walking",
  "waving",
  "washing",
  "writing",
  "driving",
  "reading",
  "talking",
  "sky",
  "tree",
  "lake",
  "rock",
  "river",
  "cloud",
  "flower",
  "forest",
  "bonfire",
  "mountain",
  "cliffside",
  "waterfall",
  "car",
  "bus",
  "bicycle",
  "caravan",
  "hospital",
  "motorway",
  "building",
  "ambulance",
  "firetruck",
  "motorcycle",
];

export function getWordSetWord(room_id) {
  const allWordsRef = ref(db, "rooms/" + room_id + "/words");
  const currWordRef = ref(db, "rooms/" + room_id + "/CurrentWord");
  return get(allWordsRef).then((snapshot) => {
    const words = snapshot.val();

    const wordsArray = [];

    console.log(words, "<<from snapsjot");

    console.log(room_id, "<<<roomid");

    for (let word in words) {
      wordsArray.push(words[word]);
    }

    console.log(wordsArray);
    let randWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    let filteredWords = wordsArray.filter((words) => words !== randWord);

    console.log(randWord, room_id);

    set(currWordRef, randWord);
    set(allWordsRef, filteredWords);

    return randWord;
  });
}

export function addWords(room_id, word) {
  const wordsRef = ref(db, "rooms/" + room_id + "/words");

  set(wordsRef, word);
}

export function removeWord(room_id, word) {
  const allWordsRef = ref(db, "rooms/" + room_id + "/words");
  get(allWordsRef).then((snapshot) => {
    const words = snapshot.val();

    const wordsArray = [];
    for (let word in words) {
      wordsArray.push(words[word]);
    }
    let filteredWords = wordsArray.filter((words) => words !== word);

    set(allWordsRef, filteredWords);
  });
}

export function hideWord(word, setState) {
  let wordArray = word.split("");

  let hiddenWordArray = [];

  hiddenWordArray.push(wordArray[0]);

  for (let i = 1; i < wordArray.length; i++) {
    hiddenWordArray.push("_");
  }

  let finalHiddenWord = hiddenWordArray.join("");

  setState(finalHiddenWord);
}

export function getCurrentWord(room_id) {
  const currWordRef = ref(db, "rooms/" + room_id + "/CurrentWord");

  return get(currWordRef).then((snapshot) => {
    const currentWord = snapshot.val();
    return currentWord;
  });
}
