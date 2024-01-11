const boardSize = 15;
const howManyTicks = 5;
const game = new Game();
game.reset();



function Board() {
  const board = new Array(boardSize).fill().map(() => new Array(boardSize).fill('.'));
  function fill (row, col, mark){
    if (board[col][row]==='.')board[col][row] = mark;
    else {console.log("invalid move");
    return 1;}
  }
  function logBoard(){
    for(let i = 0; i < boardSize; i++){
      console.log(board[i].join(' '));
    }
    console.log('');
  }
  function checkRows(mark){
    for(let i = 0; i <= boardSize - howManyTicks; i++){
      for(let j = 0; j <= boardSize - howManyTicks; j++){
        let counter = 0;
        for(let k = 0; k < howManyTicks; k++){
          if(board[i][j+k] === mark) counter++;
        }
        if(counter === howManyTicks) return true;
      }
    }
    return false;
  }
  function checkColumns(mark){
    for(let i = 0; i <= boardSize - howManyTicks; i++){
      for(let j = 0; j <= boardSize - howManyTicks; j++){
        let counter = 0;
        for(let k = 0; k < howManyTicks; k++){
          if(board[i+k][j] === mark) counter++;
        }
        if(counter === howManyTicks) return true;
      }
    }
    return false;
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
    if (gameBoard.fill(x, y, mark)===1) return 1;
    gameBoard.logBoard();
    gameBoard.doIwin(mark);    
  }
  return{makeMove}
}
function Game(){
  let whooseTurn = true;
  const gameBoard = Board();
  this.p1 = new Player('O', gameBoard);
  this.p2 = new Player('X', gameBoard);
  this.makeMove = function (cell){
    if (whooseTurn === true){
      if (this.p1.makeMove(cell.x, cell.y)) return 1;
      else  cell.dot.classList.add('white');
    }
    else {
      if (this.p2.makeMove(cell.x, cell.y)) return 1;
      else  cell.dot.classList.add('black');
    }
    whooseTurn = !whooseTurn;
  }
  this.reset = function () {
    const container = document.querySelector('.container');
    const game = this;
    for (let i = 0; i < boardSize; i++){
      const row =  document.createElement('div')
      row.className = 'row';
      for(let j = 0; j< boardSize; j++)
      {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.x = j;
        cell.y = i;
        row.appendChild(cell);
        cell.dot = document.createElement('span');
        cell.appendChild(cell.dot);
        cell.addEventListener('click', function(e){
          game.makeMove(this);
        });
      }
    container.appendChild(row);
    }
  }
}
