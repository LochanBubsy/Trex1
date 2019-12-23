var trex, trex_running;
var ground, groundImg;
var edges,Iground;
var clouds,cloudImg
var ob1,ob2,ob3,ob4,ob5,ob6
var score=0; 
var obsGroup,cloudGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var GO, RES
var Jump, Die, CP
var trexdie
var gameover,restart
    function reset(){
     gameState=PLAY
      obsGroup.destroyEach()
cloudGroup.destroyEach()
      trex.addAnimation("running",trex_running)
      gameover.visible=false
      restart.visible=false
      frameCount=0
    }
function spawnOBS()
{
 if(frameCount%60===0){
  var ob=createSprite(400,380,10,10) 
  ob.velocityX=-(5+3*score/100)
   ob.lifetime=80
   var r1=Math.round(random(1,6))
   ob.scale=0.449905
   ob.y=370
   switch(r1){
     case 1:ob.addImage("O1",ob1)
       break
       case 2:ob.addImage("O2",ob2)
       break
       case 3:ob.addImage("O3",ob3)
       break
       case 4:ob.addImage("O4",ob4)
       break
       case 5:ob.addImage("O5",ob5)
       break
       case 6:ob.addImage("O6",ob6)
       break
       default:break
   }
       obsGroup.add(ob);
       console.log(ob)
 }
}
function spawnClouds()
{
    if(frameCount%70===0)
    {
    cloud=createSprite(400,100,20,20)
    cloud.addImage("cImg",cloudImg)
    cloud.velocityX=-(2+3*score/100)
    rand=random(90,380)
    cloud.y=rand
    cloud.scale=0.7
      cloud.lifetime=200;
      //console.log(cloud.depth)
    trex.depth=cloud.depth+1
          console.log(cloud.depth)
      cloudGroup.add(cloud);
    }

     
}  


function preload()
{
    trex_running =                loadAnimation("trex1.png","trex3.png","trex4.png");
  Jump=loadSound("jump.mp3")
  Die=loadSound("die.mp3")
  CP=loadSound("checkPoint.mp3")
    groundImg=loadImage("ground2.png")
    cloudImg=loadImage("cloud.png")
 ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  GO=loadImage("gameOver.png");
  RES=loadImage("restart.png")
  trexdie=loadImage("trex_collided.png");
}

function setup() 
{
      createCanvas(400, 400);
  
      edges=createEdgeSprites();
  
      trex = createSprite(200,380,20,50);
      trex.addAnimation("running", trex_running);
      trex.scale = 0.5;
      trex.x=50
      trex.debug=true;
      trex.setCollider("circle",0,0,40);
      ground=createSprite(200,390,400,10)
      ground.addImage("gImg",groundImg)
      Iground=createSprite(200,395,400,5)
      Iground.visible=false
  
  gameover=createSprite(200,150,10,10);
  restart=createSprite(200,200,10,10);
  obsGroup=createGroup();
  cloudGroup=createGroup();
  gameover.addImage("R1",GO);
    gameover.scale=0.7
    restart.addImage("R2",RES);
    restart.scale=0.7
    
}
      

function draw() 
{
      background("black");
  text(score,300,100)
  if(mousePressedOver(restart)){
   reset()
  }
  if(gameState===PLAY)
  {
    gameover.visible=false
    restart.visible=false
    score=Math.round(frameCount/4);
    ground.velocityX=-(5+3*score/100)
    console.log(trex.y)
    if(keyDown("space")&&trex.y>=372.5) 
      {
      trex.velocityY = -10;
      Jump.play();
        
      }
  
      if(ground.x<0)
      {
       ground.x=ground.width/2
        //ground.y=390
        //ground.velocityX=-5
      }
  
      if(score>0&&score%100===0){
       CP.play(); 
      }

      trex.velocityY = trex.velocityY + 0.8
    spawnOBS();
      spawnClouds();
    if(obsGroup.isTouching(trex))
    {
     gameState=END;
      Die.play();
      trex.addImage("running",trexdie)
     // trex.velocityY=-12
    }
  }
  else if(gameState===END)
  {
   ground.velocityX=0; 
    obsGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameover.visible=true
    restart.visible=true
    
    
  trex.velocityY=0
  }
      //console.log(trex.y)
      
      trex.collide(Iground);
  
    
  
      
      drawSprites();
}