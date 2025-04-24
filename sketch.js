var trex,trex_run ;
var ground_img,ground;
var invisible_ground;
var cloud_img,cloud;
var obstacle_img1,obstacle_img2,obstacle_img3,obstacle_img4,obstacle_img5,obstacle_img6,obstacle;
var game_over_img,game_over;
var restart_img,restart;

var cloud_group,obstacle_group; 

var gameState = "play";

var trex_colide_img ;

var score = 0;

var check_point , die , jump;

function preload(){
  trex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img = loadImage("ground2.png");
  cloud_img = loadImage("cloud.png");
  obstacle_img1 = loadImage('obstacle1.png');
  obstacle_img2 = loadImage('obstacle2.png');
  obstacle_img3 = loadImage('obstacle3.png');
  obstacle_img4 = loadImage('obstacle4.png');
  obstacle_img5 = loadImage('obstacle5.png');
  obstacle_img6 = loadImage('obstacle6.png');
  trex_colide_img = loadImage('trex_collided.png');
  game_over_img = loadImage('gameOver.png');
  restart_img = loadImage('restart.png');
  check_point = loadSound('checkPoint.mp3');
  die = loadSound('die.mp3');
  jump = loadSound('jump.mp3');



}

function setup(){
  createCanvas(600,200);
  
  // creating trex
 trex = createSprite(80,150,50,20);
 trex.addAnimation("dino_running",trex_run);
 trex.addImage('trex_colide', trex_colide_img);

  //adding scale and position to trex
 trex.scale = 0.5;
 trex.x = 50;

 //Ground Sprite
 ground = createSprite(300,180,600,10);
 ground.addImage("ground",ground_img)

 //Invisible Ground
 invisible_ground = createSprite(300,190,600,10);
 invisible_ground.visible = false;

 obstacle_group = createGroup();
 cloud_group = createGroup();
 
 trex.debug = false;
 trex.setCollider('circle',0,0,40);

 //game_over
 game_over = createSprite(300,70,10,10);
 game_over.addImage("gameOver",game_over_img);
 game_over.scale = 0.5;

 //restart
 restart = createSprite(300,110,10,10);
 restart.addImage("restart",restart_img);
 restart.scale = 0.5;
}


function draw(){
  //set background color 
  background(205);

  text("Score : "+ score , 480,20);

  if(gameState == "play"){
    if(keyDown("space") && trex.y >= 110){
      trex.velocityY = -10;
      jump.play();
    }
    trex.velocityY += 0.8;  
    
    if(score%100 == 0 && score > 0){
      check_point.play();
    }

    ground.velocityX = -(5+score/100);
    if(ground.x < 0 ){
      ground.x = ground.width/2;
    }

    spawn_cloud();
    spawn_obstacle();

    if(obstacle_group.isTouching(trex)){
      gameState = "end";
      die.play()
      trex.velocityY = -10;
      jump.play();

    
    
    }

    score += Math.round(frameCount/500);

    game_over.visible = false;
    restart.visible = false;

    trex.changeAnimation('dino_running',trex_run);

    

  }

  else{
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);

    trex.changeAnimation('trex_colide',trex_colide_img);

    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);

    game_over.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)){
      restart_game();
    }

  }
  
  
  
  //logging the y position of the trex

  
  //jump when space key is pressed
  
  
  
  //stop trex from falling down
  

  //ground move
  
  
  trex.collide(invisible_ground);

  drawSprites();
}

function spawn_cloud(){
  if(frameCount%60 === 0){
  cloud = createSprite(700,40,50,10);
  cloud.addImage(cloud_img);
  cloud.scale = 0.6;
  cloud.y = Math.round(random(20,60));

  cloud.velocityX = -3;

  cloud.lifetime = 250; // Saves Memory //Because cloud is spawning too much.

  cloud.depth = trex.depth;
  trex.depth += 1;

  cloud_group.add(cloud);
  }
}

function spawn_obstacle(){
  if(frameCount%60 == 0){
  obstacle = createSprite(700,170,10,10);
  var random_no = Math.round(random(1,6));
  switch(random_no){
    case 1:
      obstacle.addImage(obstacle_img1);
      break;
    case 2:
      obstacle.addImage(obstacle_img2);
      break;
    case 3:
      obstacle.addImage(obstacle_img3);
      break;
    case 4:
      obstacle.addImage(obstacle_img4);
      break;
    case 5:
      obstacle.addImage(obstacle_img5);
      break;
    case 6:
      obstacle.addImage(obstacle_img6);
      break;
  }
  obstacle.scale = 0.5;
  
  obstacle.velocityX = -(5+score/100);
  obstacle.lifetime = 250;

  obstacle_group.add(obstacle);
}
}

function restart_game(){
  gameState = "play";
  score = 0;
  game_over.visible = false;
  restart.visible = false;
  obstacle_group.destroyEach();
  cloud_group.destroyEach();
}




//Bugs
//If space bar is holded than trex will be in space
// trex sprite has some white portion