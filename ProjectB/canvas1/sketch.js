let img;
let stars = [];
let mySound;

function preload() {
  img = loadImage("photo/towers.jpg");
  mySound = loadSound("sound/twinkle.mp3");
}

function setup() {
let canvas = createCanvas(400, 650);
canvas.parent("p5-canvas");
  
}

function draw() {
  background(255);
  image(img, 0, 0, width, height);

  for (let i = 0; i < stars.length; i++) {
    stars[i].display();
  }
}

function mousePressed() {
  let newStar = new star(mouseX, mouseY);
  stars.push(newStar);
  
  if (mySound.isLoaded()) {
    mySound.play();
    mySound.setVolume(0.5);
  }
}

class star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius1 = 5;
    this.radius2 = 10;
    this.npoints = 5;
  }

  display() {
    push();
    translate(this.x, this.y);
    //noStroke();
    if (this.x > 210) {
      fill(30, 0, 255); //blue
    } else {
      fill(255, 230, 0); //yellow
    }
    
    let angle = TWO_PI / this.npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = cos(a) * this.radius2;
      let sy = sin(a) * this.radius2;
      vertex(sx, sy);
      sx = cos(a + halfAngle) * this.radius1;
      sy = sin(a + halfAngle) * this.radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
}
