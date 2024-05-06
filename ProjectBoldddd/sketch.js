let flashOn = false;
let flashInterval = 300; 
let sparkles = [];
let arch,building,clothes,night,watermountain,street,wish,wine;
let maskLayer;
let mySound;

function preload(){
  mySound = loadSound("sounds/digitalshutter.mp3")

  arch = loadImage("assets/arch.jpg");
  building = loadImage("assets/building.jpg");
  clothes = loadImage("assets/clothes.jpg");
  night = loadImage("assets/night.jpg");
  watermountain = loadImage("assets/watermountain.jpg");
  street = loadImage("assets/street.jpg");
  wish = loadImage("assets/wish.jpg");
  wine = loadImage("assets/wine.jpg");

}

function setup() {
  let canvas = createCanvas(1200, 400);
  canvas.parent("canvasContainer");
  setInterval(flash, flashInterval);
  maskLayer = createGraphics(width,height);
}

function draw() {
  background(176, 245, 231);

  // Camera grip
  strokeWeight(1);
  stroke(0);
  fill(150); // Light gray
  rect(175, 75, 55, 30, 5);
  fill(255);
  rect(188, 85, 30, 10, 20);
  fill(71, 69, 69);
  rect(120, 85, 45, 20, 5);
  fill(191, 191, 191);
  rect(240, 85, 40, 20, 2);

  // Camera body
  fill(36, 35, 35); // Black
  strokeWeight(1);
  stroke(0);
  rect(100, 100, 200, 150, 20);
  fill(199, 199, 199); // Light gray
  rect(100, 130, 200, 100);

  // Lens
  fill(252, 206, 96); // Gray
  noStroke();
  ellipse(200, 180, 95, 95);

  // Lens details
  fill(80); // Darker gray
  ellipse(200, 180, 70, 70);
  fill(20);
  ellipse(200, 180, 50, 50);

  // Flash
  if (flashOn) {
    fill(255, 223, 107); // Light yellow
  } else {
    fill(242, 240, 240); // Light gray
  }
  rect(250, 135, 40, 20, 2);

  // Draw sparkles
  stroke(1);
  fill(255, 230, 0);
  for (let sparkle of sparkles) {
    drawStar(sparkle.x, sparkle.y, 4, 10, 4); // Draw a star at sparkle position
  }

  image(arch,400, 210);
  arch.resize(170, 170);
  image(night,400, 30);
  night.resize(170, 170);
  image(building,600, 180);
  building.resize(170, 200);
  image(watermountain,600,10);
  watermountain.resize(170, 160);
  image(clothes,800, 200);
  clothes.resize(150, 180);
  image(street,800, 10);
  street.resize(150,180);
  image(wish,975, 190);
  wish.resize(150,190);
  image(wine,975, 10);
  wine.resize(150,170);

}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function flash() {
  if (mouseIsPressed) {
    flashOn = true;
    if(mySound.isPlaying() == false){
      mySound.play();
    }else{
      mySound.pause();
    }

    // Add new sparkles when flash happens
    for (let i = 0; i < 7; i++) { // Reduced number of sparkles to space them out more
      // Generate random position near the flash
      let sparkleX = random(200, 300);
      let sparkleY = random(150, 100);
      sparkles.push({ x: sparkleX, y: sparkleY });
    }
  } else {
    flashOn = false;
    // Clear sparkles when flash is off
    sparkles = [];
  }
}