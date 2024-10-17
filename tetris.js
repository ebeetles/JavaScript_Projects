function makeArray(r,c,color) {
  var array = new Array(r);
  for (var i = 0; i < r; i++) {
    array[i] = new Array(c);
    for (var j = 0; j < c; j++) {
      array[i][j] = color;
    }
  }
  return array;
}

var board = makeArray(21,10,"gray");  // JL: can you easily change background color? gray is hardcoded everywhere.

var boardWidth = board[0].length;
// JL: should be board.length and 20 rows when initializing the board
var boardHeight = board.length - 1;
var downSpeed = 3;
var direction = 0;  // when direction == 0, that means that the user has not clicked right or left.
                    //when it is 20, the user has clicked right, and when it is -20, the user has clicked left

// JL: In real game, the kind of the next block is determined randomly.
// Also, for each kind of blocks, there're multiple rotated modes.
// Think about how to make these happen easily.
// JL: use more descriptive name for each block.
var I = {
  x:60,  // this value is when the block starts in the middle of the screen
  y:0,

  // JL: if you put "orange" in the array, what's the purpose of the 'color' property below?
  // Also, do you always show orange block one or block one can be in different colors?
  block:[["orange","orange","orange","orange"]],  
  extendedBlock:[["orange","orange","orange","orange"], ["orange","orange","orange","orange"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"orange",
  name: "I"
};

var IR1 = {
  x:60,
  y:0,

  block:[["orange"],["orange"],["orange"],["orange"]],
  extendedBlock:[["orange"],["orange"],["orange"],["orange"],["orange"]],
  width: function() {
    return this.block[0].length;
  },
  
  height: function() {
    return this.block.length;
  },
  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"orange",
  name: "IR1"
};

var J = {
  x:60,
  y:0,

  block:[["purple","purple","purple"], [0,0,"purple"]],
  extendedBlock:[["purple","purple","purple"], ["purple","purple","purple"], [0,0,"purple"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"purple",
  name: "J"
};

var JR1 = {
  x:60,
  y:0,

  block:[[0,"purple"], [0,"purple"], ["purple","purple"]],
  extendedBlock:[[0,"purple"], [0,"purple"], ["purple","purple"], ["purple","purple"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"purple",
  name: "JR1"
};

var JR2 = {
  x:60,
  y:0,

  block:[["purple",0,0], ["purple","purple","purple"]],
  extendedBlock:[["purple",0,0], ["purple","purple","purple"], ["purple","purple","purple"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"purple",
  name: "JR2"
}; 

var JR3 = {
  x:60,
  y:0,

  block:[["purple","purple"], ["purple",0], ["purple",0]],
  extendedBlock:[["purple","purple"], ["purple","purple"], ["purple",0], ["purple",0]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"purple",
  name: "JR3"
};

var L = {
  x:60,
  y:0,

  block:[["blue","blue","blue"], ["blue",0,0]],
  extendedBlock:[["blue","blue","blue"], ["blue","blue","blue"], ["blue",0,0]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"blue",
  name: "L"
};

var LR1 = {
  x:60,
  y:0,

  block:[["blue","blue"], [0,"blue"], [0,"blue"]],
  extendedBlock:[["blue","blue"], ["blue","blue"], [0,"blue"], [0,"blue"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"blue",
  name: "LR1"
};

var LR2 = {
  x:60,
  y:0,

  block:[[0,0,"blue"], ["blue","blue","blue"]],
  extendedBlock:[[0,0,"blue"], ["blue","blue","blue"], ["blue","blue","blue"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"blue",
  name: "LR2"
};

var LR3 = {
  x:60,
  y:0,

  block:[["blue",0], ["blue",0], ["blue","blue"]],
  extendedBlock:[["blue",0], ["blue",0], ["blue","blue"], ["blue","blue"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"blue",
  name: "LR3"
};

var O = {
  x:60,
  y:0,

  block:[["red","red"], ["red","red"]],
  extendedBlock:[["red","red"], ["red","red"], ["red","red"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"red",
  name: "O"
};

var T = {
  x:60,
  y:0,

  block:[[0,"yellow",0], ["yellow","yellow","yellow"]],
  extendedBlock:[[0,"yellow",0], ["yellow","yellow","yellow"], ["yellow","yellow","yellow"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"yellow",
  name: "T"
};

var TR1 = {
  x:60,
  y:0,

  block:[["yellow",0], ["yellow","yellow"], ["yellow",0]],
  extendedBlock:[["yellow",0], ["yellow","yellow"], ["yellow","yellow"], ["yellow",0]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"yellow",
  name: "TR1"
};

var TR2 = {
  x:60,
  y:0,

  block:[["yellow","yellow","yellow"], [0,"yellow",0]],
  extendedBlock:[["yellow","yellow","yellow"], ["yellow","yellow","yellow"], [0,"yellow",0]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"yellow",
  name: "TR2"
};

var TR3 = {
  x:60,
  y:0,

  block:[[0,"yellow"], ["yellow","yellow"], [0,"yellow"]],
  extendedBlock:[[0,"yellow"], ["yellow","yellow"], ["yellow","yellow"], [0,"yellow"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"yellow",
  name: "TR3"
};

var Z = {
  x:60,
  y:0,

  block:[["green","green",0], [0,"green","green"]],
  extendedBlock:[["green","green",0], ["green","green","green"], [0,"green","green"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"green",
  name: "Z"
};

var ZR1 = {
  x:60,
  y:0,

  block:[[0,"green"],["green","green"],["green",0]],
  extendedBlock:[[0,"green"],["green","green"],["green","green"],["green",0]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"green",
  name: "ZR1"
};

var S = {
  x:60,
  y:0,

  block:[[0,"skyblue","skyblue"], ["skyblue","skyblue",0]],
  extendedBlock:[[0,"skyblue","skyblue"], ["skyblue","skyblue","skyblue"], ["skyblue","skyblue",0]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"skyblue",
  name: "S"
};

var SR1 = {
  x:60,
  y:0,

  block:[["skyblue",0], ["skyblue","skyblue"], [0,"skyblue"]],
  extendedBlock:[["skyblue",0], ["skyblue","skyblue"], ["skyblue","skyblue"], [0,"skyblue"]],
  width: function() {
    return this.block[0].length;
  },
  height: function() {
    return this.block.length;
  },  
  extendedHeight: function() {
    return this.height() + 1; 
  },
  color:"skyblue",
  name: "SR1"
};

var rotations = {
  "I" : IR1,
  "IR1" : I,
  "J" : JR1,
  "JR1" : JR2,
  "JR2" : JR3,
  "JR3" : J,
  "L" : LR1,
  "LR1" : LR2,
  "LR2" : LR3,
  "LR3" : L,
  "O" : O,
  "T" : TR1,
  "TR1" : TR2,
  "TR2" : TR3,
  "TR3" : T,
  "Z" : ZR1,
  "ZR1" : Z,
  "S" : SR1,
  "SR1" : S
};
console.log(rotations);

var block = getRandomBlock();

// JL: Should the next four lines belong to drawBoard?
background("teal");
fill("teal");
strokeWeight(5);
rect(230,20,140,100);

var GRID_SIZE = 20;

function drawBlock(block) {
  for (var r = 0; r < block.height(); r++) {
    for (var c = 0; c < block.width(); c++) {
      if (block.block[r][c] != 0) {
        fill(block.color);
        strokeWeight(3);
        rect(c * GRID_SIZE + block.x, r * GRID_SIZE + block.y, GRID_SIZE, GRID_SIZE);
      }
    }
  }
}

function drawBoard(board) {
  for (var r = 0; r < boardHeight; r++) {  
    for (var c = 0; c < boardWidth; c++) {
      fill(board[r][c]);
      strokeWeight(3);
    
      rect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }
}

// JL: for functions that you can't tell what they do by just reading the names, add comments.
function compareAlignedBlockToBoard(block) {
  for (var h = 0; h < block.height(); h++) {
    for (var w = 0; w < block.width(); w++) {
      if (block.block[h][w] != 0 && 
          // JL: make sure indexes are in bounds when access an array by index
          board[((block.y + downSpeed)/GRID_SIZE) + h][((block.x + direction)/GRID_SIZE) + w] != "gray") {
        return false;
      }
    }
  }
  return true;
}

// JL: for functions that you can't tell what they do by just reading the names, add comments.
function compareUnalignedBlockToBoard(block) {
  for (var h = 0; h < block.extendedHeight(); h++) {
    for (var w = 0; w < block.width(); w++) {
      if (block.extendedBlock[h][w] != 0 && 
          // JL: make sure indexes are in bounds when access an array by index
          board[Math.floor((block.y + downSpeed)/GRID_SIZE) + h][Math.floor((block.x + direction)/GRID_SIZE) + w] != "gray") {
        return false;
      }
    }
  }
  return true;
}

// JL: add a comment, especially on the return value.
function detectFullLine(board) {
  for (var r = 0; r < boardHeight; r++) {  
    var squareCount = 0;
    
    for (var c = 0; c < boardWidth; c++) {
      if (board[r][c] != "gray") {
        squareCount ++;
      } 
    }
    if (squareCount == 10) {  // JL: Do no use hard-coded number
      return r;
    }
  }
  return -1;
}

function eraseLine(board, line) {
  if (line != -1) {
    for (var r = line; r > 0; r--) {
      board[r] = board[r - 1];
    }
  }
}

function fixBlock(block) {
  for (var r = 0; r < block.height(); r++) {
    for (var c = 0; c < block.width(); c++) {
      if (block.block[r][c] == block.color) {
        // JL: make sure indexes are in bounds when access an array by index
        board[r + Math.round(block.y/GRID_SIZE)][c + Math.round(block.x/GRID_SIZE)] = block.block[r][c];
      }
    }
  }
}

function moveAndRotateBlock() {
  if ((block.y + (block.height() * GRID_SIZE)) < (GRID_SIZE * boardHeight) ) {  
    if (keyWentDown("right")) {
      if ((block.x + (block.width() * GRID_SIZE)) < GRID_SIZE * boardWidth) {
        direction = 20;  // JL: avoid hardcoded number
        if (compare() == true) {
          block.x += direction;
        }
        direction = 0;
      }
    }
  
    if (keyWentDown("left")) {
      if (block.x > 0) {
        direction = -20;  // JL: avoid hardcoded number
        if (compare() == true) {
          block.x += direction;
        }
        direction = 0;
      }
    }
  
    if (keyDown("down")) {
      block.y += 10;  // JL: avoid hardcoded number
    } else {
      block.y += downSpeed;
    }
  
    if (keyWentUp("up")) {
      if (block != O) {
        // JL: only call rotateBlock once
        rotateBlock(block).x = block.x;
        rotateBlock(block).y = block.y;
        block = rotateBlock(block);
      }
    }
  } else {
    fixBlock(block);
    drawBoard(board);
  }
}

// JL: use more meaningful function name
function compare() {
  var viable;
  if ((block.y + downSpeed) % GRID_SIZE == 0) {
    viable = compareAlignedBlockToBoard(block);
  } else {
    viable = compareUnalignedBlockToBoard(block);
  }
  return viable;
}

function dropBlock() {
  if (compare() == false) {  
    fixBlock(block);
    drawBoard(board);
    block = getRandomBlock();
    
    block.x = 60;
    block.y = 0;
  } else {
    moveAndRotateBlock();
    drawBoard(board);    
    drawBlock(block);
  }
}
 
// JL: can you simplify this function? hint: use array
function getRandomBlock() {
  var random = randomNumber(0, 6);
  var blocks = [I, J, L, O, T, Z, S];
  
  return blocks[random];
}

// JL: can you simplify this function? hint: use map
function rotateBlock(currentBlock) {
  return rotations[currentBlock.name];
}

function draw() {  
  dropBlock();
 
  eraseLine(board, detectFullLine(board));
  
  drawBlock(block);
  drawSprites();
}


