import React, { Component, PropTypes, useState } from 'react';
import Stats from "../components/Stats/Stats";
import Pause from "../components/Pause/Pause";
import { Redirect } from "react-router-dom";
import { style } from "../utils/theme";

//amount
//boss
//background
//music
//playerimg
//bossimg

let playerHealth = 100;

export default class Canvas extends Component {

    state = {
        roomChange: false,
        direction: '',
    }
    
     //ANIMATION=========================================
componentDidMount() {
    this.updateCanvas();
    localStorage.removeItem("direction");
}

updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    //1.import images=====================
    let player = new Image();
    player.src = this.props.player; 

    let imageObj2 = new Image();
    imageObj2.src = this.props.enemy;

    //KEY COMMANDS================================================
    
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    let spacePressed = false;
    let escPressed = false
    
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
            case 27:
                escPressed = !escPressed;
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
    
    
    let bossLevel = this.props.bossLevel;
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
    let canvasY = 300;
    // let enemyX = 100
    // let enemyY = 200
    //COMBAT STUFF=======================
    let playerHurt = false
    let playerHurtLength = 0
    let attackLength = 0
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
        const playerRightAnimate = frameRateSpoof([0,1,2,3,4,5,6,7])
        // const playerLeftAnimate =  frameRateSpoof([43,42,41,40,39,38])
        const playerBaseRightAnimate = frameRateSpoof([8,9,10,11,8,9,10,11])
        //const playerBaseLeftAnimate = frameRateSpoof([47,47,46,45,44,44])
        const playerAttackRight = frameRateSpoof([12,13,14,15,16,17,18,19])
        // const playerAttackLeft = frameRateSpoof([37,36,36,36,35,34])
        const playerHurtAnimateRight = frameRateSpoof([20,20,21,21,22,22,23,23])
        // const playerHurtAnimateLeft = frameRateSpoof([33,33,32,32,31,31])
        const rightAnimate = frameRateSpoof([4,5,6,7,8,9])
        const leftAnimate =  frameRateSpoof([43,42,41,40,39,38])
        const baseRightAnimate = frameRateSpoof([0,,1,2,,3])
        const baseLeftAnimate = frameRateSpoof([47,46,45,44])
        const attackRight = frameRateSpoof([10,11,12,13])
        const attackLeft = frameRateSpoof([37,36,35,34])
        const hurtAnimateRight = frameRateSpoof([14,15,16])
        const hurtAnimateLeft = frameRateSpoof([33,32,31])
    //  (enemyX, enemyY, img, width, height, scale, HP, ATK, EXP)
    //starting position for other entity(entities)
    let animation = []

    class Enemy{
        constructor(img, enemyX, enemyY, scale, enemyAnimation, HP,ATK, attackBuild, hitboxX, hitboxY, currentFrame, speed){
            this.enemyX = enemyX;
            this.enemyY = enemyY;
            this.img = img;
            this.width = 24;
            this.height = 24;
            this.scale = scale
            this.enemyAnimation = enemyAnimation;
            this.HP = HP;
            this.ATK = ATK;
            this.attackBuild = attackBuild;
            this.hitboxX = hitboxX;
            this.hitboxY = hitboxY;
            this.currentFrame = currentFrame;
            this.speed = speed;
            this.dead = false;

        }
           
        drawFrame2(frameX, frameY) {
            ctx.drawImage(this.img,
                          frameX * this.width, frameY * this.height, this.width, this.height,
                          this.enemyX, this.enemyY, this.scale*this.width, this.scale*this.width);
        }
        step2 = () => {
            if(this.dead) {
                return;
            }
            if(this.HP <= 0){
                playerHealth+=20
                this.enemyAnimation = []
                beforeRoom++
                this.dead = true;
                return
            }
            let distanceX = canvasX - this.enemyX - this.hitboxX
            let distanceY = canvasY - this.enemyY - this.hitboxY
            let unitVector = Math.hypot(distanceX, distanceY)

            if(spacePressed && unitVector <= 15){
                this.attackBuild+=10
                if(lastMove === 0 && distanceX < 0 ){
                    this.enemyAnimation = hurtAnimateLeft
                    this.HP -= 1
                }else if(lastMove === 1 && distanceX > 0){
                    this.enemyAnimation = hurtAnimateRight
                    this.HP -= 1
                }
                
            }else{
                if(unitVector <= 15){
                    if(distanceX < 0){
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
                    this.enemyX+=(distanceX/(this.speed*unitVector))
                    this.enemyY+=(distanceY/(this.speed*unitVector))
                }  
            }                                                    
        }
    }

    //construct enemies
    const enemies = [];
    let amount = this.props.enemyAmount;
    for (let i = 0; i < amount; i++) {
        const enemy = new Enemy(imageObj2,  Math.random()*1100, Math.random()*620, 1, [], 100, 10, 0, 0, 0, 0,2);
        enemies.push(enemy);
    };
     console.log(enemies)
    let BOSS = {};
    if(bossLevel){
        BOSS = new Enemy(imageObj2, 200, 300, 5, [], 1000, 50, 0, 20, 65, 0,4)
    }

    


   
    //draws main character (player)==================
    function drawFrame(img, frameX, frameY) {
        ctx.drawImage(img,
                      frameX * width, frameY * height, width, height,
                      canvasX, canvasY, scaledWidth, scaledHeight);
    }
        

    //basic animation function===================================
    //add in cycleLoop for each entity so they can have seperate animations
    function move(cycleLoop){
        if(bossLevel){
            if(BOSS.enemyY + BOSS.hitboxY < canvasY){
                BOSS.drawFrame2(BOSS.enemyAnimation[BOSS.currentFrame], 0, 0, 0);
                
                drawFrame(player, cycleLoop[currentLoopIndex], 0, 0, 0); 
                
            }else{
                drawFrame(player, cycleLoop[currentLoopIndex], 0, 0, 0); 
                BOSS.drawFrame2(BOSS.enemyAnimation[BOSS.currentFrame], 0, 0, 0);
    
            }
            BOSS.currentFrame++
            if(BOSS.currentFrame >= BOSS.enemyAnimation.length){
                BOSS.currentFrame = 0;
            }
        }else{
            drawFrame(player, cycleLoop[currentLoopIndex], 0, 0, 0);
        }
        
        enemies.forEach(enemy => {
            enemy.drawFrame2(enemy.enemyAnimation[enemy.currentFrame], 0, 0, 0)
            enemy.currentFrame++
            
            if(enemy.currentFrame>= enemy.enemyAnimation.length){
                enemy.currentFrame = 0;
            }
        
        })
        //adjusting for multiple animation lengths
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
        
        if(playerHurt === true){
            playerHurtLength++
            switch(lastMove){
                case 0 : animation = hurtAnimateRight
                break;
                case 1 : animation =  hurtAnimateLeft
                break;
            
            }
            if(playerHurtLength === 45){
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
            //pass each entities animations into this function
    }
    
    const master = () => {
        
        if(beforeRoom === this.props.enemyAmount){
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
        }
        frameCount++;
             if (frameCount <1) {
             window.requestAnimationFrame(master);
             return;
             }
            frameCount = 0;
        ctx.clearRect(0, 0, 1200, 720);
        if(escPressed){
            this.setState({isPaused: true})
        }else{
            if(playerHealth <= 0){

            }else{
               
                if(bossLevel){
                    BOSS.step2()
                }
                enemies.forEach(enemy => enemy.step2())
                step()
                this.setState({isPaused: false})

            }
        }
        
        // let movedEnemies = [];
        // enemies.forEach(enemy => movedEnemies.push(enemy.enemyAnimation))
        if(bossLevel){
            move(animation, BOSS.enemyAnimation)

        }else{
            move(animation)

        }
        setTimeout(() => {
            window.requestAnimationFrame(master);
        }, 10);
        
    }
    
    

    //calls first animation loop=================
    //make sure all entities are called in here
    function init() {
        window.requestAnimationFrame(master);
    }
    
    //calls init(for second onload)
    player.onload = function() {
        init();
    }

}

render() {
    const styles = {
        backgroundImage: "url(" + this.props.background + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }

    return (
        <div style={style.body} className="d-flex justify-content-center">
            <audio src={this.props.audio}/>
            {this.state.isPaused ? <Pause /> : <div/>}
            <Stats score="100" health={playerHealth} />
            <canvas ref="canvas" className="mt-4 mb-4"
            width={1200} height={720} 
            style={styles}></canvas>
            {this.state.roomChange ? <Redirect to={this.props.nextLevel}/> : <></>}
        </div>
        

    );
 }
};

   
