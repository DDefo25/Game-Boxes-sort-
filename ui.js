window.addEventListener('load', startGame);

let boardEl = document.getElementById('board');
let modalEl = document.getElementById('modal');
let resetButtons = document.getElementsByClassName('reset');

let easyButton = document.getElementsByClassName('easy');
let mediumButton = document.getElementsByClassName('medium');
let hardButton = document.getElementsByClassName('hard');


for (let btn of easyButton) {
  btn.addEventListener('click', function() {
    difficult = 1;
    startGame();
  });
};

for (let btn of mediumButton) {
  btn.addEventListener('click', function() {
    difficult = 2;
    startGame();
  });
};

for (let btn of hardButton) {
  btn.addEventListener('click', function() {
    difficult = 3;
    startGame();
  });
};

for (let btn of resetButtons) {
  btn.addEventListener('click', function() {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
    };
    startGame();
  });
};

boardEl.addEventListener('click', function(event) {
  let targetClasses = event.target.classList;
  let targetData = event.target.dataset;
  if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
    clickFreeCell(targetData.col, targetData.row);
    renderBoard(board);
    if (isWin(board) === true) showWin();
  } else if (targetClasses.contains('field') && targetClasses.contains('busy')) {
    clickBusyCell(targetData.col, targetData.row);
  };
});

function showWin() {
  let header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `🍾 Вы победили! 🍾`;
  modalEl.classList.remove('hidden');
}

function renderBoard(board) {
  const fields = [];
  for (let [i, row] of board.entries()) {
    for (let [j, value] of row.entries()) { 
      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-col="${i}" 
            data-row="${j}"
            style="grid-column:${i + 1};grid-row:${row.length - j}; background-color:${value}"
        >
        </div>
      `);
    }
  }
  boardEl.innerHTML = fields.join('');
}