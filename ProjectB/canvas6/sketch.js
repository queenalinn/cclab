let coinstack;
let coins = [];
let coinCatcher;
let catcherWidth = 70; 
let catcherHeight = 80; 
let catcherX; 
let ellipseSpeed = 5;
let score = 0;
let sound;

class Coin {
  constructor() {
    this.x = random(100, 400); //parameter of coins falling
    this.y = -10;
    this.speed = random(1, 3);
  }

  display() {
    fill(255, 215, 0); // gold
    ellipse(this.x, this.y, 40);
    ellipse(this.x, this.y, 30);
  }

  update() {
    this.y += this.speed;
  }

  checkCollision() {
    if (
      this.y + 20 >= height - catcherHeight &&
      this.y - 20 <= height - catcherHeight + catcherHeight &&
      this.x + 20 >= catcherX &&
      this.x - 20 <= catcherX + catcherWidth
    ) {
      return true;
    }
    return false;
  }
}

function preload() {
  coinstack = loadImage("coinstack.jpg");
  coinCatcher = loadImage("chest.webp");
  sound = loadSound("sound/coinSound.mp3");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas");
  catcherX = width / 2 - catcherWidth / 2; // Set initial position of the catcher
}

function draw() {
  if (mouseY > 0 && mouseY < height){
  image(coinstack, 0, 0, width, height);

  for (let i = coins.length - 1; i >= 0; i--) {
    coins[i].display();
    coins[i].update(); // Update the position of the coins

    if (coins[i].checkCollision()) {
      coins.splice(i, 1);
      score++;
      sound.play();
    } else if (coins[i].y > height) {
      coins.splice(i, 1);
    }
  }

  fill(232, 7, 11); //red
  textSize(20);
  text("Score: " + score, 320, 20);

  //Image of coinCatcher
  image(coinCatcher, catcherX, height - catcherHeight, catcherWidth, catcherHeight);

  if (keyIsDown(LEFT_ARROW)) {
    catcherX -= ellipseSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    catcherX += ellipseSpeed;
  }

  catcherX = constrain(catcherX, 0, width - catcherWidth);

  // fill(0);
  // textSize(10);
  // textStyle(BOLD);
  // textAlign(CENTER, CENTER);
  // text("Use Left & Right Arrows to Move", 310, height - 10);
  // textAlign(CENTER, CENTER);
  // text("Press Mouse to Start", 60, height - 10);
  

  if (score >= 10) {
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(8, 189, 23); //green
    text("Congratulations! You Win!", width / 2, height / 2);
    noLoop();
  }

  if (frameCount % 60 === 0) {
    let coin = new Coin();
    coins.push(coin);
  }
 }
}

function keyPressed() {
  loop();
}

function mousePressed() {
  loop();
}