const boardSize = 3;
const howManyTicks = 3;
const game = new Game();
game.reset();

function Board() {
  const dialog = document.querySelector('dialog');
  const body = document.querySelector('body');
  const board = new Array(boardSize).fill().map(() => new Array(boardSize).fill('.'));
  let isWon = false;
  function fill(row, col, mark) {
    if (isWon) return 2;
    if (board[col][row] === '.') board[col][row] = mark;
    else {
      console.log("invalid move");
      return 1;
    }
  }
  function logBoard() {
    for (let i = 0; i < boardSize; i++) {
      console.log(board[i].join(' '));
    }
    console.log('');
  }
  function checkRows(mark) {
    for (let i = 0; i <= boardSize - howManyTicks; i++) {
      for (let j = 0; j <= boardSize - howManyTicks; j++) {
        let counter = 0;
        for (let k = 0; k < howManyTicks; k++) {
          if (board[i][j + k] === mark) counter++;
        }
        if (counter === howManyTicks) return true;
      }
    }
    return false;
  }
  function checkColumns(mark) {
    for (let i = 0; i <= boardSize - howManyTicks; i++) {
      for (let j = 0; j <= boardSize - howManyTicks; j++) {
        let counter = 0;
        for (let k = 0; k < howManyTicks; k++) {
          if (board[i + k][j] === mark) counter++;
        }
        if (counter === howManyTicks) return true;
      }
    }
    return false;
  }
  function checkDiagonalRight(mark) {
    for (let i = 0; i <= boardSize - howManyTicks; i++) {
      for (let j = 0; j <= boardSize - howManyTicks; j++) {
        let counter = 0;
        for (let k = 0; k < howManyTicks; k++) {
          if (board[i + k][j + k] === mark) counter++;
        }
        if (counter === howManyTicks) return true;
      }
    }
    return false;
  }
  function checkDiagonalLeft(mark) {
    for (let i = 0; i <= boardSize - howManyTicks; i++) {
      for (let j = boardSize - 1; j >= howManyTicks - 1; j--) {
        let counter = 0;
        for (let k = 0; k < howManyTicks; k++) {
          if (board[i + k][j - k] === mark) counter++;
        }
        if (counter === howManyTicks) return true;
      }
    }
    return false;
  }
  function doIwin(mark) {
    if (checkRows(mark) || checkColumns(mark) || checkDiagonalRight(mark) || checkDiagonalLeft(mark)) {
      console.log(mark + " wins");
      dialog.showModal();
      dialog.addEventListener('click', function (e) {
        dialog.close();
        game.reset();
        isWon = false;
      })
      return 1;
    };
  }
  return { fill, logBoard, doIwin };
}
function Player(mark, gameBoard) {
  function makeMove(x, y) {
    if (gameBoard.isWon) return 2;
    if (gameBoard.fill(x, y, mark)) return 1;
    gameBoard.logBoard();
    if (gameBoard.doIwin(mark)) {
      gameBoard.isWon = true;
    }
  }
  return { makeMove }
}
function Game() {
  let whooseTurn = true;
  this.makeMove = function (cell) {
    if (whooseTurn === true) {
      if (this.p1.makeMove(cell.x, cell.y)) return 1;
      else cell.dot.classList.add('white');
    }
    else {
      if (this.p2.makeMove(cell.x, cell.y)) return 1;
      else cell.dot.classList.add('black');
    }
    whooseTurn = !whooseTurn;
  }
  this.reset = function () {
    let gameBoard = new Board();
    this.p1 = new Player('O', gameBoard);
    this.p2 = new Player('X', gameBoard);
    const container = document.querySelector('.container');
    const game = this;
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    for (let i = 0; i < boardSize; i++) {
      const row = document.createElement('div')
      row.className = 'row';
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.x = j;
        cell.y = i;
        row.appendChild(cell);
        cell.dot = document.createElement('span');
        cell.appendChild(cell.dot);
        cell.addEventListener('click', function (e) {
          game.makeMove(this);
        });
      }
      container.appendChild(row);
    }
  }
}
