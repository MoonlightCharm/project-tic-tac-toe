const gameBoard = Array(9).fill(null);

function playerSelection() {
    while (true) {
        const playerChoice = prompt('Are you an \'X\' or an \'O\'? Type either X or O.').toUpperCase();

        if (playerChoice === 'X' || playerChoice === 'O') {
            return playerChoice;
        } else {
            alert('Please enter a valid value: either an X or an O.')
        }
    }
}

function playerTurn(playerChoice, gameBoard) {
    while (true) {
        let playerMove = Number(prompt('Please enter a number from 1 to 9 to choose where on the game board you want to place your piece.'));

        if (isNaN(playerMove) || playerMove < 1 || playerMove > 9) {
            alert('Please enter a valid value: a number from 1 to 9.');
        } else {
            const position = playerMove - 1;

            if (gameBoard[position] === null) {
                gameBoard[position] = playerChoice;
                return gameBoard;
            } else {
                alert('That spot is already taken. Choose another.');
            }
        }
    }
}

function opponentTurn(playerChoice, gameBoard) {
    let opponentMove;
    while (true) {
        opponentMove = Math.floor(Math.random() * 9);

        if (gameBoard[opponentMove] === null) {
            break;
        }

    }
    let opponentChoice = (playerChoice === 'X') ? 'O' : 'X';
    gameBoard[opponentMove] = opponentChoice;
    return gameBoard;
}

function checkWinner(gameBoard, playerChoice) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        if (
            gameBoard[combination[0]] === playerChoice &&
            gameBoard[combination[1]] === playerChoice &&
            gameBoard[combination[2]] === playerChoice
        ) {
            return true;
        }
    }
    return false;
}

function startGame() {
    const playerChoice = playerSelection();
    let gameActive = true;

    while (gameActive) {
        playerTurn(playerChoice, gameBoard);
        if (checkWinner(gameBoard, playerChoice)) {
            alert('You win!');
            gameActive = false;
            break;
        }

        opponentTurn(playerChoice, gameBoard);
        if (checkWinner(gameBoard, (playerChoice === 'X') ? 'O' : 'X')) {
            alert('Opponent wins!');
            gameActive = false;
        }
    }
}
