const words = [
    { word: "BROCOLIS"},
    { word: "CERISIER"},
    { word: "FEUILLES"},
    { word: "FLAMBEAU"},
    { word: "GRIMOIRE"},
    { word: "PANORAMA"},
    { word: "RAMASSER"},
    { word: "TALONNER"},
    { word: "TONNELLE"},
    { word: "VIOLENTE"}
];

let currentWord;
let currentClue;
let currentAttempt = 0;
const maxAttempts = 7;
const gridContainer = document.querySelector(".grid-container");
const wordInput = document.getElementById("word-input");
const submitButton = document.getElementById("submit-button");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const newGameButton = document.getElementById("new-game-button");

function initGame() {
    currentAttempt = 0;
    currentWord = words[Math.floor(Math.random() * words.length)].word;
    currentClue = words.find(item => item.word === currentWord).clue;

    gridContainer.innerHTML = '';
    const rows = [];
    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        const cells = [];
        for (let j = 0; j < currentWord.length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            row.appendChild(cell);
            cells.push(cell);
        }
        rows.push(cells);
        gridContainer.appendChild(row);
    }

    placeInitialCorrectLetters(rows[0]);
}

function placeInitialCorrectLetters(rowCells) {
    const correctIndices = new Set();
    while (correctIndices.size < 2) {
        const randomIndex = Math.floor(Math.random() * currentWord.length);
        correctIndices.add(randomIndex);
    }

    correctIndices.forEach(index => {
        rowCells[index].innerText = currentWord[index];
        rowCells[index].classList.add('correct');
    });
}

function animateLetters(guessedWord, rowCells) {
    guessedWord.split('').forEach((letter, index) => {
        setTimeout(() => {
            rowCells[index].innerText = letter;
            rowCells[index].classList.add('animated');

            if (letter === currentWord[index]) {
                rowCells[index].classList.add('correct');
            } else if (currentWord.includes(letter)) {
                rowCells[index].classList.add('present');
            } else {
                rowCells[index].classList.add('incorrect');
            }
        }, index * 300);
    });
}

function checkWord() {
    const guessedWord = wordInput.value.toUpperCase();

    if (guessedWord.length !== currentWord.length) {
        alert(`Veuillez entrer un mot de ${currentWord.length} lettres.`);
        return;
    }

    const rowCells = gridContainer.children[currentAttempt].children;
    animateLetters(guessedWord, rowCells);

    currentAttempt++;
    wordInput.value = '';

    if (guessedWord === currentWord) {
        showPopup(`Félicitations ! Vous avez trouvé le mot : ${currentWord}`);
    } else if (currentAttempt === maxAttempts) {
        showPopup(`Désolé, vous avez épuisé vos tentatives. Le mot était : ${currentWord}`);
    }
}

function showPopup(message) {
    popupMessage.innerText = message;
    popup.style.display = 'flex';
}

newGameButton.addEventListener("click", function () {
    popup.style.display = 'none';
    initGame();
});

wordInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWord();
    }
});

submitButton.addEventListener("click", checkWord);

initGame();
