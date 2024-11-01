// Initialize the game board and set the starting player
const gameBoard = Array(9).fill(null);
let playerChoice = 'X';
let opponentChoice = 'O';
let gameActive = true;  // Track whether the game is ongoing

// Select elements from the DOM
const buttons = document.querySelectorAll('.mark-button');
const cells = document.querySelectorAll('.cell');
const defaultButton = document.querySelector('.mark-button');
defaultButton.classList.add('selected');

// Set the default selected mark button and handle button clicks to change player choice
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        playerChoice = button.textContent;
        opponentChoice = playerChoice === 'X' ? 'O' : 'X';
        resetGame(); // Reset game when player choice is changed
    });
});

// Handle cell clicks for player's move
cells.forEach(cell => {
    cell.addEventListener('click', () => handlePlayerMove(cell));
});

// Function to handle player's move
function handlePlayerMove(cell) {
    if (!gameActive) return; // Ignore clicks if the game is over

    const cellIndex = cell.dataset.value - 1;

    // Check if cell is empty
    if (gameBoard[cellIndex] === null) {
        // Update the game board and cell with the player's symbol
        gameBoard[cellIndex] = playerChoice;
        cell.textContent = playerChoice;

        // Check for a win or draw after player's move
        if (checkWinner(gameBoard, playerChoice)) {
            setTimeout(() => {
                alert(`${playerChoice} wins!`);
                resetGame();
            }, 10);
            gameActive = false;
            return;
        } else if (gameBoard.every(cell => cell !== null)) {
            setTimeout(() => {
                alert("It's a draw!");
                resetGame();
            }, 10);
            gameActive = false;
            return;
        }

        // If no win or draw, proceed with the computer's turn
        setTimeout(opponentTurn, 500);
    }
}

// Function to handle the computer's move
function opponentTurn() {
    if (!gameActive) return; // Stop if the game is over

    let opponentMove;
    while (true) {
        opponentMove = Math.floor(Math.random() * 9);
        if (gameBoard[opponentMove] === null) {
            break;
        }
    }

    // Update the game board and cell with the computer's symbol
    gameBoard[opponentMove] = opponentChoice;
    cells[opponentMove].textContent = opponentChoice;

    // Check for a win or draw after computer's move
    if (checkWinner(gameBoard, opponentChoice)) {
        setTimeout(() => {
            alert(`${opponentChoice} wins!`);
            resetGame();
        }, 10);
        gameActive = false;
        return;
    } else if (gameBoard.every(cell => cell !== null)) {
        setTimeout(() => {
            alert("It's a draw!");
            resetGame();
        }, 10);
        gameActive = false;
        return;
    }

    // Re-enable player's turn after computer's move
    gameActive = true;
}

// Function to check for a winner
function checkWinner(gameBoard, player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === player);
    });
}

// Function to reset the game
function resetGame() {
    gameBoard.fill(null);
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;  // Set the game as active again
}
