function Queue() {
  this.elements = [];
}

Queue.prototype.length = function() {
  return this.elements.length;
};

Queue.prototype.at = function(index) {
  return this.elements[index];
};

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

var snakeSpeed = 10;
var snakeDistance = 30;
var head = createSprite(215, 200);
var tail = createSprite(head.x - snakeDistance, 200);
var apple = createSprite(randomNumber(20,380), randomNumber(20,380));
apple.setAnimation("apple");

head.setAnimation("2");
tail.setAnimation("1");
head.velocityX = snakeSpeed;
tail.velocityX = snakeSpeed;

var snake = [head, tail];
var turningPoints = new Queue();

function draw() {
  if (keyWentDown("right")) {
    turn(1,0);
  }
  
  if (keyWentDown("left")) {
    turn(-1,0);
  }
  
  if (keyWentDown("up")) {
    turn(0,-1);
  }
  
  if (keyWentDown("down")) {
    turn(0,1);
  }
  
  if (head.isTouching(apple)) {
    addLength();
    apple.x = randomNumber(20,380);
    apple.y = randomNumber(20,380);
  }
  
  gameOver();
  updateVelocity();
}

function addLength() {
  var newTail;
  if (tail.velocityX == snakeSpeed) {
    newTail = createSprite(tail.x - snakeDistance, tail.y);
  } else if (tail.velocityX == -snakeSpeed) {
    newTail = createSprite(tail.x + snakeDistance, tail.y);
  } else if (tail.velocityY == -snakeSpeed) {
    newTail = createSprite(tail.x, tail.y + snakeDistance);
  } else {
    newTail = createSprite(tail.x, tail.y - snakeDistance);
  }
  newTail.setAnimation("1");
  newTail.velocityX = tail.velocityX;
  newTail.velocityY = tail.velocityY;
  snake.push(newTail);
  tail = newTail;
}

function turn(directionX,directionY) {
  turningPoints.enqueue({dx : directionX, dy : directionY, tpx : head.x, tpy : head.y});
}

function updateVelocity() {
  for (var i = 0; i < snake.length; i++) {
    for (var j = 0; j < turningPoints.length(); j++) {
      if ((snake[i].x == turningPoints.at(j).tpx) && (snake[i].y == turningPoints.at(j).tpy)) {
        snake[i].velocityX = snakeSpeed * turningPoints.at(j).dx;
        snake[i].velocityY = snakeSpeed * turningPoints.at(j).dy;
        if (snake[i] == tail) {
          turningPoints.dequeue();
        }
      }
    }
  }
}

function gameOver() {
  for (var i = 0; i < snake.length; i++) {
    if (head.isTouching(snake[i])) {
      snake[i].velocityX = 0;
      snake[i].velocityY = 0;
      head.velocityX = 0;
      head.velocityY = 0;

      background("darkgray");
      fill("green");
      textSize(50);
      text("Score : " + snake.length,94,200);
    } else {
      background("black");
      drawSprites();
    }
  }
}


// to do:
// 1.dequeue turning points that tail passes through
// 2.add length in all 4 directions
// 3.disable going opposite direction and same direction


