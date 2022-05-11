window.addEventListener('load', startGame);

const boardEl = document.getElementById('board');
const modalEl = document.getElementById('modal');
const resetButtons = document.getElementsByClassName('button__reset');
const difficultButtons = document.getElementsByClassName('button__difficult');

for (let btn of difficultButtons) {
  btn.addEventListener('click', function() {
    switch (btn.id) {
      case 'hard':
        difficult = 3;
        break;
      case 'medium':
        difficult = 2;
        break;
      default:
        difficult = 1;
    };
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
    if (cellCopy.value !== '') event.target.classList.add('focus');
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