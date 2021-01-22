
import React, { Component, PropTypes, useState } from 'react';
import Dino from "../assets/sprites/DinoSprites-doux.png"
// import BG from "../assets/images/image.jpg"
import BG from "../assets/maps/pop/popHome.png"
import { Redirect } from "react-router-dom";
import { style } from "../../utils/theme"
import Stats from "../../components/Stats/Stats";



// import keyPressManager from './utils/keyPressManager';
export default class Canvas extends Component {

    state = {
        direction: "",
        roomChange: false
    };
    
     //ANIMATION=========================================
componentDidMount() {
    this.updateCanvas();
}

updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    //1.import images=====================
    let imageObj = new Image();
    imageObj.src = Dino 


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
    let canvasX = 583;
    let canvasY = 340;
    // let enemyX = 100
    // let enemyY = 200
    //COMBAT STUFF=======================
    let playerHurt = false
    let playerHurtLength = 0
    let attackLength = 0
    let playerHealth = 100

    //spoofer =======================
    function frameRateSpoof(nums){
        const frameOutput = []
        nums.forEach(element => {
            for(let i = 0; i < 5; i++){
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
        const attackRight = frameRateSpoof([10,11,11,11,12,13])
        const attackLeft = frameRateSpoof([37,36,36,36,35,34])
        const hurtAnimateRight = frameRateSpoof([14,14,15,15,16,16])
        const hurtAnimateLeft = frameRateSpoof([33,33,32,32,31,31])
    //  (enemyX, enemyY, img, width, height, scale, HP, ATK, EXP)
    //starting position for other entity(entities)
    let animation = []


    


   
    //draws main character (player)==================
    function drawFrame(img, frameX, frameY) {
        ctx.drawImage(img,
                      frameX * width, frameY * height, width, height,
                      canvasX, canvasY, scaledWidth, scaledHeight);
    }
        

    //basic animation function===================================
    //add in cycleLoop for each entity so they can have seperate animations
    function move(cycleLoop){
        drawFrame(imageObj,cycleLoop[currentLoopIndex], 0, 0, 0); 

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
                if(attackLength===30){
                    spacePressed = false
                    attackLength = 0
                }
        }


    //function for directing rendering by keypress======(character movement/collision/behavior)
    const step = () => {
        if ((canvasX >= 560 && canvasX <= 640) && canvasY <= 40) {
            this.setState({...this.state, direction: "top"});
            localStorage.setItem("direction", JSON.stringify(this.state));
           this.setState({...this.state, roomChange: true});
        } else if ((canvasX >= 560 && canvasX <= 640) && canvasY >= 620) {
            this.setState({...this.state, direction: "bottom"});
            localStorage.setItem("direction", JSON.stringify(this.state));
           this.setState({...this.state, roomChange: true});
        } else if (canvasX > 1100 && (canvasY >= 320 && canvasY <= 400)) {
            this.setState({...this.state, direction: "right"});
            localStorage.setItem("direction", JSON.stringify(this.state));
           this.setState({...this.state, roomChange: true});
        } else if (canvasX <= 80 && (canvasY >= 320 && canvasY <= 400)) {
            this.setState({...this.state, direction: "left"});
            localStorage.setItem("direction", JSON.stringify(this.state));
           this.setState({...this.state, roomChange: true});
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
                console.log(`X: ${canvasX}, Y: ${canvasY}`);
                attack();
            break;
            case rightPressed:

                if(canvasX >= 1124) {

                    animation = rightAnimate
                    canvasX -= 6;
                //===================
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
                //===================
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

            move(animation)

            //pass each entities animations into this function
            setTimeout(() => {
                window.requestAnimationFrame(step)
            }, 15);
           
            
            
        
        
        
    }

   
    
    

    //calls first animation loop=================
    //make sure all entities are called in here
    function init() {
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
        <div style={style.body} >
            <Stats score="100" health="60" /> 
        <canvas ref="canvas" className="mt-4 mb-4"
        width={1200} height={720} 
        style={styles}></canvas>
        {this.state.roomChange ? <Redirect to="/harmony/level1"/> : <Redirect to="/harmony" />}
        </div>
        

    );
 }
};

   
