let flashOn = false;
let flashInterval = 300;
let sparkles = [];
let arch, building, clothes, night, watermountain, street, wish, wine;
let mySound;
let photos = [];
let counter = -1;
let pix = [];

function preload() {
  mySound = loadSound("sounds/digitalshutter.mp3");

  photos[0] = loadImage("assets2/image1.jpg");
  photos[1] = loadImage("assets2/image2.jpg");
  photos[2] = loadImage("assets2/image3.jpg");
  photos[3] = loadImage("assets2/image4.jpg");
  photos[4] = loadImage("assets2/image5.jpg");
  photos[5] = loadImage("assets2/image6.jpg");
  photos[6] = loadImage("assets2/image7.jpg");
  photos[7] = loadImage("assets2/image8.jpg");
}

function setup() {
  let canvas = createCanvas(720, 400);
  canvas.parent("p5-canvas");
  setInterval(flash, flashInterval);
  //maskLayer = createGraphics(width, height);

  for (let i = 0; i < photos.length; i++) {
    pix[i] = new Pix(i % 3 * 110 +350, 30+110*(i/3), photos[i]);
  }
}

function draw() {
  background(250, 243, 177); //pale yellow

  // Camera grip
  strokeWeight(1);
  stroke(0);
  fill(150); // Light gray
  rect(175, 75, 55, 30, 5);
  fill(250, 243, 177); //pale yellow
  rect(188, 85, 30, 10, 20);
  fill(71, 69, 69);
  
  //button
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
    drawStar(sparkle.x, sparkle.y, 4, 10, 4);
  }

  noStroke();
  fill(0, 0);
  rect(400, 30, 170, 170);
  for (let i = 0; i < photos.length; i++) {
    pix[i].show();
  }

  if (mouseIsPressed) {
    if (counter > -1 && counter < photos.length) {
      pix[counter].showPix = true;
      flash();
    }else{
      fill(255, 13, 13);
      text("⛔️LIMITED ACCESS⛔️", width/5, height/2);
      textSize(40)
      textStyle(BOLDITALIC)
    }
  }

  //console.log(counter);
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

function mousePressed() {
  counter++;
  flashOn = true;
}
function mouseReleased(){
  flashOn = false;
}



function flash() {
  if (mouseIsPressed && counter > -1 && counter < photos.length) {
    flashOn = true;
    if (mySound.isPlaying() == false) {
      mySound.play();
    } else {
      mySound.pause();
      mySound.setVolume(1);
    }

    // Add new sparkles when flash happens
    for (let i = 0; i < 1; i++) {
      // Reduced number of sparkles to space them out more
      // Generate random position near the flash
      let sparkleX = random(220, 300);
      let sparkleY = random(150, 100);
      sparkles.push({ x: sparkleX, y: sparkleY });
    }
  } else {
    flashOn = false;
    // Clear sparkles when flash is off
    sparkles = [];
  }
}

function flash2() {
  if (mySound.isPlaying() == false ) {
    // Clear sparkles when flash is off
    sparkles = [];
    mySound.play();
  } else {
    for (let i = 0; i < 7; i++) {
      // Reduced number of sparkles to space them out more
      // Generate random position near the flash
      let sparkleX = random(200, 300);
      let sparkleY = random(150, 100);
      sparkles.push({ x: sparkleX, y: sparkleY });
    }
  }
}

function showImage() {}

class Pix {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.showPix = false;
  }
  show() {
    if (this.showPix == true) {
      image(this.img, this.x, this.y, 100, 100);
    }
  }
}
