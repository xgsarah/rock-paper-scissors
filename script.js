let round = 1;
const selection = ['rock', 'paper', 'scissors'];
const score = [];

function getScores() {
  const computer = score.filter((s) => s === 'computer');
  const player = score.filter((s) => s === 'player');

  return { computer: computer.length, player: player.length };
}

function getWinner(playerSelection, computerSelection) {
  if (playerSelection === 'rock') {
    if (computerSelection === 'rock') {
      return null;
    } else if (computerSelection === 'paper') {
      return 'computer';
    } else if (computerSelection === 'scissors') {
      return 'player';
    }
  } else if (playerSelection === 'paper') {
    if (computerSelection === 'rock') {
      return 'player';
    } else if (computerSelection === 'paper') {
      return null;
    } else if (computerSelection === 'scissors') {
      return 'computer';
    }
  } else if (playerSelection === 'scissors') {
    if (computerSelection === 'rock') {
      return 'computer';
    } else if (computerSelection === 'paper') {
      return 'player';
    } else if (computerSelection === 'scissors') {
      return null;
    }
  }
}

function displayRound() {
  const div = document.querySelector('#game-round');
  div.textContent = round;
}

function displayWinnerMessage() {
  const scores = getScores();

  const div = document.querySelector('.weapons');
  div.removeChild(div.querySelector('.container'));

  const container = document.createElement('DIV');
  container.setAttribute('class', 'container');

  const message = document.createElement('h2');
  message.textContent =
    scores.player > scores.computer
      ? 'Congratulations! You won!'
      : scores.player < scores.computer
      ? 'Computer wins'
      : "It's a tie";

  container.appendChild(message);
  div.appendChild(container);

  const resetButton = document.querySelector('#restart-button');
  resetButton.style.display = 'block';
}

function playRound(playerSelection, computerSelection) {
  const winner = getWinner(playerSelection, computerSelection);
  score.push(winner);

  if (round === 5) {
    const div = document.querySelector('.round');
    div.textContent = 'Final Round';
  } else {
    displayRound();
  }

  displayScore();
  displayWinner(playerSelection, computerSelection);
  round++;
}

function getComputerChoice() {
  const index = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  return selection[index];
}

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();

  displayWeapon(playerChoice, 'player');
  displayWeapon(computerChoice, 'computer');
  playRound(playerChoice, computerChoice);

  if (round > 5) {
    displayWinnerMessage();
  }
}

const restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', () => window.location.reload());

const rockButton = document.querySelector('#rock');
rockButton.addEventListener('click', () => playGame('rock'));

const paperButton = document.querySelector('#paper');
paperButton.addEventListener('click', () => playGame('paper'));

const scissorsButton = document.querySelector('#scissors');
scissorsButton.addEventListener('click', () => playGame('scissors'));

const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');

function displayScore() {
  const scores = getScores();

  playerScore.textContent = scores.player;
  computerScore.textContent = scores.computer;
  console.log(scores);
}

function displayWinner(playerSelection, computerSelection) {
  const div = document.querySelector('.weapons');
  const messageContainer = div.querySelector('h2');

  const winner = getWinner(playerSelection, computerSelection);
  let message = '';

  if (winner === 'player') {
    message = `You won! ${playerSelection} beats ${computerSelection}`;
  } else if (winner === 'computer') {
    message = `You lose! ${computerSelection} beats ${playerSelection}`;
  } else {
    message = "It's a tie";
  }

  messageContainer.textContent = message;
}

function displayWeapon(choice, player) {
  const div = document.querySelector(`.${player}-score`);
  const imgDiv = div.querySelector('.image');
  const image = imgDiv.getElementsByTagName('img').length
    ? imgDiv.getElementsByTagName('img')[0]
    : document.createElement('IMG');

  image.setAttribute('src', `images/${choice}.png`);
  image.setAttribute('alt', `${choice} Image`);

  image.style.width = '200px';
  if (player === 'player') {
    image.style.transform = 'rotateY(180deg)';
  }
  imgDiv.appendChild(image);
}
