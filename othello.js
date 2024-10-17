var board = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,2,1,0,0,0],
  [0,0,0,1,2,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
];

var moveTracker = 1;
var GRID_SIZE = 43;
var STONE_SIZE = 42.9;
background("olive");

function drawBoard(board) {
  moveText();
  othelloAndPass();
  score(board);
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      fill(rgb(182,155,76));
      rect(c * STONE_SIZE,r * STONE_SIZE,GRID_SIZE,GRID_SIZE);
      if (board[r][c] == 2) {
        fill("white");
        ellipse(c * STONE_SIZE + 22,r * STONE_SIZE + 22,40,40);
      }
      if (board[r][c] == 1) {
        fill("black");
        ellipse(c * STONE_SIZE + 22,r * STONE_SIZE + 22,40,40);
      }
    }
  }
}

function othelloAndPass() {
  var color = ["red", "green", "blue", "yellow", "purple", "orange", "black"];
  var chars = ["O", "T", "H", "E", "L", "L", "O"];
  var y = 0;
  textSize(35);
  for (var i = 0; i < color.length; i++) {
    fill(color[i]);
    text(chars[i], 357, y += 40);
  }
  fill("aqua");
  rect(350,290,40,50);
  fill("green");
  textSize(17);
  text("pass",352,318);
}

function score(board) {
  var bscore = 0;
  var wscore = 0;
  for (var r = 0; r < board.length; r++) {
    for (var c = 0;c < board.length;c++) {
      if (board[r][c] == 1) {
        bscore++;
      }  
      
      if (board[r][c] == 2) {
        wscore++;
      }
    }
  }
  fill("red");
  textSize(25);
  text("w score: " + wscore, 280, 375);
  fill("yellow");
  text("b score: " + bscore, 150, 375);
}

function flip(board, r, c, turn, deltar, deltac) {
  r += deltar;
  c += deltac;
  for (; board[r][c] != turn; r += deltar, c += deltac) {
    board[r][c] = turn;
  }
}

function opponentColor(turn) {
  if (turn == 1) {
    return 2;
  } else {
    return 1;
  }
}

function isOnBoard(r, c) {
  if (r >= 0 && r < 8 && c >= 0 && c < 8) {
    return true;
  }
  return false;
}

function moveIsLegalInOneDirection(board, r, c, turn, deltar, deltac) {
  r += deltar;
  c += deltac;

  if (isOnBoard(r, c)) {
    if (board[r][c] == opponentColor(turn)) {
      for (r += deltar, c += deltac ; isOnBoard(r, c); r += deltar, c += deltac) {
        if (board[r][c] == turn) {
          return true;
        } else if (board[r][c] == 0){
          return false;
        }
      }
    }
  }
  return false;
}

function moveIsLegalAndFlip(board, r, c, turn) {
  if (!isOnBoard(r, c)) {
    return false;
  }
  if (board[r][c] == 1 || board[r][c] == 2) {
    return false;
  }
  
  var isLegal = false;
  var delta = [[-1, 0], [1, 0],[0, -1],[0, 1],[-1, -1], [-1, 1], [1, -1], [1, 1]];
  for (var i = 0; i < delta.length; i++) {
    var deltar = delta[i][0];
    var deltac = delta[i][1];
    if (moveIsLegalInOneDirection(board, r, c, turn, deltar, deltac)) {
      flip(board, r, c, turn, deltar, deltac);
      isLegal = true;
    }
  }
  return isLegal;
}

function moveText() {
  background("olive");
  fill("blue");
  textSize(23);
  if (moveTracker == 1) {
    text("whites move",7,375);
  } else if (moveTracker == 2) {
    text("blacks move", 7, 375);
  }
}

function draw() {

  if (mouseWentUp("leftButton")) {
    if (350 < mouseX && mouseX < 390 && 290 < mouseY && mouseY < 340) {
      if (moveTracker == 2) {
        moveTracker = 1;
      } else if (moveTracker == 1) {
        moveTracker = 2;
      }
    } else {
      var c = Math.floor(mouseX/GRID_SIZE);
      var r = Math.floor(mouseY/GRID_SIZE);
      if (moveIsLegalAndFlip(board, r, c, moveTracker)) {
        if (moveTracker == 2) {
          board[r][c] = 2;
          moveTracker = 1;
        } else {
          board[r][c] = 1;
          moveTracker = 2;
        }
      }
    }
    moveText();
  }
  drawBoard(board);
}


