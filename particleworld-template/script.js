// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 25; // Decide the initial number of particles.

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
  background(74-50, 114-50, 138-50);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.rot = random(-5,5);
    this.glowOffset = random(5000);
    this.dia = 30;
  }
  // methods (functions): particle's behaviors
  update() {
    this.x+=random(-1,1);
    this.y+=random(-1,1);
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    scale(0.6); 
    rotate(this.rot+sin(degrees(2-(4*sin(frameCount/100000)))));
    //butt
    noStroke();
    fill(255,223,122);
    ellipse(0,10,30,40);
    for (let i=10; i>0; i--){
      push();
      fill(255,223,122,(100/i)*sin((frameCount+this.glowOffset)/100));
      ellipse(0,10,30+(i*6),40+(i*6));
      pop();
    }
    //head
    strokeWeight(2);
    stroke(166, 134, 99);
    line(0,-25,-40,-40)
    line(0,-25,40,-40)
    noStroke();
    fill(174,107,107);
    circle(0,-25,25);
    ellipse(0,-25,20,30);
    
    //wings
    fill(60,51,81);
    ellipse(-30,-10,60,30);
    ellipse(30,-10,60,30)
    fill(106,80,109);
    ellipse(-20,0,60,30)
    ellipse(20,0,60,30)
    pop();

    /*
    //butt
    noStroke();
    fill(255,223,122);
    ellipse(this.x-40,this.y+10,30,40);
    for (let i=5; i>0; i--){
      push();
      fill(255,223,122,(100/i)*sin(frameCount/100));
      ellipse(this.x-40,this.y+10,30+(i*6),40+(i*6));
      pop();
    }
    //head
    strokeWeight(2);
    stroke(166, 134, 99);
    line(this.x-40,this.y-25,this.x-70,this.y-40)
    line(this.x-40,this.y-25,this.x-10,this.y-40)
    noStroke();
    fill(174,107,107);
    circle(this.x-40,this.y-25,25);
    ellipse(this.x-40,this.y-25,20,30);
    
    //wings
    fill(60,51,81);
    ellipse(this.x-70,this.y-10,60,30);
    ellipse(this.x-10,this.y-10,60,30)
    fill(106,80,109);
    ellipse(this.x-60,this.y,60,30)
    ellipse(this.x-20,this.y,60,30)
    pop();*/
  }
}
