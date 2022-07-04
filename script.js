const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return {name, mark};
}

const gameBoard = (() => {
  // Initializes game board array values.
  let getBoard = ['','','','','','','','',''];

  // Adds interactivity with tic-tac-toe grid and calls upon the
  // playRound function.
  const gameContainer = document.querySelectorAll(".game-container > div");
  gameContainer.forEach(cell => {
    cell.addEventListener("click", (e) => {
      let cellClassName = e.target.className;
      let cellValue = e.target.innerText;
      gameController.playRound(cellClassName, cellValue);
    });
  });
  
  // Inserts player mark into tic-tac-toe cell.
  const placeMark = (cellName) => {
    let cell = document.getElementsByClassName(cellName);
    cell[0].innerText = gameController.currentPlayerMark();
  }

  return {getBoard, placeMark};
})();

const gameController = (() => {
  // Initialize player variables.
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let round = 1;
  
  // Returns the mark of the current player at a specific round.
  const currentPlayerMark = () => {
    if (round % 2 == 0) {
      return player2.mark;
    }
    return player1.mark;
  }

  // Returns the current round value.
  const currentRound = () => {
    return round;
  }

  // General game logic used to progress and evaluate game state.
  const playRound = (cellName, cellValue) => {
    if (cellValue) {
      return;
    }

    gameBoard.placeMark(cellName);

    round++;
    if (round > 9) {
      return console.log("game over");
    }
  }

  return {playRound, currentPlayerMark, currentRound};
})();