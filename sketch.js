var leftWall,rightWall,topWall;
var gameOver,restart;
var leftWallGroup,rightWallGroup;
var ball, ball_img;
var invisibleLeftEdge, invisibleRightEdge;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var wallSpeed=-4;

var score=0;


function preload(){
  ball_img = loadImage("redBall.png");
}

function setup() {
  createCanvas(400,500);

  ball=createSprite(200,100,10,10);
  ball.addImage(ball_img);
  ball.scale= 0.14;

  topWall=createSprite(200,0,400,5);
  topWall.visible= false;

  invisibleLeftEdge = createSprite(0,200,2,700);
  invisibleLeftEdge.visible = false;
  //invisibleLeftEdge.shapeColor = "black";

  invisibleRightEdge = createSprite(400,200,2,700);
  invisibleRightEdge.visible = false;
  //invisibleRightEdge.shapeColor = "black";

 leftWallGroup=new Group();
 rightWallGroup=new Group();

 ball.setCollider("circle", 0,0, 90);
 
}



function draw() {
  background(255)

  ball.collide(invisibleLeftEdge);
  ball.collide(invisibleRightEdge);
  // edges = createEdgeSprites();
  // ball.collide(leftEdge);
  // ball.collide(rightEdge);

  if(gameState===PLAY){

    ball.velocityY = 4;
  if(keyDown(LEFT_ARROW)){
    ball.x -= 8;
  }

  if(keyDown(RIGHT_ARROW)){
    ball.x += 8;
  }
   spawnWalls();
   scoring();

   if(leftWallGroup.isTouching(ball)){
     ball.collide(leftWallGroup);
     ball.setVelocity(0,0);
   }
  
   if(rightWallGroup.isTouching(ball)){
    ball.collide(rightWallGroup);
    ball.setVelocity(0,0);
  }

  if(ball.isTouching(topWall)){
     gameState=END;
     alert( "Score : "+score);
  }
  drawSprites();
}

if(gameState===END){
  leftWallGroup.setVelocityYEach(0);
  rightWallGroup.setVelocityYEach(0);

  leftWallGroup.setLifetimeEach(-1);
  rightWallGroup.setLifetimeEach(-1);

  drawSprites();
}
}





function spawnWalls(){
  
   
    if(frameCount%40===0){
      var randomWidth = random(50,300)
    leftWall= createSprite(randomWidth/2, 600, randomWidth,20);
    leftWall.shapeColor = "black";
    leftWall.velocityY = wallSpeed;
  
    rightWall=createSprite(randomWidth+40+(400-40-randomWidth)/2, leftWall.y, 400-40-randomWidth,20);
    rightWall.shapeColor = "black";
    rightWall.velocityY =leftWall.velocityY;


//Giving pipes lifetime.
//leftWall.lifetime= 350;
//rightWall.lifetime= 350;

// topPipe.depth=gameOver.depth;
// gameOver.depth=restart.depth;
// restart.depth=restart.depth+1;

// bottomPipe.depth=gameOver.depth;
// gameOver.depth=restart.depth;
// restart.depth=restart.depth+1;

//Creating food in between pipes at random positions.
// if(Math.round(random(1,6))%2===0){
// var food=createSprite(topPipe.x,randomHeight+random(20,170));
// food.addImage(foodImg);
// food.scale=0.2;
// food.velocityX=topPipe.velocityX;

// //Adding food in the food group.
// foodGroup.add(food);}

//Adding pipes in their groups.
leftWallGroup.add(leftWall);
rightWallGroup.add(rightWall);
}
 }


//}
// //Reset function.
// function reset(){
//   gameState=PLAY;
//   gameOver.visible = false;
//   restart.visible = false;
  
//    topPipeGroup.destroyEach();
//    bottomPipeGroup.destroyEach();
//    foodGroup.destroyEach();
  
//    bird.x=displayWidth/2-100;
//    bird.y=displayHeight/2;

//    score=0;
//    pipespeed=-4;
// }

//Creating a scoring function.
function scoring(){
 for(var i=0;i<leftWallGroup.length;i++){
   if(ball.y-leftWallGroup[i].y<=4 && ball.y-leftWallGroup[i].y>4+wallSpeed){

    //Increasing score by 1 if bird travels in between the pipes.
     score=score+1;
   }
   if(score%2===0)
   {
     wallSpeed=-2;
     leftWallGroup.setVelocityYEach(wallSpeed);
     rightWallGroup.setVelocityYEach(wallSpeed);
     
   }
 }
}