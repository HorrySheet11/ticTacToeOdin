function gameControl() {
    let gameBoard  = [["", "", ""], ["", "", ""], ["", "", ""]];
    let currentPlayer = "X";
    let gameActive = true;
    let currentPlayerDisplay = document.querySelector('.currentPlayer');

    let players = {
        player1 : "X",
        player2 : "O"
    };

    const winningConditions = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    const checkWin = ()=> {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a[0]][a[1]] !== "" &&
                gameBoard[a[0]][a[1]] === gameBoard[b[0]][b[1]] &&
                gameBoard[a[0]][a[1]] === gameBoard[c[0]][c[1]]) {
                    const winner = gameBoard[a[0]][a[1]];
                return true;
            }
        }
        return false;
    }

    const checkDraw = ()=>  {
        for (let row of gameBoard) {
            for (let cell of row) {
                if (cell === "") {
                    return false;
                }
            }
        }
        return true;
    }

    const makeMove = (row, col,card) => {
        if (gameActive && gameBoard[row][col] === "") {
            gameBoard[row][col] = currentPlayer;
            card.innerText = currentPlayer;
            card.disabled = true; // Disable the button after move
            if (checkWin()) {
                gameActive = false;
                console.log(`Player ${currentPlayer} wins!`);
                currentPlayerDisplay.innerText = `Player ${currentPlayer} wins!`;
            } else if (checkDraw()) {
                gameActive = false;
            console.log("It's a draw!");
                currentPlayerDisplay.innerText = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
                currentPlayerDisplay.innerText = `Current Player: ${currentPlayer}`;
            }
        }
    }

    const resetGame = () => {
        gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
        currentPlayer = players.player1;
        gameActive = true;
        document.querySelectorAll('.cell').forEach(cell => cell.innerText = ""); // Reset UI
    }

    return {
        makeMove, resetGame,gameBoard
    }
}

const ticTacToe = gameControl();

// Example usage:
// ticTacToe.makeMove(0, 0);
// ticTacToe.makeMove(1, 1);
// ticTacToe.makeMove(0, 1);
// ticTacToe.makeMove(1, 0);
// ticTacToe.makeMove(0, 2); // Player X wins
// console.log(ticTacToe.gameBoard);
// ticTacToe.resetGame();