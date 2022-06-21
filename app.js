const guess = document.querySelector("#numberGuessed");
const submit = document.querySelector("#submit");
const notify = document.querySelector("#notify");
const isRightNumber = document.querySelector("#isRightNumber");
const resetBtn = document.querySelector("#reset");
const hint = document.querySelector("#hint");
const range = document.querySelector("#range");
const numGuesses = document.querySelector("#numGuesses");

let guesses = 5;
let guessNumber;
let randomNum;
let upperClue;
let lowerClue;

// generate random number to be guessed
function rand(maxLimit = 1000) {
	randomNum = Math.floor(Math.random() * maxLimit) + 1;

	if (randomNum < 50) {
		lowerClue = 1;
		upperClue = randomNum + 50;
	} else {
		lowerClue = randomNum - 50;
		upperClue = randomNum + 50;
	}
}

rand();
console.log("random number before reset: ", randomNum);

// using keyup event to determine what value is entered
guess.addEventListener("keyup", (e) => {
	// checking if the input is actually a number to begin with
	let num = parseInt(e.target.value);
	if (isNaN(num)) {
		notify.textContent = "Please enter a number";
	} else {
		notify.textContent = "";
		guessNumber = num;
	}
});

// display the number of guesses left
numGuesses.textContent = "Number of guesses left: " + guesses;

// submit the guess entered
submit.addEventListener("click", (e) => {
	e.preventDefault();

	checkGuessesLeft();

	ifRight();
});

// check if guesses left is zero and disable the buttons
function checkGuessesLeft() {
	guesses--;
	if (guesses === 0) {
		submit.disabled = true;
		guess.disabled = true;
		notify.textContent = "You are out of guesses, press reset to try again";
	}
	numGuesses.textContent = "Number of guesses left: " + guesses;
	console.log(guesses);
}

// check if the guess entered is right or wrong and display the appropriate notification
function ifRight() {
	if (guessNumber != randomNum) {
		isRightNumber.style.color = "red";
		isRightNumber.textContent = "I dunno man";
		setTimeout(() => {
			isRightNumber.style.color = "transparent";
		}, 2000);
	} else {
		isRightNumber.style.color = "green";
		isRightNumber.textContent = "Yup " + guessNumber + " is the right number!";
		guess.disabled = true;
		notify.textContent = "";
		// reset the game after the correct answer
		// setTimeout(() => {
		// 	reset();
		// }, 2000);
	}
}

// to provide a hint with a range of what the number is
hint.addEventListener("click", () => {
	range.textContent = "Number is between " + lowerClue + " - " + upperClue;
	range.classList.toggle("range");
});

// event listener on the reset button
resetBtn.addEventListener("click", reset);

// reseting the game by changing it to its original state
function reset() {
	rand();
	guess.disabled = false;
	submit.disabled = false;
	guesses = 5;
	numGuesses.textContent = "Number of guesses left: " + guesses;
	guess.value = "";
	isRightNumber.textContent = "";
	notify.textContent = "";
	range.classList.add("range");
	console.log("random number after reset: ", randomNum);
	console.log("guesses left is: ", guesses);
}
