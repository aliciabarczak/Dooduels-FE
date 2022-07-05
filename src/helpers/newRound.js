// function newRound(timeRemaining, guesser) {
//   if (timeRemaining) {
//     awardPointsToPlayer(timeRemaining, guesser);
//     awardPointsToPlayer(timeRemaining, loggedUser); //awards points to guesser and host if there is more than 0 seconds left
//     setAlertMessage(`${timeRemaining} points to {guesser}!`); //sets alert to display number of points and who guessed it
//   } else {
//     setAlertMessage(wordArray[wordArrayIndex]); // sets alert to display the word, no points awarded
//   }

//   setAlertShowing(true); //sets showing to true ( for conditional rendering of the alert message)
//   setTimeout(setAlertShowing(false), 2000); //sets showing to false after 2 seconds
//   resetTimer(); //resets timer

//   if (wordArrayIndex < wordArray.length - 1) {
//     setWordArrayIndex(wordArrayIndex++); // if there are more words, increments index number, next word is set in state.
//   } else {
//     setAlertMessage(`gameOver`); // if no more words, display message and navigate to homepage after 4 seconds
//     setAlertShowing(true);
//     setTimeout(navigate("/"), 4000);
//   }
// }
