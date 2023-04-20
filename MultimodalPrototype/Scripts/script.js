var gn = new GyroNorm();
let roll,pitch;

//GyroNorm Init
gn.init().then(function(){
  gn.start(function(data){
    
    roll = data.do.gamma;
    pitch = data.do.beta;
    
  });
}).catch(function(e){
  console.log("Not Supported");
});

// P5.Speech Init
let speach = new p5.SpeechRec('en-US', parseResult);
speach.continuous = true;
speach.interimResults = true;


//Main Code Starts Here
let paddleX,paddleY;
let tiltThreshold = 3;
let paddleSpeed = 2;

let score = 0;

let timerAngle = 0;

let ball;

function setup(){
  createCanvas(windowWidth, windowHeight);
  speach.onError = spitError;
  speach.start();

  paddleX = width/2;
  paddleY = height/2;

  ball = new Ball();
}

function draw(){
  //Background
  background(111, 133, 255);
  strokeWeight(15);
  stroke(255);
  line(0, 0, 0, height);
  line(0, 0, width, 0);
  line(0, height, width, height);
  line(width, 0, width, height);
  line(width/2, 0, width/2, height);

  stroke(0);
  
  //Move Paddle
  paddle(paddleX,paddleY)
  if ((roll > tiltThreshold) && (paddleX < width-40)){
    paddleX+=paddleSpeed;
  }else if ((roll < -tiltThreshold) && (paddleX > 40)){
    paddleX-=paddleSpeed
  }
  if ((pitch > tiltThreshold) && (paddleY < height-40)){
    paddleY+=paddleSpeed;
  }else if ((pitch < -tiltThreshold) && (paddleY > 40)){
    paddleY-=paddleSpeed;
  }

  //Ball
  ball.display();
  if (ball.alive){
    ball.riseAndFall();
    ball.move();
  }

  //Score
  noStroke();
  textAlign(CENTER,CENTER);
  textSize(45);
  textStyle(BOLD)
  fill(10);
  text("Score: " + score, width/2, 50);

  //Timer
  noFill();
  strokeWeight(10);
  stroke(0);
  arc(width-40,40,50,50,0,radians(timerAngle));
  
  noStroke();
  fill(0);
  textSize(15);
  text("POW",width-40,40)
  
  if (timerAngle < 360){
    timerAngle += 1;
  } else {
    timerAngle = 360;
  }

}

function paddle(x,y){
  rectMode(CENTER);
  strokeWeight(3);
  fill(140, 91, 0);
  rect(x, y+30, 20, 100);
  fill(255, 99, 99);
  arc(x, y, 80, 85, PI + 5,TWO_PI - 5, CHORD);
}

function parseResult(){
  var mostRecentWord = speach.resultString.split(' ').pop().toLowerCase();
  $('.output3').html(mostRecentWord);
  console.log(mostRecentWord);
  if(timerAngle == 360){
    if(mostRecentWord == "test"){timerAngle = 0;}
    else if(mostRecentWord.indexOf("yellow")!==-1){}
  }
}

function spitError(){
  console.log("Error");
}

