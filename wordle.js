



const tiles = document.querySelectorAll(".tile");
const letters = document.querySelectorAll(".letter");
var inputLetters = [];
var wordCombination = [];
var inputLetterIndex = 0;
var rowIndex = 0;
//GENERATING RANDOM WORD
var WORDLE_WORD;
var WORDLE_WORDS = ["GRANT","DICKS","THROW","HEAVY"];
var random;
var shuffled_array = [];
for(var i = 0; i<WORDLE_WORDS.length;i++){
    random = Math.floor(Math.random() * WORDLE_WORDS.length);
    shuffled_array.push(WORDLE_WORDS[random]);
    
    
}
const WORD = shuffled_array[random]
const ROW = [[],[],[],[],[],[]];

//GENERATING RANDOM WORD
var tileIndex = 0; // goes through all indices of the entire grid iterates for each input

letters.forEach((Letter)=>{
    Letter.addEventListener("click", (key)=>{
        const letter = key.target.innerHTML;
        if(letter!=="ENTER"&&letter!=="DEL"&&inputLetters.length<5){
            inputLetters.push(letter);
            addLetter(inputLetterIndex,letter);
            inputLetterIndex++;
            tileIndex++;
        }
        if(letter=="DEL"&&inputLetters.length>0){
            inputLetterIndex--;
            tileIndex--;
            removeLetter(inputLetterIndex);
            inputLetters.pop();
        }
        console.log(inputLetters);
        if(letter=="ENTER"&&inputLetters.length==5){
            addWord();
        }
    })
})

function addLetter(index,letter){
        ROW[rowIndex].push(tiles[tileIndex]); //reason for double letters, it pushes letters to the same tile on first row  
        ROW[rowIndex][index].append(letter);
        console.log(ROW); 
}
function removeLetter(index){
    console.log(ROW[rowIndex][index].innerHTML);
    console.log(index + " : index");
    ROW[rowIndex][index].innerHTML=null; //fix for row
    ROW[rowIndex].pop();
}

function addWord(){
    let correctWords = [];
    let incorrectWords = [];
    checkWordCorrectness();
    removeKeyboardLetter();
    checkWin();
    inputLetterIndex = 0;
    inputLetters = [];
    //operation
    console.log(rowIndex + " : rowIndex");
    rowIndex++;
};

var incorrectWords = [];
var correctWords = [];
function checkWordCorrectness(){
    // WORD
    console.log(inputLetters + " : " +WORD);
    
    for(var i = 0; i<inputLetters.length; i++){
        let targetLetter = inputLetters[i];
        let targetRow = ROW[rowIndex-1];
        if(WORD.includes(targetLetter)){
            console.log("IT DOES");
            console.log(WORD + " :" +inputLetters[i] + " "+i);
            console.log("COMPARISON: word: " +WORD + " " + " inputLetters[i] : " + inputLetters[i] + " I:  " +i + "WORD[i] " + WORD[i]);
            if(targetLetter!==WORD[i]){
                ROW[rowIndex][i].id = "incorrectOrder"
            }
            else{
                ROW[rowIndex][i].id = "correct";
                correctWords.push(targetLetter);
            }
            console.log(inputLetters);
            
        }
        else{
            console.log(targetLetter);
            for(let j = 0; j<ROW[rowIndex].length;j++){
                if(targetLetter==ROW[rowIndex][j].innerHTML){
                    ROW[rowIndex][j].id = "incorrect";
                    incorrectWords.push(targetLetter);
                }
            }
            console.log(incorrectWords);
        }
    }
}

function removeKeyboardLetter(){
    for(var i = 0; i<incorrectWords.length;i++){

        letters.forEach((letter)=>{
            if(incorrectWords[i]==letter.innerHTML){
                letter.id = "incorrectLetter"
                letter.innerHTML = null;
            }
        })
    }
    for(var i = 0; i<correctWords.length;i++){

        letters.forEach((letter)=>{
            if(correctWords[i]==letter.innerHTML){
                letter.id = "correctLetter"
                
            }
        })
    }
}

function checkWin(){
    if(correctWords.join("")==WORD){
        resetGame("win");
    }
    else{
        if(rowIndex==6){
            resetGame("lost")
        }
    }
}

function resetGame(gameState){
    if(gameState == "win"){
        alert("you're a god. ctrl + r to go again.")
    }
    else{
        alert("you suck bro. ctrl + r to go again.")
        
    }
}