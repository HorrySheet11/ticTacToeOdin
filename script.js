class GameControl {
    constructor() {
        this.gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
        this.currentPlayer = "X";
        this.gameActive = true;
        this.currentPlayerDisplay = document.querySelector('.currentPlayer');
    }

    get winningConditions() {
        return [
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
    }

    checkWin() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.gameBoard[a[0]][a[1]] !== "" &&
                this.gameBoard[a[0]][a[1]] === this.gameBoard[b[0]][b[1]] &&
                this.gameBoard[a[0]][a[1]] === this.gameBoard[c[0]][c[1]]) {
                const winner = this.gameBoard[a[0]][a[1]];
                return true;
            }
        }
        return false;
    }

    checkDraw() {
        for (let row of this.gameBoard) {
            for (let cell of row) {
                if (cell === "") {
                    return false;
                }
            }
        }
        return true;
    }

    makeMove(row, col, card) {
        if (this.gameActive && this.gameBoard[row][col] === "") {
            this.gameBoard[row][col] = this.currentPlayer;
            card.innerText = this.currentPlayer;
            card.disabled = true;
            if (this.checkWin()) {
                this.gameActive = false;
                console.log(`Player ${this.currentPlayer} wins!`);
                this.currentPlayerDisplay.innerText = `Player ${this.currentPlayer} wins!`;
            } else if (this.checkDraw()) {
                this.gameActive = false;
                console.log("It's a draw!");
                this.currentPlayerDisplay.innerText = "It's a draw!";
            } else {
                this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
                this.currentPlayerDisplay.innerText = `Current Player: ${this.currentPlayer}`;
            }
        }
    }

    resetGame() {
        this.gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
        this.currentPlayer = "X";
        this.gameActive = true;
        document.querySelectorAll('.cell').forEach(cell => {cell.innerText = ""; cell.disabled = false});
        this.currentPlayerDisplay.innerText = `Current Player: ${this.currentPlayer}`;
    }
}
let ticTacToe = new GameControl();