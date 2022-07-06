const Player = (name, mark) => {
  const getName = () => {return name};
  const getMark = () => {return mark};
  const setName = (userName) => name = userName;
  const setMark = (userMark) => mark = userMark; 
  return {getName, getMark, setName, setMark};
}

const gameBoard = (() => {
  // Initializes game board array values.
  let board = ['','','','','','','','',''];

  // Getter for the board array.
  const getBoard = () => {
    return board;
  }

  const resetBoard = () => {
    board = ['','','','','','','','','']
    gameContainer.forEach(cell => {
      cell.innerHTML = "";
    });
  }

  // Adds interactivity with tic-tac-toe grid and calls upon the
  // playRound function.
  const gameContainer = document.querySelectorAll(".game-container > div");
  gameContainer.forEach(cell => {
    cell.addEventListener("click", (e) => {
      if (gameController.getGameState() == 2) {
        console.log("game is over");
      } else if (gameController.getGameState() == 0) {
        console.log("press start game to play");
        flashPlayButton();

      } else {
        gameController.playRound(e.target.className, e.target.innerText);
      }
    });
  });
  
  // Inserts player mark into tic-tac-toe cell.
  const placeMarkInGrid = (cellName) => {
    let cell = document.getElementsByClassName(cellName);
    cell[0].innerText = gameController.currentPlayerMark();
  }
  
  // Inserts player mark into the game array.
  const placeMarkInArray = (cellName) => {
    let index = parseInt(cellName.slice(1)) - 1;
    board[index] = gameController.currentPlayerMark();
  }

  // Highlights the play button when user attempts to play game without adding
  // users. 
  const flashPlayButton = () => {
    const playButton = document.getElementById("play-button");
    playButton.setAttribute("class", "play-button-highlight");
    setTimeout(() => playButton.removeAttribute("class", "play-button-highlight"), 250);
  }

  // Sets player1 and player2 names and marks and enables interactivity with
  // the tic-tac-toe board.
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const p1Name = e.target.children[0].children[0].children[1];
    const p1Mark = e.target.children[0].children[1].children[1];
    const p2Name = e.target.children[1].children[0].children[1];
    const p2Mark = e.target.children[1].children[1].children[1];
    gameController.setPlayers(p1Name.value, p1Mark.value, p2Name.value, p2Mark.value);
    gameController.setGameState(1);
    formToggle("disable", p1Name, p1Mark, p2Name, p2Mark);
  });

  form.addEventListener("reset", (e) => {
    e.preventDefault();
    if (gameController.getGameState() == 0) {
      return console.log("game hasn't started for resetting");
    }
    gameController.setGameState(0);
    const p1Name = e.target.children[0].children[0].children[1];
    const p1Mark = e.target.children[0].children[1].children[1];
    const p2Name = e.target.children[1].children[0].children[1];
    const p2Mark = e.target.children[1].children[1].children[1];
    formToggle("enable", p1Name, p1Mark, p2Name, p2Mark);
    resetBoard();
    gameController.setCurrentRound(1);
  });

  const formToggle = (formState, p1Name, p1Mark, p2Name, p2Mark) => {
    if (formState == "disable") {
      p1Name.setAttribute("disabled", "disabled");
      p1Mark.setAttribute("disabled", "disabled");
      p2Name.setAttribute("disabled", "disabled");
      p2Mark.setAttribute("disabled", "disabled");
    } else if (formState == "enable") {
      p1Name.removeAttribute("disabled", "disabled");
      p1Mark.removeAttribute("disabled", "disabled");
      p2Name.removeAttribute("disabled", "disabled");
      p2Mark.removeAttribute("disabled", "disabled");
    }
  }


  return {getBoard, placeMarkInGrid, placeMarkInArray};
})();

const gameController = (() => {
  // Initialize player variables.
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  let round = 1;

  let gameState = 0;  // 0 = pregame, 1 = game, 2 = endgame.
  
  // Getter for the end game state.
  const getGameState = () => {return gameState};
  const setGameState = (value) => {gameState = value};
  
  // Returns the mark of the current player at the current round.
  const currentPlayerMark = () => {
    if (round % 2 == 0) {
      return player2.getMark();
    }
    return player1.getMark();
  }
  
  // Returns the name of the current player at the current round.
  const currentPlayerName = () => {
    if (round % 2 == 0) {
      return player2.getName();
    }
    return player1.getName();
  }

  // Returns the current round value.
  const getCurrentRound = () => {
    return round;
  }

  const setCurrentRound = (num) => {
    round = num;
  }

  // General game logic used to progress and evaluate game state.
  const playRound = (cellName, cellValue) => {
    if (cellValue) {
      return;
    }

    gameBoard.placeMarkInGrid(cellName);
    gameBoard.placeMarkInArray(cellName);
    
    if (getCurrentRound() >= 5) {
      if (winCheck()) {
        setGameState(2);
        return console.log(`winner, ${currentPlayerName()}`);
      } 
    }
    
    round++;
    if (round > 9) {
      setGameState(2);
      return console.log("game over");
    }
  }

  const winCondition = () => {
    let win = [
      [0,1,2],[3,4,5],[6,7,8],    // All 3 tic-tac-toe rows.
      [0,3,6],[1,4,7],[2,5,8],    // All 3 tic-tac-toe columns.
      [0,4,8],[2,4,6],            // Both tic-tac-toe diagonals.
    ];
    return win;
  }

  // Constructs an array for the values that the player selected in the game.
  const playerArray = (playerMark) => {
    let playerArray = [];
    let gameArray = gameBoard.getBoard();
    for (i = 0; i < gameArray.length; i++) {
      if (gameArray[i] == playerMark) {
        playerArray.push(i);
      }
    }
    return playerArray;
  }

  // Checks if win condition is met with current player values.
  const winCheck = () => {
    let win = winCondition();
    let player = playerArray(currentPlayerMark());
    for (i = 0; i < win.length; i++) {     
      for (j = 0; j < player.length; j++) {
        const a = win[i].join('');                  // converts values into
        const b = player.slice(j, j+3).join('');    // string for compare.
        if (a == b) {
          return true;
        }
      }
    }
    return false;
  }

  // Setter for players.
  const setPlayers = (player1Name, player1Mark, player2Name, player2Mark) => {
    player1.setName(player1Name);
    player1.setMark(player1Mark);
    player2.setName(player2Name);
    player2.setMark(player2Mark);
  }

  return {playRound, currentPlayerMark, getCurrentRound, setCurrentRound, getGameState, setGameState, setPlayers};
})();