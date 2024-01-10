const boardSize = 10;
const howManyTicks = 3;

const container = document.querySelector('.container');
for (let i= 0; i < boardSize; i++){
  const row =  document.createElement('div')
  row.className = 'row';
  for(let j = 0; j < boardSize; j++)
  {
    const cell = document.createElement('div');
    cell.className = 'cell';
    row.appendChild(cell);
  }
  container.appendChild(row);
}







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
    console.log('');
  }
  function getBoard(){return board;} 
  function checkRows(mark){
    for (let i = 0; i < boardSize; i++){
      if (board[i].filter(x => x===mark).length === howManyTicks) return true;
    }
    return false;
  }
  function checkColumns(mark){
    for (let i = 0; i < boardSize; i++)
    {
      let counter = 0;
      for (let j = 0; j< boardSize; j++){   
        if (board[j][i] === mark) counter++;
      }
      if (counter >= howManyTicks) return true;
      else counter = 0;
    }
  }
  function checkDiagonalRight(mark){
    for(let i = 0; i <= boardSize - howManyTicks; i++){
      for(let j = 0; j <= boardSize - howManyTicks; j++){
        let counter = 0;
        for(let k = 0; k < howManyTicks; k++){
          if(board[i+k][j+k] === mark) counter++;
        }
        if(counter === howManyTicks) return true;
      }
    }
    return false;
  }
  
  function checkDiagonalLeft(mark){
    for(let i = 0; i <= boardSize - howManyTicks; i++){
      for(let j = boardSize - 1; j >= howManyTicks - 1; j--){
        let counter = 0;
        for(let k = 0; k < howManyTicks; k++){
          if(board[i+k][j-k] === mark) counter++;
        }
        if(counter === howManyTicks) return true;
      }
    }
    return false;
  }
  function doIwin(mark){
    if (checkRows(mark)) console.log(mark + " wins");
    if (checkColumns(mark)) console.log(mark + " wins");
    if (checkDiagonalRight(mark)) console.log(mark + " wins");
    if (checkDiagonalLeft(mark)) console.log(mark + " wins");
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
game.p1.makeMove(0, 2);
game.p1.makeMove(1, 1);
game.p1.makeMove(2, 2);