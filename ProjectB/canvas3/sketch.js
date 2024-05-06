var colors;
var capture;
var trackingData;

let maskLayer;
let mySound;

let img;
function preload() {
  img = loadImage("img/image11.jpg");
  mySound = loadSound("sound/scribble.mp3");
}

function setup() {
  let canvas = createCanvas(640, 420);
  canvas.parent("p5-canvas");
  maskLayer = createGraphics(width, height);
  let constraints = {
    video: {
      mandatory: {
        maxWidth:640,
        maxHeight:420
      }
    }
  };
  capture = createCapture(constraints); //capture the webcam
  
  capture.position(0, 0); //move the capture to the top left
  capture.style("opacity", 0); // use this to hide the capture later on (change to 0 to hide)...
  capture.id("myVideo"); //give the capture an ID so we can use it in the tracker below.

  // colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
  colors = new tracking.ColorTracker(["yellow"]);

  tracking.track("#myVideo", colors); // start the tracking of the colors above on the camera in p5

  //start detecting the tracking
  colors.on("track", function (event) {
    //this happens each time the tracking happens
    trackingData = event.data; // break the trackingjs data into a global so we can access it with p5
  });
  background(255);
}

function draw() {
  
  //image(img, 0, 0, width, height);
  
  push();
  translate(width,0);
  scale(-1,1);

  // console.log(trackingData);
  if (trackingData) {
    //if there is tracking data to look at, then...

    for (var i = 0; i < trackingData.length; i++) {
      //loop through each of the detected colors
      // console.log( trackingData[i] )

      maskLayer.clear();
      // maskLayer.circle(trackingData[i].x,trackingData[i].y,trackingData[i].width*0.5);
      maskLayer.circle(trackingData[i].x, trackingData[i].y, 50);

      let newImg = createImage(img.width, img.height);

      newImg.copy(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        img.width,
        img.height
      );
      newImg.mask(maskLayer);
      //img.mask(maskLayer);
      image(newImg, 0, 0, width, height);

      if (mySound.isPlaying() == false) {
        mySound.play();
      } else {
        mySound.pause();
      }

      //circle(trackingData[i].x,trackingData[i].y,trackingData[i].width);
    }
  }
  pop();
}