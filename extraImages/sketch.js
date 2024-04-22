
let img;
let camera;
function preload(){
  img = loadImage("assets/hokusai.jpg");
}
function setup() {
  let canvas = createCanvas(600, 404);
  canvas.parent("p5-canvas-container");
  camera = createCapture(VIDEO);
  camera.hide();
  background(255);
}

function draw() {
  //image(camera, 0,0);

  image(img, 0, 0, width, height);
  //PIXEL OF IMAGE 
  for(let n=0; n<10; n++){
    let x = random(width);
    let y = random(height);
    let c = img.get(x,y);
    fill(c);
    noStroke();
    circle(x, y, random(1,30));
  }
}