var PLAY = 1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var END = 0;
var gameState = PLAY;
var ground,  groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.07;
  
  ground = createSprite(200,180,700,20);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
 
  
  restart = createSprite(300,140);
  
  
 
  
  
  obstacleGroup = createGroup();
  FoodGroup= createGroup();
  
    monkey.setCollider("circle",30,10,5);

    monkey.debug = false;
  
  score = 0;
  
}

function draw() {
  
  background(180);
  
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
if(keyDown("space")&&   monkey.y >= 100) {  
      monkey.velocityY = -12;
    }
   
      monkey.velocityY =   monkey.velocityY + 0.8
    spawnfood();
  
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
      
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
    
     
     
      ground.velocityX = 0;
        monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);  
     
  if(mousePressedOver(restart)) {
      reset();
    }
   }
  monkey.collide(ground);
  

  


  drawSprites();
}

function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  score=score+Math.round(getFrameRate()/60);
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
    obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImage);
   obstacleGroup.add(obstacle);
   obstacle.scale=0.08;
 }
    
}

function spawnfood() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
   banana = createSprite(600,120,40,10);
  banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.04;
     banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}


