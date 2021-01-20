import React, { Component, PropTypes, useState } from 'react';
import Dino from "./public/assets/DinoSprites-doux.png"
export default class Canvas extends Component {
    
     //ANIMATION=========================================
componentDidMount() {
    this.updateCanvas();
}

updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');


    let imageObj1 = new Image();
    imageObj1.src = Dino 



    var imageObj2 = new Image();
    imageObj2.src = Dino 


    //key commands================================================
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    let spacePressed = false
    function keyDownHandler(event) {
        switch (event.keyCode) {
            case 68:
                rightPressed = true;
            break;
            case 65:
                leftPressed = true;
            break;
            case 83:
                downPressed = true;
            break;
            case 87:
                upPressed = true;
            break;
        }
    }
    function keyUpHandler(event) {
        switch (event.keyCode) {
            case 68:
                rightPressed = false;
            break;
            case 65:
                leftPressed = false;
            break;
            case 83:
                downPressed = false;
            break;
            case 87:
                upPressed = false;
            break;
        }
    }

    const scale = 1.5;
    const width = 24;
    const height = 24;
    const scaledWidth = scale * width;
    const scaledHeight = scale * height;
    let canvasX = 600;
    let canvasY = 200;
    let enemyX = 200
    let enemyY = 300

    let currentLoopIndex = 0;
    let frameCount = 0;
    let lastMove = 0 //<<====numbers to be passed as identifiers for conditionals or switches

    




    //draws main character (player)==================

    function drawFrame(img, frameX, frameY) {
        ctx.drawImage(img,
                      frameX * width, frameY * height, width, height,
                      canvasX, canvasY, scaledWidth, scaledHeight);
    }

    //potetntially will draw all other entities===================
    function drawFrame2(img,frameX, frameY) {
        ctx.drawImage(img,
                      frameX * 24, frameY * 24, 24, 24,
                      enemyX, enemyY, 24, 24);
    }

    //spoofs cycleloops for better framerate============ << needs tuning for different monitors
    function frameRateSpoof(nums){
        const frameOutput = []
        nums.forEach(element => {
            for(let i = 0; i < 15; i++){
                frameOutput.push(element)
            }
        });
    
        
        return frameOutput
    
    };


    //stored framecycles for specific animations===================

        const rightAnimate = frameRateSpoof([4,5,6,7,8,9])
        const leftAnimate =  frameRateSpoof([43,42,41,40,39,38])
        const baseRightAnimate = frameRateSpoof([0,1,2,3])
        const baseLeftAnimate = frameRateSpoof([47,46,45,44])
        const attackRight = frameRateSpoof([9,10,11,12])
        const attackLeft = frameRateSpoof([37,36.35,34])

    //basic animation function===================================
        function move(cycleLoop){
            drawFrame(imageObj,cycleLoop[currentLoopIndex], 0, 0, 0);
            drawFrame2(imageObj2,frameRateSpoof([0,1,2,3])[currentLoopIndex],0,0,0)
            

            
            currentLoopIndex++;
            if (currentLoopIndex >= cycleLoop.length) {
              currentLoopIndex = 0;
            }
        }

        //============movement functions======================
            
        //move right function
        function right(){
            move(rightAnimate)

            lastMove=0
            canvasX += 2;
            if(upPressed){
                canvasY -= 2;
            }
            else if(downPressed){
                canvasY += 2;

            }
            else if(spacePressed){
            }
        }
        //move left function
        function left(){
            move(leftAnimate)
            lastMove = 1
            canvasX -= 2;
            if(upPressed){
                canvasY -= 2;
            }
            else if(downPressed){
                canvasY += 2;
            }

        }
        //move down function
        function down(){
            if(lastMove===0){
                move(rightAnimate)
            }else{
                move(leftAnimate)
            }
        
            canvasY += 2;
        }
        //move up function
        function up(){
            if(lastMove===0){
                move(rightAnimate)
            }else{
                move(leftAnimate)
            }
            canvasY -= 2;
            

        }
        


    //function for directing rendering by keypress======(character movement/collision/behavior)
    function step() {
        frameCount++;
             if (frameCount <1) {
             window.requestAnimationFrame(step);
             return;
             }
            frameCount = 0;
            ctx.clearRect(0, 0, 1650, 590);
        switch(true){
            case rightPressed:
                if(canvasX >=1620 || canvasY <= 0 || canvasY >= 560){
                    move(rightAnimate)
                //===================
                }else{
                    right()
                }
            break;
            case leftPressed:
                if(canvasX <=0 || canvasY <= 0 || canvasY >= 560){
                    move(leftAnimate)
                //===================
                }else{
                    left()
                }   
            break;
            case downPressed:
                if(canvasY >= 560){
                    if(lastMove===0){
                        move(rightAnimate)
                    }else{
                        move(leftAnimate)
                    }
                }else{
                down()
                }
            break;
            case upPressed:
                if(canvasY <=0){
                    if(lastMove===0){
                        move(rightAnimate)
                    }else{
                        move(leftAnimate)
                    }
    
                }else{
                    up()
                }
            break;
            default:
                if(lastMove===0){
                    move(baseRightAnimate)
                }else{
                    move(baseLeftAnimate)
                }

        }
        window.requestAnimationFrame(step)
    }




    //function for enemy behavior====================
    function step2() {
        let distanceX = canvasX - enemyX 
        let distanceY = canvasY - enemyY
        let unitVector =(Math.sqrt((Math.pow(distanceX,2)+Math.pow(distanceY,2))))
        if(Math.abs(unitVector)<=35){
        
        }else{
            enemyY+=(distanceY/(2*unitVector))
            enemyX+=(distanceX/(2*unitVector))

        }
        

        

    function step() {
        frameCount++;
             if (frameCount < 5) {
             window.requestAnimationFrame(step);
             return;
             }
            frameCount = 0;
            ctx.clearRect(0, 0, 1800, 800);

    
            
            move(baseRightAnimate)
    
        window.requestAnimationFrame(step2);
            


            switch (true) {
                case rightPressed:
                    if(canvasX >=1620 || canvasY <= 0 || canvasY >= 560){
                        move(rightAnimate)
                    //===================
                    }else{
                        right()
                    }
                break;
                case leftPressed:
                    if(canvasX <=0 || canvasY <= 0 || canvasY >= 560){
                        move(leftAnimate)
                    //===================
                    }else{
                        left()
                    } 
                break;
                case upPressed:
                    if(canvasY <=0){
                        if(lastMove===0){
                            move(rightAnimate)
                        }else{
                            move(leftAnimate)
                        }
        
                    }else{
                        up()
                    }
                break;
                case downPressed:
                    if(canvasY >= 560){
                        if(lastMove===0){
                            move(rightAnimate)
                        }else{
                            move(leftAnimate)
                        }
                        
                    }else{
                    down()
                    }
                break;
                default:
                    if(lastMove===0){
                        move(baseRightAnimate)
                    }else{
                        move(baseLeftAnimate)
                    }
            }

        // 
        //
        // else if(spacePressed) {
        //     if(rightPressed){
        //         canvasX += 2;
        //     }
        //     else if(leftPressed){
        //         canvasX -=2
        //     }
        //     else if(upPressed){
        //         canvasY += 2;
        //     }
        //     else if(downPressed){
        //         canvasY -=2
        //     }
        //     if(lastMove===0){
        //         move(rightAnimate)
        //     }else{
        //         move(leftAnimate)
        //     }
        // }
        
        
        window.requestAnimationFrame(step);

    }
    // function step2() {
        
    //     const distanceX = canvasX - enemyX 
    //     const distanceY = canvasY - enemyY  
    //     const unitVector =(Math.sqrt((Math.pow(distanceX,2)+Math.pow(distanceY,2))))
    //     if(Math.abs(unitVector)<=35){
        
    //     }else{
    //         enemyY+=(distanceY/(2*unitVector))
    //         enemyX+=(distanceX/(2*unitVector))
    //     }
            
        
        
        
    //     frameCount++;
    //         // if (frameCount < 1) {
    //         // window.requestAnimationFrame(step2);
    //         // return;
    //         // }
    //         frameCount = 0;
    //         ctx.clearRect(0, 0, 1800, 800);
    
            
    //         move(baseRightAnimate)
    
    //     window.requestAnimationFrame(step2);
            
    // }
    

    //calls first animation loop=================
    function init() {

        requestAnimationFrame(step2)
        requestAnimationFrame(step);
        

        
    }
        
        

        
        
    
    //calls init(for second onload)
    imageObj.onload = function() {

        // window.requestAnimationFrame(step2)
        window.requestAnimationFrame(step);
        
    }

    imageObj1.onload = function() {

        init();
    }

}}
render() {
    return (

        
        <canvas ref="canvas" width={1650} height={590} style={{backgroundColor:"lightgray"}}></canvas>


    );
 }
};

//     const ctx = document.querySelector('canvas').getContext('2d');
//     document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener('keyup', keyUpHandler, false);

// let rightPressed = false;
// let leftPressed = false;
// let upPressed = false;
// let downPressed = false;
// let spacePressed = false

// function keyDownHandler(event) {
//     if(event.keyCode == 68) {
//         rightPressed = true;
//     }
//     else if(event.keyCode == 65) {
//         leftPressed = true;
//     }
//     else if(event.keyCode == 83) {
//     	downPressed = true;
//     }
//     else if(event.keyCode == 87) {
//     	upPressed = true;
//     }
//     else if(event.keyCode == 32){
//         spacePressed = true
//     }
// }
// function keyUpHandler(event) {
//     if(event.keyCode == 68) {
//         rightPressed = false;
//     }
//     else if(event.keyCode == 65) {
//         leftPressed = false;
//     }
//     else if(event.keyCode == 83) {
//     	downPressed = false;
//     }
//     else if(event.keyCode == 87) {
//     	upPressed = false;
//     }
// }

//     let imageObj1 = new Image();
//     imageObj1.src = Dino 


//     const scale = 2;
//     const width = 24;
//     const height = 24;
//     const scaledWidth = scale * width;
//     const scaledHeight = scale * height;

//     function drawFrame(img, frameX, frameY, canvasX, canvasY) {
        
//     }

//     const scale = 2;
//     const width = 24;
//     const height = 24;
//     const scaledWidth = scale * width;
//     const scaledHeight = scale * height;

//     function drawFrame(img, frameX, frameY, canvasX, canvasY) {
        
//     }



// function Player(){
//     const [lastMove, setLastMove] = useState(0) //<<====numbers to be passed as identifiers for conditionals or switches
//     const [animation, setAnimation] = useState(0) //<<====numbers to be passed as identifiers for conditionals or switches
//     const [positionX, setPositionX]=useState(0)
//     const [positionY, setPositionY]=useState(0)



// //=================Keycontrol stuff================
//     function move(){
//         if(rightPressed){
//             setPositionX(positionX+2)
//             setLastMove(0)
//         }
//         if(leftPressed){
//             setPositionX(positionX-2)
//             setLastMove(1)
//         }
//         if(upPressed){
//             setPositionY(positionY+2)
//         }
//         if(downPressed){
//             setPositionY(positionY-2)
//         }
//     console.log(positionX, positionY)
// //===============
//     }
//     function render(animation, positionX, positionY){
//         const clear
        

//         function draw(img, frameX, frameY){
//             ctx.drawImage(img,
//                 frameX * width, frameY * height, width, height,
//                 positionX, positionY, scaledWidth, scaledHeight);
//         }
//         if(animation == 0){
//             draw(attackAnimate, positionX, positionY)
//         }
//         if(animation == 1){
//             draw(rightAnimate, positionX, positionY)
//         }

//         if(animation == 2){
//             draw(leftAnimate, positionX, positionY)
//         }
//         if(animation == 3){
//             draw(upAnimate, positionX, positionY)
//         }
//         if(animation == 4){
//             draw(downAnimate, positionX, positionY)
//         }else{
//             if(lastMove == 0){
//                 baseRightAnimate()
//             }
//             if(lastMove == 1){
//                 baseLeftAnimate()
//             }
//         }

//     }

    
// }


//possible width and height for render