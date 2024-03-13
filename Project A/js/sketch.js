let yoff = 0.0;
let randValue;
let crabx = 150;
let crabspeed = 3
let blurbyX;
let blurbyY;
let sandR;
let sandG;
let sandB;
let sand;

//seashell
let seashellCount = 10;
let seashellX = [seashellCount];
let seashellY = [seashellCount];
let seashellR = [seashellCount];
let seashellG = [seashellCount];
let seashellB = [seashellCount];
let seashellS = [seashellCount];

//fish
let fishCount = 2;
let fishX = [fishCount];
let fishY = [fishCount];
let fishR = [fishCount];
let fishG = [fishCount];
let fishB = [fishCount];

function setup() {
  createCanvas(800, 500);
  randValue = random(100);
  let cnv = createCanvas(800,500);
  cnv.parent("p5-canvas-container")
  
  sand = color(random(100,255),random(100, 255),random(100,255))


  for (let i = 0; i < seashellCount; i++) {
    seashellX[i] = random(0, width);
    seashellY[i] = random(0, 130);
    seashellR[i] = random(200,255);
    seashellG[i] = random(100,255);
    seashellB[i] = random(100,255);
    seashellS[i] = random(1, 2.5);
  }

  for (let i = 0; i < fishCount; i++) {
    fishX[i] = random(0, width);
    fishY[i] = random(200, height-50);
    fishG[i] = random(255);
    fishB[i] = random(255);
  }

  blurbyX = width / 2;
  blurbyY = height / 2;
}

function draw() {
  //KEY IS PRESSED
  if ((keyIsPressed === true) && (key === 'b')) {
    fill(sand);
    rect(-10,-10,850,350);
  } else {
    background(240, 226, 189);
  }
  //waves
  push();
  noStroke();
  fill(117, 215, 235);
  beginShape();
  let xoff = 0;
  for (let x = 0; x <= width; x += 6) {
    let y = map(noise(xoff, yoff), 0, 1, 200, 100);
    vertex(x, y);
    xoff += 0.05;
  }
  
  yoff += 0.03; //makes the wave move
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  pop();
  push();
  

  for (let i = 0; i < fishCount; i++) {
    push();
    translate(0, 0);

    //fish
    noStroke(0);
    fill(255, fishG[i], fishB[i]);
    triangle(
      fishX[i] + 50,
      fishY[i] - 20,
      fishX[i] + 8,
      fishY[i],
      fishX[i] + 50,
      fishY[i] + 20
    )
    ellipse(fishX[i], fishY[i], 60, 30);
    pop();
  }

  //bubbles
  push();
  noStroke();
  fill(187, 234, 250);
  for (var i = 0; i < 15; i++) {
    circle(random(width), random(180, height), 18);
    circle(random(width), random(180, height), 10);
  }
  pop();

  //crab moves
  drawCrab(crabx, height - 40);
  crabx += crabspeed;
  if (crabx < 50 || crabx > width - 50) {
    //crabx = -50
    crabspeed *= -1;
  }

  move(width, height);
  drawBlurby(blurbyX, blurbyY);
  
  for (let i = 0; i < fishX.length; i++) {
    let d = dist(blurbyX, blurbyY, fishX[i], fishY[i]);
    if (d < 90) {
      // if Bluby is near fish it eats it
      fishX.splice(i, 1);
      fishY.splice(i, 1);
    }
  }
  
}
function drawBlurby(bx, by) {
  push();
  //Blurby Body
  strokeWeight(1);
  fill(245, 127, 232);
  ellipse(bx - 35, by + 30, 20, 30);
  ellipse(bx - 20, by + 40, 20, 30);
  ellipse(bx, by + 45, 20, 30);
  ellipse(bx + 35, by + 30, 20, 30);
  ellipse(bx + 20, by + 40, 20, 30);
  ellipse(bx, by, 90, 80);
  arc(bx + 30, by - 25, 30, 30, 66, 70);
  arc(bx - 30, by - 25, 30, 30, 90, 50);

  //Blurby Face
  arc(bx, by + 20, 10, 10, 0, PI); //smile
  fill(40);
  circle(bx - 20, by, 23);
  circle(bx + 20, by, 23);
  let eyex = map(mouseX, 0, width, -8, 4);
  let eyey = map(mouseY, 0, height, -1, 4);
  fill(255);
  circle(eyex + bx - 17, eyey + by - 3, 13);
  circle(eyex + bx + 24, eyey + by - 3, 13);

  //blush
  noStroke();
  fill(255, 219, 251);
  ellipse(bx - 25, by + 17, 15, 10);
  ellipse(bx + 25, by + 17, 15, 10);
  pop();
}

function drawCrab(x, y) {
  push();
  noStroke();
  //Carb Legs
  fill(125, 11, 22);
  ellipse(x - 45, y + 10, 20, 5);
  ellipse(x - 53, y + 18, 5, 19);
  ellipse(x - 35, y + 18, 20, 5);
  ellipse(x - 42, y + 26, 5, 19);
  ellipse(x + 45, y + 10, 20, 5);
  ellipse(x + 53, y + 18, 5, 19);
  ellipse(x + 35, y + 18, 20, 5);
  ellipse(x + 43, y + 26, 5, 19);

  //Crab Body
  fill(247, 32, 51);
  ellipse(x, y, 80, 50);
  fill(40);
  circle(x - 12, y, 20);
  circle(x + 18, y, 20);
  fill(255);
  circle(x - 10, y + 5, 8);
  circle(x + 20, y + 5, 8);

  //Carb Arms
  fill(168, 35, 47);
  arc(x - 45, y - 10, 20, 20, 10, PI);
  arc(x + 40, y - 10, 20, 20, 10, PI);
  pop();
     
  //seashell    
  for (let x = 0; x < seashellCount; x++) {
    push();
    stroke(10);
    translate(seashellX[x], seashellY[x]);
    for (var i = 0; i < 200; i++) {
      push();
      rotate(i / 7);
      scale(seashellS[x] * (i / 2000));
      fill(seashellR[x], seashellG[x], seashellB[x]);
      rect(0, 10, 80, 300);
      pop();
    }
    pop();
  }
}
function move(x, y) {
  blurbyX = x * noise(frameCount * 0.001);
  blurbyY = constrain(y * noise(frameCount * 0.03), 200, height);
  
}

function mousePressed() {
  fishCount++;
  append(fishX,mouseX);
  append(fishY,mouseY);
  //append(fishX,random(0,width));
  //append(fishY,random(200,height-50));
  append(fishG,random(255));
  append(fishB,random(255));
}