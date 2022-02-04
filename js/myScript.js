var userLetter;
var userLife = 9;
var wordToBeGuessed = "hangman";
var wordToCompareWith = "hangman";
var guessedSoFar = "";
var drawingDiv;
var img;
var gameOver = false;

// intialize string with ----
equalizeLength();
function equalizeLength() {
    for (let i = 0; i < wordToCompareWith.length; ++i) {
        guessedSoFar += "-";
    }
}

// save the inserted letter to global variable;
function saveLetter() {
    if (!gameOver) {
        userLetter = document.getElementById("userLetter").value;
        checkLife();  
    }
    showPartialGuess();
}

// check user's life
function checkLife() {
    if (userLife >= 0) {
        validateInsertedLetter();
        if (!gameOver) {
            document.getElementById("userLetter").value = null;
        }
    } else {
        showImagesBasedOnLifeValue();
    }
}

// check if the inserted letter exists in the final string
function validateInsertedLetter() {
    if (wordToCompareWith.includes(userLetter)){
        writeLetterToString();
    } else {
        --userLife;
        showImagesBasedOnLifeValue();
    }
}

// Based on life value call the show image function or the show result function
function showImagesBasedOnLifeValue() { /// here I need to learn more about DOM child, nodes to make it look and load nicer. 
    if (userLife == 8) {
        showImage();
    } else if ((userLife <= 7 && userLife >= 1) || userLife == 0) {
        cleanHangmanDrawingDiv();
        showImage();
        if (userLife == 0) {
            showResult("Sorry, you lost. Refresh the page to start again!");
        }
    }
}

//Fetches image based on life value
function showImage() {
    drawingDiv = document.getElementById('hangmanDrawingDiv');
    img = document.createElement('img');
    img.src = `assets/images/${userLife}.png`;
    img.setAttribute("height", "180px");
    img.setAttribute("width", "150px");
    drawingDiv.appendChild(img);
}

// cleaning the div that holds the hangman images
function cleanHangmanDrawingDiv() {
    while (drawingDiv.firstChild) {
        drawingDiv.firstChild.remove()
    }
}

// Write the quessed letter to the ----- string. 
function writeLetterToString() {    
    for (let i = 0; i < wordToCompareWith.length; ++i) {
        if (wordToCompareWith[i] == userLetter) {
            guessedSoFar = guessedSoFar.replaceAt(i, userLetter);
            wordToCompareWith = wordToCompareWith.replaceAt(i, "-");
        }
    }
    checkWinner();
}

// Helper to write the letter in the guessed so far string
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

// check if the user guessed the entire word
function checkWinner() {
    if (guessedSoFar == wordToBeGuessed){
        showResult("You Won! Refresh the page to play again!");
    }
}

// show the end result to the user
function showResult(resultStr) {
    var result = document.getElementById("gameResult");
    result.innerText = resultStr;
    gameOver = true;
    cleanup();
}

// Show the partial guessedSoFar word if game is not over
function showPartialGuess() {
    var result = document.getElementById("partialGuess");
    if (!gameOver) {
        result.innerText = guessedSoFar;
    }
}

// cleanup input field, partial guess and submit button
function cleanup() {
    var submitButton = document.getElementById("submitLetter");
    var userLetter = document.getElementById('userLetter');
    var partialGuess = document.getElementById("partialGuess");
    partialGuess.remove();
    submitButton.remove();
    userLetter.remove();
}