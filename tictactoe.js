var board = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];

var AI_MARK = "O";
var HUMAN_MARK = "X";
var GRID_SIZE = 133;
var MARK_SIZE = 132.9;
var turn = "X";

var canvasSize = 400;
var turn = "X";

function drawBoard(board) {
  for (var r = 0; r < 3; r++) {
    for (var c = 0; c < 3; c++) {
      fill("skyblue");
      strokeWeight(8);
      rect(c * MARK_SIZE,r * MARK_SIZE,GRID_SIZE,GRID_SIZE);
      if (board[r][c] == "O") {
        fill("black");
        textSize(175);
        text("O",c * MARK_SIZE - 1.5, r * MARK_SIZE + 130);
      }
      if (board[r][c] == "X") {
        fill("black");
        textSize(185);
        text("X",c * MARK_SIZE + 5, r * MARK_SIZE + 134);
      }
    }
  }
}


// AI functions
var winWays = [];

winWays.push([{r:0, c:0}, {r:0, c:1}, {r:0, c:2}]);
winWays.push([{r:1, c:0}, {r:1, c:1}, {r:1, c:2}]);
winWays.push([{r:2, c:0}, {r:2, c:1}, {r:2, c:2}]);
winWays.push([{r:0, c:0}, {r:1, c:0}, {r:2, c:0}]);
winWays.push([{r:0, c:1}, {r:1, c:1}, {r:2, c:1}]);
winWays.push([{r:0, c:2}, {r:1, c:2}, {r:2, c:2}]);
winWays.push([{r:0, c:0}, {r:1, c:1}, {r:2, c:2}]);
winWays.push([{r:0, c:2}, {r:1, c:1}, {r:2, c:0}]);

function determineWin(mark, board) {
  for (var i = 0; i < 8; i++) {
    var way = winWays[i];
    var markCount = 0;
    
    for (var j = 0; j < 3; j++) {
      var point = board[way[j].r][way[j].c];
      if (point == mark) {
        markCount ++;
      } 
    }
    if (markCount == 3) {
      return true;
    }
  }
  return false;
}


function findBestMove(board) {
  var move = win(board);
  if (move != null) {
    return move;
  }
  
  move = block(board);
  if (move != null) {
    return move;
  }
  
  move = {r:1, c:1};
  if (board[1][1] == 0) {
    return move; 
  }
  
  move = {r:0, c:0};
  if (board[0][0] == 0) {
    return move; 
  }
  
  move = {r:0, c:2};
  if (board[0][2] == 0) {
    return move; 
  }
  
  move = {r:2, c:0};
  if (board[2][0] == 0) {
    return move; 
  }
  
  move = {r:2, c:2};
  if (board[2][2] == 0) {
    return move; 
  }
  
  move = {r:0, c:1};
  if (board[0][1] == 0) {
    return move; 
  }
  
  move = {r:1, c:0};
  if (board[1][0] == 0) {
    return move; 
  }
  
  move = {r:1, c:2};
  if (board[1][2] == 0) {
    return move; 
  }
  
  move = {r:2, c:1};
  if (board[2][1] == 0) {
    return move; 
  }
}

function win(board) {
  var winMove = checkTwo(AI_MARK, HUMAN_MARK, board); 
  return winMove;
}

function block(board) {
  var blockMove = checkTwo(HUMAN_MARK, AI_MARK, board); 
  return blockMove;
}

function checkTwo(mark, nmark, board) {
  for (var i = 0; i < 8; i++) {
    var way = winWays[i];
    var move = null;
    var markCount = 0;
    
    for (var j = 0; j < 3; j++) {
      var point = board[way[j].r][way[j].c];
      if (point == mark) {
        markCount ++;
      } else if (point != nmark) {
        move = way[j];
      }
    }
    if (markCount == 2) {
      return move;
    }
  }
  return null;
}



function draw() {
  var r, c;
  if (mouseWentUp("leftButton")) {
    if (AIMove == undefined) {
      background("black");
      fill("white");
      textSize(130);
      text("DRAW",0,250);
    }
    
    if (canvasSize >= mouseX && mouseX >= 0 && canvasSize >= mouseY && mouseY >= 0) {
      c = Math.floor(mouseX/GRID_SIZE);
      r = Math.floor(mouseY/GRID_SIZE);

      board[r][c] = turn;
      turn = "O";
    }
  }
  
  if (turn == "O") {
    var AIMove = findBestMove(board);  
    board[AIMove.r][AIMove.c] = AI_MARK;
    console.log(AIMove);
  
    turn = "X";
  }
  
    drawBoard(board);
  
  if (determineWin("X",board)) {
    background("black");
    fill("white");
    textSize(130);
    text("X wins",0,250);
  } else if (determineWin("O",board)) {
    background("white");
    fill("black");
    textSize(130);
    text("O wins",0,250);
  }
}
