
import React, { Component, PropTypes, useState } from 'react';
import Dino from "../assets/images/DinoSprites-doux.png"
import BG from "../assets/images/image.jpg"
// import BG from "../assets/images/dungeon.png"
import { Redirect } from "react-router-dom";
import { style } from "../../utils/theme"



// import keyPressManager from './utils/keyPressManager';
export default class Canvas extends Component {

    state = {
        changeRoom: false
    }
    
     //ANIMATION=========================================
componentDidMount() {
    this.updateCanvas();
}

updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');

    let imageObj = new Image();
    imageObj.src = Dino 


    let imageObj2 = new Image();
    imageObj2.src = Dino 


    //KEY COMMANDS================================================
    
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
            case 32:
                spacePressed = true;
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

    let lastMove = 0 //<<====numbers to be passed as identifiers for conditionals or switches

    //position of PLayer(drawframe) on canvas
    let canvasX = 600;
    let canvasY = 610;
    // let enemyX = 100
    // let enemyY = 200
    //COMBAT STUFF=======================
    let hurt = 0
    let playerHurt = false
    let playerHurtLength = 0
    let attackLength = 0
    let attackBuild = 0
    let playerHealth = 100

    //spoofer =======================
    function frameRateSpoof(nums){
        const frameOutput = []
        nums.forEach(element => {
            for(let i = 0; i < 15; i++){
                frameOutput.push(element)
            }
        });
    
        return frameOutput
    
    };
    //animation frames====================================
        const rightAnimate = frameRateSpoof([4,5,6,7,8,9])
        const leftAnimate =  frameRateSpoof([43,42,41,40,39,38])
        const baseRightAnimate = frameRateSpoof([0,1,2,3])
        const baseLeftAnimate = frameRateSpoof([47,46,45,44])
        const attackRight = frameRateSpoof([10,11,12,13])
        const attackLeft = frameRateSpoof([37,36,35,34])
        const hurtAnimateRight = frameRateSpoof([14,15,16])
        const hurtAnimateLeft = frameRateSpoof([33,32,31])
    //  (enemyX, enemyY, img, width, height, scale, HP, ATK, EXP)
    //starting position for other entity(entities)
    let enemyAnimation = []
    let animation = []

    class Enemy{
        constructor(enemyX, enemyY, scale){
            this.enemyX = enemyX;
            this.enemyY = enemyY;
            this.img = imageObj2;
            this.width = 24;
            this.height = 24;
            this.scale = scale
            this.HP = 100;
            this.ATK = 1;
        }
           
        drawFrame2(frameX, frameY) {
            ctx.drawImage(this.img,
                          frameX * this.width, frameY * this.height, this.width, this.height,
                          this.enemyX, this.enemyY, this.scale*this.width, this.scale*this.width);
        }
        step2 = () => {
            
            let distanceX = canvasX - this.enemyX 
            let distanceY = canvasY - this.enemyY
            let unitVector =(Math.sqrt((Math.pow(distanceX,2)+Math.pow(distanceY,2))))
            if(Math.abs(unitVector) <= 15){
                animation = baseRightAnimate
                attackBuild++
                if(attackBuild===100){
                    playerHurt = true
                    playerHealth-=20
                    console.log(playerHealth)
                    attackBuild = 0
                }
            }else{
                if(distanceX > 24 ){
                   
                    enemyAnimation = rightAnimate
                }
                else if(distanceX < -24){
                    
                    enemyAnimation = leftAnimate
                }
                this.enemyX+=(distanceX/(2*unitVector))
                this.enemyY+=(distanceY/(2*unitVector))
            }  
            
                
                
            setTimeout(() => {
                requestAnimationFrame(this.step2)
            }, 10);
            }
            
        
        
    }
    const enemy = new Enemy(0, 0, 1)
    const enemy2 = new Enemy(200, 300, 1)

    


   
    //draws main character (player)==================
    function drawFrame(img, frameX, frameY) {
        ctx.drawImage(img,
                      frameX * width, frameY * height, width, height,
                      canvasX, canvasY, scaledWidth, scaledHeight);
    }
        

    //basic animation function===================================
    function move(cycleLoop, cycleLoop2){
        drawFrame(imageObj,cycleLoop[currentLoopIndex], 0, 0, 0); 
        enemy.drawFrame2(cycleLoop2[currentLoopIndex], 0, 0, 0);
        enemy2.drawFrame2(cycleLoop2[currentLoopIndex], 0, 0, 0);
        currentLoopIndex++;
        if (currentLoopIndex >= cycleLoop.length) {
          currentLoopIndex = 0;
        }
    }

        

        //============movement functions======================
            
        //move right function
        function right(){
            animation = rightAnimate
            lastMove=0
            canvasX += 2;
            if(upPressed){
                canvasY -= 2;
            }
            else if(downPressed){
                canvasY += 2;
            }
            
        }
        //move left function
        function left(){
            animation = leftAnimate
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
                animation = rightAnimate
            }else{
                animation = leftAnimate
            }
        
            canvasY += 2;
        }
        //move up function
        function up(){
            if(lastMove===0){
                animation = rightAnimate
            }else{
               animation = leftAnimate
            }
            canvasY -= 2;
        }
        function attack(){
            if(rightPressed){
                lastMove=0
                canvasX += 2;
                if(upPressed){
                    canvasY -= 2;
                }
                else if(downPressed){
                    canvasY += 2;
                }
            }
            else if(leftPressed){
                lastMove = 1
                canvasX -= 2;
                if(upPressed){
                    canvasY -= 2;
                }
                else if(downPressed){
                    canvasY += 2;
                }
            }
            else if(upPressed){
                canvasY -= 2
            }
            else if(downPressed){
                canvasY +=2
            }
            attackLength++
                if(lastMove===0){
                    animation = attackRight
                }else{
                    animation = attackLeft
                }
                if(attackLength===60){
                    spacePressed = false
                    attackLength = 0
                }
        }


    //function for directing rendering by keypress======(character movement/collision/behavior) Step 1 
    const step = () => {

        if ((canvasX > 560 && canvasX<720 )&& canvasY < 90) {
           this.setState({changeRoom: true});
        };

        frameCount++;
             if (frameCount <1) {
             window.requestAnimationFrame(step);
             return;
             }
            frameCount = 0;
            ctx.clearRect(0, 0, 1200, 720);
        if(playerHurt == true){
            playerHurtLength++
            switch(lastMove){
                case 0 : animation = hurtAnimateRight
                break;
                case 1 : animation =  hurtAnimateLeft
                break;
            
            }
            if(playerHurtLength == 45){
                playerHurt = false
                playerHurtLength = 0
            }
        }else{

        
        switch(true){
            case spacePressed:
                attack()
            break
            case rightPressed:

                if(canvasX >= 1100) {

                    animation = rightAnimate
                    canvasX -= 6;
                //===================
                }
                else if(canvasY <= 80) {
                    animation = rightAnimate
                    canvasY += 6;
                    canvasX += 2;
                }
                else if(canvasY >= 610) {
                    animation = rightAnimate
                    canvasY -= 6;
                    canvasX += 2;
                }
                else{
                    right()
                }
            break;
            case leftPressed:

                if(canvasX <=80){

                    animation = leftAnimate
                    canvasX += 6;
                //===================
                }
                else if(canvasY <= 80) {
                    animation = leftAnimate
                    canvasY += 6;
                    canvasX -= 2;
                }
                else if(canvasY >= 610) {
                    animation = leftAnimate
                    canvasY -= 6;
                    canvasX -= 2;
                }
                else{
                    left()
                }   
            break;
            case downPressed:
                if(canvasY >= 610){
                    if(lastMove===0){
                        animation = rightAnimate
                        canvasY -= 6;
                    }else{
                        animation = leftAnimate
                        canvasY -= 6;
                    }
                }else{
                down()
                }
            break;
            case upPressed:
                if(canvasY <=80){
                    if(lastMove===0){
                        animation = rightAnimate
                        canvasY += 6;
                    }else{
                        animation = leftAnimate
                        canvasY += 6;
                    }
    
                }else{
                    up()
                }
            break;
            default:
                if(lastMove===0){
                   animation = baseRightAnimate
                }else{
                   animation = baseLeftAnimate
                }
            }}
        move(animation, enemyAnimation)
        setTimeout(() => {
            window.requestAnimationFrame(step)
        }, 10);
        
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

    const styles = {
        backgroundImage: "url(" + BG + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }

    return (
        <div style={style.body}>
        <canvas ref="canvas" className="mt-4 mb-4"
        width={1200} height={720} 
        style={styles}></canvas>
        {this.state.changeRoom ? <Redirect to="/harmony/bossroom"/> : <Redirect to="/harmony/level3" />}
        </div>
        

    );
 }
};
