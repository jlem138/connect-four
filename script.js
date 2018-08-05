var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
var thisMove = 'O';

Lowest = [35, 36, 37, 38, 39, 40, 41]

const cells = document.querySelectorAll('.cell');
startGame();


function resetLowest() {
  Lowest = [35, 36, 37, 38, 39, 40, 41]
}

function startGame() {
  resetLowest();
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(42).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
  var i = square.target.id;
  var proposedColumn = (i % 7) + 1;
  var lowestAvailable = Lowest[proposedColumn-1]
  if (thisMove == 'O') {
    turn(lowestAvailable, 'X')
    thisMove = 'X';
    cells[lowestAvailable].style.backgroundColor = "red";
    cells[lowestAvailable].style.color = "red";
  } else {
	  turn(lowestAvailable, 'O')
    thisMove = 'O';
    cells[lowestAvailable].style.color = "black";
    cells[lowestAvailable].style.backgroundColor = "black";
  }
  Lowest[proposedColumn-1] = lowestAvailable - 7;
}

function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerHTML = player;
	let gameWon = checkWin(origBoard, player, squareId)
	if (gameWon) gameOver(gameWon)
}

function winHelper(board, player, lastMoveSpot2, intvalue1) {
  var h_value_right = 0;
  var h_value_left = 0;
  var right_cont = true;
  var left_cont = true;
  for (i = 1; i < 4; i++) {
    var offset1 = i * intvalue1;
    if (origBoard[lastMoveSpot2 + offset1] === player && right_cont === true) {
      h_value_right += 1;
    } else {
      right_cont = false;
    }
    if (origBoard[lastMoveSpot2 - offset1] === player && left_cont === true) {
      h_value_left += 1;
    } else {
      left_cont = false;
    }
  }
  if (h_value_right + h_value_left === 3) {
    console.log("win")
  }
  return(h_value_left + h_value_right)
}

function checkWin(board, player, lastMove) {
  // Get integer of last cell
  lastMoveSpot = parseInt(lastMove)
  // checking horizontal values
  var horizontalConsec = winHelper(board, player, lastMoveSpot, 1)
  var verticalConsec = winHelper(board, player, lastMoveSpot, 7)
  var downDiagonalConsec = winHelper(board, player, lastMoveSpot, 6)
  var upDiagonalConsec = winHelper(board, player, lastMoveSpot, 8)

  if (horizontalConsec === 3 || verticalConsec === 3 || downDiagonalConsec === 3 || upDiagonalConsec === 3) {
    console.log("Game won")
    gameOver()
  }
}

function gameOver() {
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
}
