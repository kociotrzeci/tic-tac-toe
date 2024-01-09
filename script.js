const boardSize = 3;
const howManyTicks = 3;
function Board() {
  const board = new Array(boardSize).fill().map(() => new Array(boardSize).fill('.'));
  function fill (row, col, mark){
    if (board[col][row]==='.')board[col][row] = mark;
    else console.log("invalid move");
  }
  function logBoard(){
    for(let i = 0; i < boardSize; i++){
      console.log(board[i].join(' '));
    }
  }
  function getBoard(){return board;} 
  function checkRow(mark){
    return board[1].filter(x => x===mark).length = howManyTicks ? true : false;
  }
  function doIwin(mark){
    if (checkRow(mark)) console.log(mark + " wins");
  }
  return {fill, logBoard, doIwin};
}

function Player(mark, gameBoard){
  function makeMove(x, y){
    gameBoard.fill(x, y, mark);
    gameBoard.logBoard();
    gameBoard.doIwin(mark);
  }
  return{makeMove}
}
function Game(){
  const gameBoard = Board();
  this.p1 = new Player('O', gameBoard);
  this.p2 = new Player('X', gameBoard);
}

const game = new Game();
game.p1.makeMove(0, 0);
game.p1.makeMove(1, 0);
game.p1.makeMove(2, 0);