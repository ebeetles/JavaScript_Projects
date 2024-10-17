var rows = 10;
var cols = 10;

function makeVisitedArray(rows,cols) {
  var array = new Array(rows);
  for (var r = 0; r < rows; r++) {
    array[r] = new Array(cols);
    for (var c = 0; c < cols; c++) {
      array[r][c] = 0;
    }
  }
  return array;
}

function makeEmpty2dArray(rows,cols) {
  var array = new Array(rows);
  for (var r = 0; r < rows; r++) {
    array[r] = new Array(cols);
    for (var c = 0; c < cols; c++) {
      array[r][c] = {mine: false,
                     covered: true,
                     mineNeighbors: 0, 
                     row: r, 
                     col: c};
    }
  }

  return array;
}

var garden = makeEmpty2dArray(rows,cols);
var gameover = false;

var canvasSize = 400;
if (rows < cols) {
  var gridSize = canvasSize/cols;
  var cellSize = canvasSize/cols;
} else {
  var gridSize = canvasSize/rows;
  var cellSize = canvasSize/rows;
}

function drawWorld(world) {
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      if (world[r][c].covered == true) {
        fill("green");
        stroke(rgb(22,212,110));
        rect(c * cellSize,r * cellSize, gridSize, gridSize);
        continue;
      }
      if (world[r][c].mine == true) {
        fill("red");
        rect(c * cellSize,r * cellSize, gridSize, gridSize);
      } else {
        fill(rgb(140,105,16));
        stroke(rgb(22,212,7));
        rect(c * cellSize,r * cellSize, gridSize, gridSize);
        if (garden[r][c].mineNeighbors > 0) {
          fill("white");
          textSize(22);
          var textX = c * cellSize + cellSize / 3;
          var textY = r * cellSize + cellSize / 2 + 10;
          text(garden[r][c].mineNeighbors, textX, textY);
        }
      }
    }
  }
  if (gameover) {
    fill("black");
    textSize(52);
    text("GAME OVER",40,200);
  }
}

function Queue() {
  this.elements = [];
}

Queue.prototype.enqueue = function(element) {
  this.elements.push(element);
};

Queue.prototype.dequeue = function() {
  if (this.elements.length != 0) {
    return this.elements.shift();
  } else {
    return undefined;
  }
};

Queue.prototype.peek = function() {
  if (this.elements.length != 0) {
    return this.elements[0];
  } else {
    return undefined;
  }
};

Queue.prototype.empty = function() {
  if (this.elements.length == 0) {
    return true;
  } else {
    return false;
  }
};

var numberOfMines = 9;

function isInWorld(r,c) {
  if (r >= 0 && r < rows && c >= 0 && c < cols) {
    return true;
  }
  return false;
}

function countMineNeighbors(r,c) {
  var delta = [[-1, 0], [1, 0],[0, -1],[0, 1],[-1, -1], [-1, 1], [1, -1], [1, 1]];
  var numberOfMineNeighbors = 0;
  for (var i = 0; i < delta.length; i++) {
    if (isInWorld(r + delta[i][0],c + delta[i][1])) {
      if (garden[r + delta[i][0]][c + delta[i][1]].mine == true) {
        numberOfMineNeighbors ++;
      }
    }
  }
  return numberOfMineNeighbors;
}

function createMines() {
  var repeat = [];
  var r = randomNumber(0,numberOfMines - 1);
  var c = randomNumber(0,numberOfMines - 1);
  garden[r][c] = {mine: true,
                  covered: true, 
                  mineNeighbors: countMineNeighbors(r,c), 
                  number: (r * cols + c)};
                  console.log(garden[r][c].number);
  for (var i = 0; i < numberOfMines; i++) {
    repeat.push(garden[r][c].number);
    console.log(repeat);
    for (var j = 0; j < repeat.length; j++) {
      if (garden[r][c] != repeat[j]) {
        r = randomNumber(0,numberOfMines - 1);
        c = randomNumber(0,numberOfMines - 1);
        garden[r][c] = {mine: true,
                        covered: true, 
                        mineNeighbors: countMineNeighbors(r,c), 
                        number: (r * cols + c % rows)};
                        console.log(garden[r][c].number);
        break;
      }
    }
  }
}

function addNeighbors() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      garden[i][j].mineNeighbors = countMineNeighbors(i,j);
    }
  }
}

createMines();
drawWorld(garden);
addNeighbors();

function uncover(r,c) {
  var visited = makeVisitedArray(rows,cols);

  var q = new Queue();
  q.enqueue(garden[r][c]);

  while (!q.empty()) { 
    var a = q.dequeue();
    // console.log(a);
    garden[a.row][a.col].covered = false;
    
    var neighbors = [
      {row:a.row + 1,col:a.col}, 
      {row:a.row - 1,col:a.col}, 
      {row:a.row,col:a.col + 1}, 
      {row:a.row,col:a.col - 1}, 
      {row:a.row - 1,col:a.col - 1},
      {row:a.row + 1,col:a.col + 1},
      {row:a.row + 1,col:a.col - 1},
      {row:a.row - 1,col:a.col + 1}
    ];
    
    if (garden[a.row][a.col].mineNeighbors == 0) {
    for (var i = 0; i < neighbors.length; i++) {
      var n = neighbors[i];
      // console.log(n);
      if (isInWorld(n.row,n.col)) {
        if (visited[n.row][n.col] == 0) {
          q.enqueue(garden[n.row][n.col]);
          visited[n.row][n.col] = 1;
        }
      }
    }
    }
  }
}



function draw() {
  var r, c;
  if (mouseWentUp("leftButton")) {
    if (canvasSize >= mouseX && mouseX >= 0 && canvasSize >= mouseY && mouseY >= 0) {
      c = Math.floor(mouseX/gridSize);
      r = Math.floor(mouseY/gridSize);
      if (garden[r][c].mine == true) {
        garden[r][c].covered = false;
        gameover = true;
      } else {
        uncover(r,c);
      }
      drawWorld(garden);
    }
  }
}
