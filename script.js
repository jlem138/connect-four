var current = "black";

Lowest = [35, 36, 37, 38, 39, 40, 41]
moves = {};

startGame();

function resetLowest() {
  Lowest = [35, 36, 37, 38, 39, 40, 41]
}

function startGame() {
  resetLowest();
  moves = {};
  for (i=0; i<42; i++) {
    document.getElementById(i).style.backgroundColor = "white";
  }
  document.getElementById("message").innerHTML = "";

}

function changecolor(e) {
  var proposedColumn = (e % 7) + 1;
  var lowestAvailable = Lowest[proposedColumn-1]
  if ((lowestAvailable >= 0) && (document.getElementById("message").innerHTML === "")) {
    document.getElementById(lowestAvailable).style.backgroundColor = current;
    moves[lowestAvailable] = current;
    if (current == "black") {
      current = "red"
    } else {
      current = "black";
    }
    turn(lowestAvailable, current === "black" ? "red" : "black")
    Lowest[proposedColumn-1] = lowestAvailable - 7;
  }
}

function turn(squareNumber, squareColor) {
	let gameWon = checkWin(moves, squareNumber, squareColor)
}

function checkWin(allMoves, currentMoveNumber, currentColor) {
  // Get integer of last cell
  // checking horizontal values
  var horizontalConsec = winHelper(allMoves, currentMoveNumber, currentColor, 1)
  var verticalConsec = winHelper(allMoves, currentMoveNumber, currentColor, 7)
  var downDiagonalConsec = winHelper(allMoves, currentMoveNumber, currentColor, 6)
  var upDiagonalConsec = winHelper(allMoves, currentMoveNumber, currentColor, 8)

  if (horizontalConsec === 3 || verticalConsec === 3 || downDiagonalConsec === 3 || upDiagonalConsec === 3) {
    console.log("Game won")
    gameOver(currentColor)
  }
}

function winHelper(board, previousSquareNumber, player, intValue) {
  var h_value_right = 0;
  var h_value_left = 0;
  var right_cont = true;
  var left_cont = true;
  for (i = 1; i < 4; i++) {
    var offset1 = i * intValue;
    if (board[previousSquareNumber + offset1] === player && right_cont === true) {
      h_value_right += 1;
    } else {
      right_cont = false;
    }
    if (board[previousSquareNumber - offset1] === player && left_cont === true) {
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

function gameOver(colorWinner) {
  document.getElementById("message").innerHTML = colorWinner + " WINS";
  document.getElementById("message").style.Color = "black";
}
