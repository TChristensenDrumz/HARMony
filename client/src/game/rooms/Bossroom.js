import React, { Component, PropTypes, useState } from 'react';
import Dino from "../assets/sprites/DinoSprites-doux.png"
import BG from "../assets/maps/pop/popBossroom.png"
// import BG from "../assets/images/dungeon.png"
import { Redirect } from "react-router-dom";
import { style } from "../../utils/theme";
import Transition from "../../utils/Transition";



// import keyPressManager from './utils/keyPressManager';
export default class Canvas extends Component {

    state = {
        changeRoom: false,
        direction: "",
        canvasX: Transition.checkDirection().canvasX,
        canvasY: Transition.checkDirection().canvasY
    }
    
     //ANIMATION=========================================
componentDidMount() {
    this.updateCanvas();
    localStorage.removeItem("direction");
}

updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    //1.import images=====================
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
    let canvasX = this.state.canvasX;
    let canvasY = this.state.canvasY;
    // let enemyX = 100
    // let enemyY = 200
    //COMBAT STUFF=======================
    let playerHurt = false
    let playerHurtLength = 0
    let attackLength = 0
    let playerHealth = 100
    let beforeRoom = 0

    //spoofer =======================
    function frameRateSpoof(nums){
        const frameOutput = []
        nums.forEach(element => {
            for(let i = 0; i < 10; i++){
                frameOutput.push(element)
            }
        });
    
        return frameOutput
    
    };
    //animation frames====================================
        const rightAnimate = frameRateSpoof([4,5,6,7,8,9])
        const leftAnimate =  frameRateSpoof([43,42,41,40,39,38])
        const baseRightAnimate = frameRateSpoof([0,0,1,2,3,3])
        const baseLeftAnimate = frameRateSpoof([47,47,46,45,44,44])
        const attackRight = frameRateSpoof([10,10,11,12,13,13])
        const attackLeft = frameRateSpoof([37,37,36,35,34,34])
        const hurtAnimateRight = frameRateSpoof([14,14,15,15,16,16])
        const hurtAnimateLeft = frameRateSpoof([33,33,32,32,31,31])
    //  (enemyX, enemyY, img, width, height, scale, HP, ATK, EXP)
    //starting position for other entity(entities)
    let animation = []

    class Enemy{
        constructor(img, enemyX, enemyY, scale, enemyAnimation, HP,ATK, attackBuild){
            this.enemyX = enemyX;
            this.enemyY = enemyY;
            this.img = img;
            this.width = 24;
            this.height = 24;
            this.scale = scale
            this.enemyAnimation = enemyAnimation
            this.HP = HP;
            this.ATK = ATK;
            this.attackBuild = attackBuild;

        }
           
        drawFrame2(frameX, frameY) {
            ctx.drawImage(this.img,
                          frameX * this.width, frameY * this.height, this.width, this.height,
                          this.enemyX, this.enemyY, this.scale*this.width, this.scale*this.width);
        }
        step2 = () => {
            
            let distanceX = canvasX - this.enemyX 
            let distanceY = canvasY - this.enemyY
            let unitVector = Math.hypot(distanceX,distanceY)

            if(spacePressed && unitVector<=15){
                console.log(this.attackBuild)
                this.attackBuild++
                if(lastMove === 0 && distanceX < 0){
                    this.enemyAnimation = hurtAnimateLeft
                    this.HP -= 1
                }else if(lastMove === 1 && distanceX > 0){
                    this.enemyAnimation = hurtAnimateRight
                    this.HP -= 1
                }
                
            }else{
                if(unitVector <= 15){
                    console.log(this.attackBuild)
                    if(distanceX < 10){
                        this.enemyAnimation = attackLeft
                    }else{
                        this.enemyAnimation = attackRight
                    }
                    this.attackBuild+=5
                    if(this.attackBuild>=500){
                        
                        playerHurt = true
                        playerHealth-=this.ATK

                        this.attackBuild = 0
                    }
                }else{
                    if(distanceX > 0 ){
                       
                        this.enemyAnimation = rightAnimate
                    }
                    else if(distanceX < 0){
                        
                        this.enemyAnimation = leftAnimate
                    }
                    this.enemyX+=(distanceX/(2*unitVector))
                    this.enemyY+=(distanceY/(2*unitVector))
                }  

            }
            
            
                
            if(this.HP <= 0){
                this.enemyAnimation = []
                beforeRoom++
                console.log(beforeRoom)
            }else{
                setTimeout(() => {
                    requestAnimationFrame(this.step2)
                }, 10);
            }

        }
            
            
        
        
    }

    //construct enemies
    const boss = new Enemy(imageObj2, 583, 540, 5, [], 200, 25, 0)

    


   
    //draws main character (player)==================
    function drawFrame(img, frameX, frameY) {
        ctx.drawImage(img,
                      frameX * width, frameY * height, width, height,
                      canvasX, canvasY, scaledWidth, scaledHeight);
    }
        

    //basic animation function===================================
    //add in cycleLoop for each entity so they can have seperate animations
    function move(cycleLoop, cycleLoop2){
        drawFrame(imageObj,cycleLoop[currentLoopIndex], 0, 0, 0); 
        boss.drawFrame2(cycleLoop2[currentLoopIndex], 0, 0, 0);

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
        //player attack logic
        function attack(){
            if(rightPressed){
                lastMove=0
                if(canvasX >= 1124) {
                    canvasX -= 6;
                }
                if(upPressed){
                    if(canvasY <= 40) {
                        canvasY += 6;
                        canvasX += 2;
                    }
                    else {
                        canvasX += 2;
                        canvasY -= 2;
                    }
                }
                else if(downPressed){
                    if(canvasY >= 640) {
                        canvasY -= 6;
                        canvasX += 2;
                    }
                    else {
                        canvasX += 2;
                        canvasY += 2;
                    }
                }
                else {
                    canvasX += 2;
                }
            }
            else if(leftPressed){
                lastMove = 1
                if(canvasX <= 40) {
                    canvasX += 6;
                }
                if(upPressed){
                    if(canvasY <= 40) {
                        canvasY += 6;
                        canvasX -= 2;
                    }
                    else {
                        canvasX -= 2;
                        canvasY -= 2;
                    }
                }
                else if(downPressed){
                    if(canvasY >= 640) {
                        canvasY -= 6;
                        canvasX -= 2;
                    }
                    else {
                        canvasX -= 2;
                        canvasY += 2;
                    }
                }
                else {
                    canvasX -= 2;
                }
            }
            else if(upPressed){
                if(canvasY <= 40) {
                    canvasY += 6;
                }
                else {
                    canvasY -= 2
                }
            }
            else if(downPressed){
                if(canvasY >= 640) {
                    canvasY -= 6;
                }
                else {
                    canvasY += 2
                }
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


    //function for directing rendering by keypress======(character movement/collision/behavior)
    const step = () => {
        if(beforeRoom === 1){
            this.setState({roomChange: true});            
        }
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
                attack();
                break;
            case rightPressed:
                if(canvasX >= 1124) {
                    animation = rightAnimate
                    canvasX -= 6;
                }
                else if(canvasY <= 40) {
                    animation = rightAnimate
                    canvasY += 6;
                    canvasX += 2;
                }
                else if(canvasY >= 640) {
                    animation = rightAnimate
                    canvasY -= 6;
                    canvasX += 2;
                }
                else{
                    right()
                }
                break;
            case leftPressed:   
                if(canvasX <= 40){   
                    animation = leftAnimate
                    canvasX += 6;
                }
                else if(canvasY <= 40) {
                    animation = leftAnimate
                    canvasY += 6;
                    canvasX -= 2;
                }
                else if(canvasY >= 640) {
                    animation = leftAnimate
                    canvasY -= 6;
                    canvasX -= 2;
                }
                else{
                    left()
                }   
                break;
            case downPressed:
                if(canvasY >= 640){
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
                if(canvasY <= 40){
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
            if(playerHealth <= 0){
                animation = []
                return
            }

            move(animation, boss.enemyAnimation)

            //pass each entities animations into this function
            setTimeout(() => {
                window.requestAnimationFrame(step)
            }, 10);
            
            
        
        
        
    }

   
    
    

    //calls first animation loop=================
    //make sure all entities are called in here
    function init() {
        requestAnimationFrame(boss.step2)
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
        <div style={style.body} className="d-flex justify-content-center">
        <canvas ref="canvas" className="mt-4 mb-4"
        width={1200} height={720} 
        style={styles}></canvas>
        {this.state.roomChange ? <Redirect to="/harmony"/> : <Redirect to="/harmony/bossroom" />}
        </div>
        

    );
 }
};