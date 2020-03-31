const textDisplay = document.querySelector('.message');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let playable = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

textDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = `<div class=${currentPlayer}>${currentPlayer}</div>`;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    textDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation() {
    let roundWon = false;
    let winningConditionsLength = winningConditions.length - 1;
    for (let i = 0; i <= winningConditionsLength; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];


        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        textDisplay.innerHTML = winningMessage();
        playable = false;
        return;
    }
    
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        textDisplay.innerHTML = drawMessage();
        playable = false;
        return;
    }
   
    handlePlayerChange();

}
function handleCellClick(clickedCellEvent ) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('cell-index')
    );

    if (gameState[clickedCellIndex] !== "" || !playable) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame() {
    playable = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    textDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);