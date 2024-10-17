var rows = 20;
var cols = 20;

var deltaMiddle = [[-1, 0], [1, 0],[0, -1],[0, 1],[-1, -1], [-1, 1], [1, -1], [1, 1]];
var deltaUpperLeft = [[1,0],[1,1],[0,1]];
var deltaUpperRight = [[0,-1],[1,-1],[1,0]];
var deltaLowerLeft = [[-1,0],[-1,1],[0,1]];
var deltaLowerRight = [[0,-1],[-1,-1],[-1,0]];
var deltaUp = [[0,-1],[1,-1],[1,0],[1,1],[0,1]];
var deltaDown = [[0,-1],[-1,-1],[-1,0],[-1,1],[0,1]];
var deltaLeft = [[-1,0],[-1,1],[0,1],[1,1],[1,0]];
var deltaRight = [[-1,0],[-1,-1],[0,-1],[1,-1],[1,0]];

var world = makeEmpty2dArray(rows,cols);
var outPutWorld = makeEmpty2dArray(rows,cols);

function makeEmpty2dArray(rows,cols) {
  var array = new Array(rows);
  for (var r = 0; r < rows; r++) {
    array[r] = new Array(cols);
    for (var c = 0; c < cols; c++) {
      array[r][c] = 0;
    }
  }

  return array;
}

// Make the grid size adjustable based on the number of grids
var canvasSize = 400;
if (rows < cols) {
  var gridSize = canvasSize/cols;
  var cellSize = canvasSize/cols;
} else {
  var gridSize = canvasSize/rows;
  var cellSize = canvasSize/rows;
}

function drawWorld(oldworld, world) {
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      if (oldworld != null && oldworld[r][c] == world[r][c]) {
        continue;
      }
      // Avoid drawing twice
      if (world[r][c] == 0) {
        fill("gray");
        stroke("darkgray");
        rect(c * cellSize,r * cellSize, gridSize, gridSize);
      } else {
        fill(rgb(255, 255, 0));
        rect(c * cellSize,r * cellSize, gridSize, gridSize);
      }
    }
  }
}

drawWorld(null, world);

function setOutputWorldValueAt(row,col,delta) {
  var neighbors = 0;
  for (var i = 0; i < delta.length; i++) {
    neighbors += world[row + delta[i][0]][col + delta[i][1]];
  }
  if (neighbors == 3 || (world[row][col] == 1 && neighbors == 2)) {
    outPutWorld[row][col] = 1;
  } else {
    outPutWorld[row][col] = 0;
  }
}

function draw() {
  var r, c;
  if (mouseWentUp("leftButton")) {
    if (canvasSize >= mouseX && mouseX >= 0 && canvasSize >= mouseY && mouseY >= 0) {
      c = Math.floor(mouseX/gridSize);
      r = Math.floor(mouseY/gridSize);
      if (world[r][c] == 0) {
        world[r][c] = 1;
        drawWorld(null, world);
      } else {
        world[r][c] = 0;                                             
        drawWorld(null, world);
      }
    }
  }
  
  if (keyWentDown("space")) {
    while (true) {
      for (r = 1; r < rows-1; r++) {
        for (c = 1; c < cols-1; c++) {
          setOutputWorldValueAt(r,c,deltaMiddle);
        }
      }
      for (c = 1; c < cols-1; c++) {
        setOutputWorldValueAt(0, c, deltaUp);
        setOutputWorldValueAt(rows-1, c, deltaDown);
      }
      for (r = 1; r < rows-1; r++) {
        setOutputWorldValueAt(r, 0, deltaLeft);
        setOutputWorldValueAt(r, cols-1, deltaRight);
      }
      setOutputWorldValueAt(0, 0, deltaUpperLeft);
      setOutputWorldValueAt(0, cols-1, deltaUpperRight);
      setOutputWorldValueAt(rows-1, 0, deltaLowerLeft);
      setOutputWorldValueAt(rows-1, cols-1, deltaLowerRight);
      drawWorld(world, outPutWorld);
      var t = outPutWorld;
      outPutWorld = world;
      world = t;
    }
  } 
}
