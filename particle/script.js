// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 50; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0,0,255);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.putBack();
    p.display();
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(5,50);
    this.speedY = map(this.dia, 5, 50, 5, 0.5);
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.y = this.y-this.speedY
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255,100);
    circle(0, 0, this.dia);

    pop();
  }
  putBack(){
    if(this.y < -this.dia){
      this.y = height+this.dia;
    }
  }
}
