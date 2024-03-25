/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new CupcakeMania(width/2,height/2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(255, 247, 179);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class CupcakeMania  {
  constructor(startX, startY) {
    this.x = startX;
    this.y_wrapper = startY;
    this.y_frosting = startY;
    this.y_cherry = startY;
    this.speed_wrapper = 50;
    this.speed_frosting = 100;
    this.speed_cherry = 70;
    //..
    //..
    //..
  }
  update() {
    //this.y = noise(frameCount*this.speed)*width;
    this.y_wrapper  = height/2+sin(frameCount*0.1)*50;
    this.y_frosting = height/2-20+sin(frameCount*0.1)*70;
    this.y_cherry = height/2-50+sin(frameCount*0.1)*100;
    console.log(height/2-20+sin(frameCount*0.1)*70);
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x,this.y_wrapper);
      
    //cupcake wrapper
    fill(135, 230, 228);
    noStroke();
    rect(50-100,130-100,100,65);
    fill(206, 242, 241);
    circle(140-100,150-100,15)
    circle(120-100,150-100,15)
    circle(100-100,150-100,15)
    circle(80-100,150-100,15)
    circle(60-100,150-100,15)
    circle(70-100,167-100,15)
    circle(90-100,167-100,15)
    circle(110-100,167-100,15)
    circle(130-100,167-100,15)
    circle(60-100,185-100,15)
    circle(80-100,185-100,15)
    circle(100-100,185-100,15)
    circle(120-100,185-100,15)
    circle(140-100,185-100,15)

    pop();

    push();
    translate(this.x,this.y_frosting);
   
    //frosting
    strokeWeight(20);
      stroke(219, 159, 237);
    line(40-100,130-100,160-100,130-100);
      stroke(190, 138, 222);
    line(45-100,110-100,155-100,110-100);
      stroke(219, 159, 237);
    line(55-100,90-100,145-100,90-100);
      stroke(190, 138, 222);
    line(65-100,70-100,135-100,70-100);
      stroke(219, 159, 237);
    line(75-100,50-100,125-100,50-100);
    pop();
   
    
    push();
    translate(this.x,this.y_cherry);
    //cherry
    strokeWeight(0);
    fill(235, 33, 93);
    circle(0,-70,35);
    
    pop();

  //sprinkles
    //red
    push();
    translate(this.x,this.y_frosting);
    stroke(231,4,90);
    strokeWeight(8);
    line(115-100,60-100,130-100,70-100);
    
    //blue
    stroke(95, 147, 240);
    strokeWeight(8);
    line(70-100,80-100,90-100,70-100);
    
    //yellow
    stroke(238, 240, 93);
    strokeWeight(8);
    line(145-100,90-100,130-100,100-100);
    
    //green
    stroke(84, 214, 149);
    strokeWeight(8);
    line(70-100,120-100,50-100,130 -100);
    
    //pink
    stroke(237, 64, 203);
    strokeWeight(8);
    line(130-100,120-100,150-100,130-100);
    
    //orange
    stroke(252, 170, 38);
    strokeWeight(8);
    line(60-100,100-100,90-100,110-100);
    
    //face
    noStroke();
    fill(60);
    ellipse(80-100,100-100,20,25);
    ellipse(120-100,100-100,20,25);
    fill(250);
    ellipse(80-100,95-100,10,10);
    ellipse(120-100,95-100,10,10);
    ellipse(77-100,105-100,5,5);
    ellipse(123-100,105-100,5,5);
    arc(100-100,120-100, 20, 20, 0, PI); //smile
  
    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/