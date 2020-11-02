var climber, climberImg;
var door, doorImg;
var tower, toweImg;
var ghost, ghostImg;
var doorsGrp, climbersGrp;
var invisibleBlock, invisibleBlockGrp;
var gameState = "play";
var spookySound;

function preload()
{
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  // spookySound = loadSound("spooky.wav.mp3");
  
}

function setup()
{
  createCanvas(600,600);

  
  //creating the tower
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  
  //creating the ghost
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
    
  //making the groups for doors and climbers
  doorsGrp = new Group();
  climbersGrp = new Group();
  invisibleBlockGrp = new Group();
    
   
}

function draw()
{
  background(0);
  
  if(gameState === "play")
  {
       //adding the movement of ghost
    if(keyDown("left_arrow"))
      {
        ghost.x = ghost.x -3; 
      }

    if(keyDown("right_arrow"))
      {
        ghost.x = ghost.x +3;
      }

    if(keyDown("space"))
      {
        ghost.velocityY = -10;
      }
    
   if(keyDown("up_arrow"))
      {
        ghost.y = ghost.y -3;
      }
    
    //adding gravity
    ghost.velocityY = ghost.velocityY + 0.8;

    //making tower in a loop 
    if(tower.y > 400)
      {
        tower.y = 300;
      }
      
  //function call
  spawnDoors();
    
    //condition to stop the ghost when it touches the climbers group.
    if(climbersGrp.isTouching(ghost))
      {
        ghost.velocityY = 0;        
      }
    
    if(invisibleBlockGrp.isTouching(ghost) && ghost.y > 600 )
    {
      ghost.destroy();
      gameState = "end";
    }
    drawSprites();
  }
  
  
  
  if (gameState === "end")
  {
    
    text("Game Over", 230,250)
  }

}


//creating function for spawning doors
function spawnDoors()
{
  if(frameCount % 240 === 0)
    {
      var door = createSprite(200,-50);
      var climber = createSprite(200,10);
      var invisibleBlock = createSprite(200,50);
      invisibleBlock.width = climber.width;
      invisibleBlock.height = 2;

      //generating random doors
      door.x = Math.round(random(120,400));
      climber.x = door.x;
      invisibleBlock.x = door.x;
      
      //adding door and climber images
      door.addImage(doorImg);
      climber.addImage(climberImg);
      
      //giving velocity for door, climber and invisible block
      door.velocityY = 1;
      climber.velocityY = 1;
      invisibleBlock.velocityY = 1;
      
      //to move the ghost over the door
      ghost.depth = door.depth;
      ghost.depth = ghost.depth + 1;
      
      //assign lifetime to the variable
      door.lifetime = 800;
      climber.lifetime = 800;
      invisibleBlock.lifetime = 800;
      
      //add each door to the group
      doorsGrp.add(door);
      invisibleBlock.debug = false;
      climbersGrp.add(climber);
      invisibleBlockGrp.add(invisibleBlock);
    }
  
  
}

  