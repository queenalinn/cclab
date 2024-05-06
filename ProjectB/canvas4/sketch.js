let mySound;
let n = 7;
let cake = [];

var capture;
var tracker;
var w = 640,
  h = 480;

function preload() {
  mySound = loadSound("sound/munch.mp3")
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas");
  //Creates a new HTML5 <video> element that contains the audio/video feed from a webcam.
  capture = createCapture(
    {
      audio: false,
      video: {
        width: w,
        height: h,
      },
    },
    function () {
      //console.log("capture ready.");
    }
  );
  capture.elt.setAttribute("playsinline", "");
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  //clm is a different library
  tracker = new clm.tracker();
  //init = initialize
  tracker.init();
  // this starts the capture
  tracker.start(capture.elt);

  for (let i = 0; i < n; i++) {
    cake[i] = new Cake(random(100, width - 100), random(-100, -600), 100);
  }
}

function draw() {

  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0, w, h);

  var positions = tracker.getCurrentPosition();
  if (mouseY > 0 && mouseY < height) {
    for (let i = 0; i < n; i++) {
      cake[i].drawCakeBase();
      cake[i].drawOsmanthus();
      cake[i].drawLinesAndCircles();
      cake[i].move();
    }

    noFill();
    stroke(255);

    noStroke();

    if (positions.length > 0) {
      // [44] and [50] located on conrner of mouth. Created vector to detect mouth movement.
      var mouthTop = createVector(positions[60][0], positions[60][1]);
      var mouthBottom = createVector(positions[57][0], positions[57][1]);
      var smile = mouthTop.dist(mouthBottom);

      for (let i = 0; i < n; i++) {
        var cakeposition = createVector(cake[i].x, cake[i].y);
        var cake_mouth = mouthTop.dist(cakeposition);
        // console.log("m:" + smile + "cake:" + cake_mouth);
        if (smile > 10 && cake_mouth < 50) {
          cake[i].x = random(100, width - 100);
          cake[i].y = -100;
          if (mySound.isPlaying() == false) {
            mySound.play();
          } else {
            mySound.pause();
          }
        }
      }
      // line shows a bar showing smiling amount
      //rect(20, 20, smile * 3, 20);
      fill(0, 0, 0);
      ellipse(positions[60][0], positions[60][1], 5, 5);
      ellipse(positions[57][0], positions[57][1], 5, 5);

    }
    pop();
  }
}

class Cake {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.cakeSpeed = 5;
  }

  // Draw the cake base
  drawCakeBase() {
    fill(255, 220, 178); // Light brown
    noStroke();
    circle(this.x, this.y, this.size);
  }

  drawOsmanthus() {
    fill(255, 255, 0); // Yellow
    circle(this.x, this.y, this.size * 0.5);

    // Petals
    let numPetals = 5; // Number of petals
    let angleIncrement = TWO_PI / numPetals;
    let petalSize = this.size * 0.5 * 0.7; // Size of each petal

    for (let i = 0; i < numPetals; i++) {
      let angle = i * angleIncrement;
      let xOffset = cos(angle) * this.size * 0.5 * 0.6;
      let yOffset = sin(angle) * this.size * 0.5 * 0.6;
      ellipse(this.x + xOffset, this.y + yOffset, petalSize, petalSize);
    }
  }

  drawLinesAndCircles() {
    let length = 60;
    let numLines = 5;
    let radius = 20;
    let angleIncrement = TWO_PI / numLines;
    let endX;
    let endY;

    for (let i = 0; i < numLines; i++) {
      let angle = i * angleIncrement;
      endX = this.x + cos(angle) * radius;
      endY = this.y + sin(angle) * radius;
      let startX = this.x + cos(angle) * (radius - 20);
      let startY = this.y + sin(angle) * (radius - 20);

      stroke(255, 102, 204); // Pink
      line(startX, startY, endX, endY);
      fill(255, 102, 204); // Pink
      ellipse(endX, endY, 10, 10); // Small circle
    }
    fill(255, 102, 204); // Pink
    ellipse(this.x, this.y, 10, 10); // Small circle
  }

  move() {
    this.y += this.cakeSpeed;

    if (this.y > height + this.size) {
      this.y = -this.size;

    }
  }
}