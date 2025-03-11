const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Player's move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusText.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    // Switch to AI's turn
    currentPlayer = 'O';
    statusText.textContent = 'AI\'s turn...';
    setTimeout(aiMove, 500);
}

// AI's move
function aiMove() {
    const bestMove = getBestMove();
    gameState[bestMove] = 'O';
    cells[bestMove].textContent = 'O';
    cells[bestMove].classList.add('O');

    if (checkWin()) {
        statusText.textContent = 'AI wins!';
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusText.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    // Switch back to Player's turn
    currentPlayer = 'X';
    statusText.textContent = 'Your turn!';
}

// Minimax algorithm for AI
function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false);
            gameState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function minimax(state, depth, isMaximizing) {
    let result = checkResult(state);
    if (result !== null) {
        return result === 'O' ? 1 : result === 'X' ? -1 : 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'O';
                let score = minimax(state, depth + 1, false);
                state[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (state[i] === '') {
                state[i] = 'X';
                let score = minimax(state, depth + 1, true);
                state[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Check for win
function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

// Check for draw
function checkDraw() {
    return !gameState.includes('');
}

// Check game result
function checkResult(state) {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (state[a] !== '' && state[a] === state[b] && state[a] === state[c]) {
            return state[a];
        }
    }
    return state.includes('') ? null : 'draw';
}

// Reset game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = 'Your turn!';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
