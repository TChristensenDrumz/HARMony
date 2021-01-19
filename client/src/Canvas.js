
import React, { Component, PropTypes } from 'react';
import Dino from "./public/assets/DinoSprites-doux.png"
export default class Canvas extends Component {

   
    
    //ANIMATION=========================================
    
  
    
    
    
    
    
componentDidMount() {
    this.updateCanvas();
}

updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');

    var imageObj1 = new Image();
    imageObj1.src = Dino 



    document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false
function keyDownHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = true;
    }
    else if(event.keyCode == 65) {
        leftPressed = true;
    }
    else if(event.keyCode == 83) {
    	downPressed = true;
    }
    else if(event.keyCode == 87) {
    	upPressed = true;
    }
    else if(event.keyCode == 32){
        spacePressed = true
    }
}
function keyUpHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = false;
    }
    else if(event.keyCode == 65) {
        leftPressed = false;
    }
    else if(event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 87) {
    	upPressed = false;
    }
}
    const scale = 2;
    const width = 24;
    const height = 24;
    const scaledWidth = scale * width;
    const scaledHeight = scale * height;
    let canvasX = 600;
    let canvasY = 200;
    let enemyX = 200
    let enemyY = 300
    function drawFrame(img,frameX, frameY) {
        ctx.drawImage(img,
                      frameX * width, frameY * height, width, height,
                      canvasX, canvasY, scaledWidth, scaledHeight);
    }
    function drawFrame2(img,frameX, frameY) {
        ctx.drawImage(img,
                      frameX * 24, frameY * 24, 24, 24,
                      enemyX, enemyY, 48, 48);
    }
    let currentLoopIndex = 0;
    let frameCount = 0;
    function frameRateSpoof(nums){
        const frameOutput = []
        nums.forEach(element => {
            for(let i = 0; i < 15; i++){
                frameOutput.push(element)
            }
        });
    
        
        return frameOutput
    
    };
    const rightAnimate = frameRateSpoof([4,5,6,7,8,9])
    const leftAnimate =  frameRateSpoof([43,42,41,40,39,38])
    const baseAnimate = frameRateSpoof([0,1,2,3])
    const attackRight = frameRateSpoof([9,10,11,12])
    const attackLeft = frameRateSpoof([37,36.35,34])
    function move(cycleLoop){
            drawFrame2(imageObj1,frameRateSpoof([0,1,2,3])[currentLoopIndex],0,0,0)
            drawFrame(imageObj1,cycleLoop[currentLoopIndex], 0, 0, 0);
            
            currentLoopIndex++;
            if (currentLoopIndex >= cycleLoop.length) {
              currentLoopIndex = 0;
            }
    }
    
    function step() {
        frameCount++;
            if (frameCount < 1) {
            window.requestAnimationFrame(step);
            return;
            }
            frameCount = 0;
            ctx.clearRect(0, 0, 1800, 800);
            if(rightPressed) {
                canvasX += 2;
                if(upPressed){
                    canvasY -= 2;
                }
                else if(downPressed){
                    canvasY += 2;
                }
                else if(spacePressed){
                }
                move(rightAnimate)
            }
            else if(leftPressed) {
                canvasX -= 2;
                if(upPressed){
                    canvasY -= 2;
                }
                else if(downPressed){
                    canvasY += 2;
                }
                move(leftAnimate)
            }
            else if(downPressed) {
            canvasY += 2;
                if(rightPressed){
                    canvasX += 2;
                }
                else if(leftPressed){
                    canvasX -=2
                }
                move(rightAnimate)
            }
            else if(upPressed) {
                canvasY -= 2;
                if(rightPressed){
                    canvasX += 2;
                }
                else if(leftPressed){
                    canvasX -=2
                }
                move(leftAnimate)
            }
            else{
                move(baseAnimate)
            }
            
        window.requestAnimationFrame(step);
        }
    function step2() {
     
        const distanceX = canvasX - enemyX 
        const distanceY = canvasY - enemyY  
        const unitVector =(Math.sqrt((Math.pow(distanceX,2)+Math.pow(distanceY,2))))
        if(Math.abs(unitVector)<=35){
    
        }else{
            enemyY+=(distanceY/(2*unitVector))
            enemyX+=(distanceX/(2*unitVector))
        }
            
        
        
        
        frameCount++;
            if (frameCount < 1) {
            window.requestAnimationFrame(step2);
            return;
            }
            frameCount = 0;
            ctx.clearRect(0, 0, 1800, 800);
    
            
            move(baseAnimate)
      
        window.requestAnimationFrame(step2);
        
    }
    
    function init() {
        
        window.requestAnimationFrame(step2)
        window.requestAnimationFrame(step);
        
    }
    imageObj1.onload = function() {
        init();
}

}
render() {
    return (


        <canvas ref="canvas" width={1800} height={800}> </canvas>

    );
 }
};




// function Player(){
//     const [moveRight, setRight] = useState(false)
//     const [moveLeft, setLeft] = useState(false)
//     const [moveUp, setUp] = useState(false)
//     const [moveDown, setDown] = useState(false)
//     const [positionX, setPositionX]=useState(0)
//     const [positionY, setPositionY]=useState(0)

//     const rightArr=[1,2,3]


//     function move(){
//         if(moveRight){
//             setPositionX(positionX+2)
//             render(rightArr, positionX, positionY)
//         }
//         if(moveLeft){
//             setPositionX(positionX-2)
//         }
//         if(moveUp){
//             setPositionY(positionY+2)
//         }
//         if(moveDown){
//             setPositionY(positionY-2)
//         }
        

//     }
//     function render(framesArr, positionX, positionY){
//         const clear
//         const draw

//     }

    
// }


//possible width and height for render