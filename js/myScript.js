var userLetter;
var userLife = 8;
var wodToBeGuessed = "hangman";
var wordToCompareWith = "hangman";
var guessedSoFar = "";

equalizeLength();

function equalizeLength() {
    for (let i = 0; i < wordToCompareWith.length; ++i) {
        guessedSoFar += "-";
    }
}

function saveLetter() {
    userLetter = document.getElementById("userLetter").value;
    document.getElementById("userLetter").value = null;
    console.log(userLetter);
    checkLife();
}

function checkLife() {
    console.log("Check Life = " + userLife);
    if (userLife >= 0) {
        validateInsertedLetter();
    } else {
        console.log("sorry, you lost");
    }
}


function validateInsertedLetter() {
    console.log("validate letter");
    if (wordToCompareWith.includes(userLetter)){
        writeLetterToString();
    } else {
        --userLife;
    }
    console.log("Validate Life = " + userLife);
}

function writeLetterToString() {    
    console.log(`write ${userLetter} to string`);
    for (let i = 0; i < wordToCompareWith.length; ++i) {
        if (wordToCompareWith[i] == userLetter) {
            guessedSoFar = guessedSoFar.replaceAt(i, userLetter);
            wordToCompareWith = wordToCompareWith.replaceAt(i, "-");
        }
    }
    console.log("Guessed so far " + guessedSoFar);
    console.log("word to be guessed: " + wordToCompareWith);
}
   
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
    return this.substring(0, index) + replacement + this.substring(index + 1);
}