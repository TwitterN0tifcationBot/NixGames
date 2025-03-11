const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultText = document.getElementById('result');
const scoreText = document.getElementById('score');
const resetBtn = document.getElementById('reset');

let playerScore = 0;
let aiScore = 0;

// Player's move
rockBtn.addEventListener('click', () => playGame('rock'));
paperBtn.addEventListener('click', () => playGame('paper'));
scissorsBtn.addEventListener('click', () => playGame('scissors'));

// AI's move
function getAIMove() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

// Determine the winner
function determineWinner(playerMove, aiMove) {
    if (playerMove === aiMove) {
        return 'draw';
    }
    if (
        (playerMove === 'rock' && aiMove === 'scissors') ||
        (playerMove === 'paper' && aiMove === 'rock') ||
        (playerMove === 'scissors' && aiMove === 'paper')
    ) {
        return 'player';
    }
    return 'ai';
}

// Play the game
function playGame(playerMove) {
    const aiMove = getAIMove();
    const winner = determineWinner(playerMove, aiMove);

    if (winner === 'player') {
        playerScore++;
        resultText.textContent = `You win! ${playerMove} beats ${aiMove}.`;
    } else if (winner === 'ai') {
        aiScore++;
        resultText.textContent = `You lose! ${aiMove} beats ${playerMove}.`;
    } else {
        resultText.textContent = `It's a draw! Both chose ${playerMove}.`;
    }

    updateScore();
}

// Update the score
function updateScore() {
    scoreText.textContent = `Score: You ${playerScore} - ${aiScore} AI`;
}

// Reset the game
resetBtn.addEventListener('click', () => {
    playerScore = 0;
    aiScore = 0;
    resultText.textContent = "Let's play!";
    updateScore();
});
