
import React, { Component, PropTypes, useState } from 'react';
import Dino from "./public/assets/DinoSprites-doux.png"
// import keyPressManager from './utils/keyPressManager';
export default class Canvas extends Component {


    
     //ANIMATION=========================================
componentDidMount() {
    this.updateCanvas();
}

updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');

    var imageObj = new Image();
    imageObj.src = Dino 


    var imageObj2 = new Image();
    imageObj2.src = Dino 


    //KEY COMMANDS================================================
    
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
    
    
    //SETTING VRIABLES FOR RENDERING==========
    //scale of character
    const scale = 1.5;
    //width and height of spritesheet frame
    const width = 24;
    const height = 24;
    //self explanatory
    const scaledWidth = scale * width;
    const scaledHeight = scale * height;

    //starting variables for move function
    let currentLoopIndex = 0;
    let frameCount = 0;

    //SETTING "STATES"

    var lastMove = 0 //<<====numbers to be passed as identifiers for conditionals or switches

    //position of PLayer(drawframe) on canvas
    let canvasX = 600;
    let canvasY = 200;
    // let enemyX = 100
    // let enemyY = 200
    //  (enemyX, enemyY, img, width, height, scale, HP, ATK, EXP)
    //starting position for other entity(entities)

    class Enemy{
        constructor(enemyX, enemyY, scale){
            this.enemyX = enemyX;
            this.enemyY = enemyY;
            this.img = Dino;
            this.width = 24;
            this.height = 24;
            this.scale = scale
            this.HP = 100;
            this.ATK = 1;
        }
           
        drawFrame2(frameX, frameY) {
            ctx.drawImage(imageObj,
                          frameX * this.width, frameY * this.height, this.width, this.height,
                          this.enemyX, this.enemyY, this.scale*this.width, this.scale*this.width);
        }

        step2 = () => {
            let distanceX = canvasX - this.enemyX 
            let distanceY = canvasY - this.enemyY
            let unitVector =(Math.sqrt((Math.pow(distanceX,2)+Math.pow(distanceY,2))))
            if(Math.abs(unitVector)<=35){
            
            }else{
                this.enemyY+=(distanceY/(2*unitVector))
                this.enemyX+=(distanceX/(2*unitVector))
            }
                
            
            
            
            frameCount++;
                if (frameCount < 1) {
                window.requestAnimationFrame(this.step2);
                return;
                }
                frameCount = 0;
                ctx.clearRect(0, 0, 1800, 800);
        
                
                move(baseRightAnimate)
        
            window.requestAnimationFrame(this.step2);
                
        }
    }
    const enemy = new Enemy(100,200,1)
    const enemy2 = new Enemy(200,300,1)

    



    //draws main character (player)==================
    function drawFrame(img, frameX, frameY) {
        ctx.drawImage(img,
                      frameX * width, frameY * height, width, height,
                      canvasX, canvasY, scaledWidth, scaledHeight);
    }

    //potetntially will draw all other entities===================
    // function drawFrame2(img, frameX, frameY) {
    //     ctx.drawImage(img,
    //                   frameX * 24, frameY * 24, 24, 24,
    //                   enemyX, enemyY, 24, 24);
    // }

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
            enemy.drawFrame2(frameRateSpoof([0,1,2,3])[currentLoopIndex],0,0,0)
            enemy2.drawFrame2(frameRateSpoof([47,46,45,44])[currentLoopIndex],0,0,0)
            
            
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
    
    

    //calls first animation loop=================
    function init() {
        requestAnimationFrame(enemy.step2)
        requestAnimationFrame(enemy2.step2)
        requestAnimationFrame(step);
        
        
    }
        
        

        
        
    
    //calls init(for second onload)
    imageObj.onload = function() {
        init();
    }

}
render() {
    return (
        
        <canvas ref="canvas" width={1650} height={590} style={{backgroundColor:"lightgray"}}></canvas>

    );
 }
};
