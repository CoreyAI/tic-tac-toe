const gameBoard = (() => {
  let board = ['c1','c2','c3','c4','c5','c6','c7','c8','c9'];

  // const setBoard = () => {
  //   const gameContainer = document.querySelectorAll(".game-container");

  // }
  
  return {board};

})();

// const Player = () => {
//   const array = [];
//   const addTally = (a) => array.push(a);
//   const resetArray = () => array.slice(0, array.length);
//   return {array, addTally, resetArray};
// }

const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return {name, mark};
}

const gameController = (() => {

})();

const displayController = (() => {

  const setBoard = () => {
    const gameContainer = document.querySelectorAll(".game-container > div");
    gameContainer.forEach((cell, index) => {
      cell.textContent = gameBoard.board[index];
    });
  };

  return {setBoard};

})();



const player1 = Player();
const player2 = Player();
displayController.setBoard();