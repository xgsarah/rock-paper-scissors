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

function playRound(playerSelection, computerSelection) {
  const winner = getWinner(playerSelection, computerSelection);
  score.push(winner);

  displayScore();
  displayWinner(playerSelection, computerSelection);
  displayRound();
  round++;
}

function getComputerChoice() {
  const index = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  return selection[index];
}

const playGame = (playerChoice) => {
  const computerChoice = getComputerChoice();

  displayWeapon(playerChoice, 'player');
  displayWeapon(computerChoice, 'computer');
  playRound(playerChoice, computerChoice);
};

const rockButton = document.querySelector('#rock');
rockButton.addEventListener('click', () => playGame('rock'));

const paperButton = document.querySelector('#paper');
paperButton.addEventListener('click', () => playGame('paper'));

const scissorsButton = document.querySelector('#scissors');
scissorsButton.addEventListener('click', () => playGame('scissors'));

const playerScore = document.querySelector('#player-score');
const computerScore = document.querySelector('#computer-score');

const displayScore = () => {
  const scores = getScores();

  playerScore.textContent = scores.player;
  computerScore.textContent = scores.computer;
  console.log(scores);
};

const displayWinner = (playerSelection, computerSelection) => {
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
};

const displayRound = () => {
  const div = document.querySelector('#game-round');
  div.textContent = round;
};

const displayWeapon = (choice, player) => {
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
};
