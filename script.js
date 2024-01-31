let round = 0;
const selection = ['rock', 'paper', 'scissors'];
const score = [];

function getOverAllWinner() {
  const computer = score.filter((s) => s === 'computer');
  const player = score.filter((s) => s === 'player');

  console.warn(
    `====================${
      player.length > computer.length ? 'Congratulations!!' : 'Not Bad'
    }====================`
  );
  console.info(`Overall Scores:`);
  console.table({ computer: computer.length, player: player.length });
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
  if (!selection.find((s) => s === playerSelection)) {
    return;
  }

  console.warn(`================ROUND ${round + 1}===================`);
  console.log("Computer's pick: ", computerSelection);
  console.log('Your pick: ', playerSelection);

  const winner = getWinner(playerSelection, computerSelection);
  score.push(winner);

  console.info(winner ? `${winner} won this round.` : "It's a tie.");
  round++;
}

function getComputerChoice() {
  const index = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  return selection[index];
}

function getUserChoice() {
  return prompt("pick from 'rock', 'paper' or 'scissors'");
}

while (round < 6) {
  if (round === 5) {
    getOverAllWinner();
    console.log('Please reload to play again.');
    round++;
  } else {
    const user = getUserChoice();
    const computer = getComputerChoice();
    playRound(user, computer);
  }
}
