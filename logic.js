const RED = '#eb2640';
const YELLOW = '#ded94e';
const BLUE = '#0ea5eb';
const GREEN = '#2f9e4c';
const PURPLE = '#9452eb';

let colors = [RED, YELLOW, BLUE, GREEN, PURPLE];

let board = [];
let colorsInGame = [];
let difficult = 1;

//буфер обмена
let cellCopy = {
  value: '',
  coordinatesOfCopyCell: [],
};

//изменение доски и кол-ва цветов от сложности
function boardDifficult (board, colors, difficult) {
  let rows, columns, colorsAmount;
  switch (difficult) {
    case 3: 
      rows = 6;
      columns = 7;
      colorsAmount = 5;
      break
    case 2: 
      rows = 5;
      columns = 6;
      colorsAmount = 4;
      break
    default:
      rows = 4;
      columns = 5;
      colorsAmount = 3;
  };
  for (let i = 0; i < rows; i += 1) {
    let row = [];
    for (let j = 0; j < columns; j += 1) {
      row.push('');   
    };
    board.push(row);
  };
  for (let i = 0; i < colorsAmount; i += 1) {
    colorsInGame.push(colors[i]);
  };
};

//заполняет случайно доску и обновляет её
function startGame() {
  resetStartCondition();
  boardDifficult(board, colors, difficult);
  randomFill(board);
  renderBoard(board);
};

function resetStartCondition() {
  clearBoard();
  board = [];
  colorsInGame = [];
};

//возвращает случайный index из array
function randomIndex(array) {
  return Math.round(Math.random() * (array.length - 1));
};

//возвращает случайно заполненную доску
function randomFill(board) {
  for (let [i, row] of board.entries()) {
    let rowIsEmpty = row.map(value => value = '')
    board.splice(i, 1, rowIsEmpty);
  };
  for (let [i, row] of board.entries()) {
    for (let j = 0; j <= randomIndex(row); j += 1) {
      board[i][j] = colorsInGame[randomIndex(colorsInGame)];
    };
  };
};

//проверка предыдущей ячейки (нижний сосед на доске) на наличие значения, границу доски и отличие от этого же ряда (столба доски)
function neighborPreviousCheck (row, column) {
  let {value, coordinatesOfCopyCell: [rowCopied, columnCopied]} = cellCopy;
  let neighborIsFit = board[row][+column - 1] === value
    && row !== rowCopied
    || board[row][+column - 1] === undefined;
  if (neighborIsFit) return true;
  else return false;
};

//проверка следущей ячейки (верхний сосед на доске) на пустоту или границу доски
function neighborNextCheck (row, column) {
  let neighborIsFit = board[row][+column + 1] === ''
    || board[row][+column + 1] === undefined;
  if (neighborIsFit) return true;
  else return false;
};

//вызывается по клику на занятую ячейку и копирует в буфер (cellCopy)
function clickBusyCell (row, column) {
  if (cellCopy.value === '' && neighborNextCheck(row, column)) {
    cellCopy.value = board[row][column];
    cellCopy.coordinatesOfCopyCell = [row, column];
  } else {
    cellCopy.value = '';
    cellCopy.coordinatesOfCopyCell = [];
  };
};

//вызывается по клику на пустую ячейку и вставляет из буфера(cellCopy) значение
function clickFreeCell(row, column) {
  let {value, coordinatesOfCopyCell: [rowCopied, columnCopied]} = cellCopy;
  if (value !== '' && neighborPreviousCheck(row, column)) {
    board[row][column] = value;
    board[rowCopied][columnCopied] = '';
    cellCopy.value = '';
    cellCopy.coordinatesOfCopyCell = [];
  } else {
    cellCopy.value = '';
    cellCopy.coordinatesOfCopyCell = [];
  };
};

//проверка доски на победу
function isWin(board) {
  let winningColumns = [];
  let columnsWinCount = 0;
  for (let row of board) {
    let nonEmptyValue = row.filter(value => value !== '');
    if (nonEmptyValue != 0) {
      columnsWinCount += 1;
      for (let color of colorsInGame) {
        let result = nonEmptyValue.every(value => value === color);
        if (result === true) winningColumns.push(color);
      };
    };
  };
  if (winningColumns.length === columnsWinCount) return true;
  return false;
};
