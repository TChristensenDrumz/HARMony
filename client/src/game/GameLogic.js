import React, { Component, PropTypes, useState } from 'react';
import Stats from "../components/Stats/Stats";
import Pause from "../components/Pause/Pause";
import { Redirect } from "react-router-dom";
import LevelLogic from '../utils/LevelLogic';
import Transition from "../utils/Transition";


let maxHealth = 100;
let playerHealth = 100;

export default class Canvas extends Component {

    state = {
        roomChange: false,
        direction: '',
        gameOver: false
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

    let imageObj3 = new Image();
    imageObj3.src = this.props.boss;

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
    const scale = 2.5;
    //width and height of spritesheet frame
    const width = 100;
    const height = 100;
    //self explanatory
    const scaledWidth = scale * width;
    const scaledHeight = scale * height;

    //starting variables for move function
    let currentLoopIndex = 0;
    let frameCount = 0;

    //SETTING "STATES"

    let lastMove = 0 //<<====numbers to be passed as identifiers for conditionals or switches

    //position of PLayer(drawframe) on canvas

    let canvasX = Transition.checkDirection().canvasX;
    let canvasY = Transition.checkDirection().canvasY;

    // let enemyX = 100
    // let enemyY = 200
    //COMBAT STUFF=======================
    let dying = 0;
    let playerHurt = false;
    let playerHurtLength = 0;
    let attackLength = 0;
    let beforeRoom;
    if(bossLevel) {
        beforeRoom = 1;
    }
    else {
        beforeRoom = 0;
    }

    //spoofer =======================
    const spoofer = 10
    function frameRateSpoof(nums){
        const frameOutput = []
        nums.forEach(element => {
            for(let i = 0; i < spoofer; i++){
                frameOutput.push(element)
            }
        });
    
        return frameOutput
    
    };
    //animation frames====================================
    //PLAYER && BOSS
        const rightAnimate = frameRateSpoof([4,5,6,7,8,9,10,11]);
        const leftAnimate =  frameRateSpoof([51,50,49,48,47,46,45,44]);
        const baseRightAnimate = frameRateSpoof([0,1,2,3]);
        const baseLeftAnimate = frameRateSpoof([55,54,53,52]);
        const attackRight = frameRateSpoof([12,13,14,15,16,17,18,19]);
        const attackLeft = frameRateSpoof([43,42,41,40,39,38,37,36]);
        const hurtAnimateRight = frameRateSpoof([20,21,22,23]);
        const hurtAnimateLeft = frameRateSpoof([35,34,33,32]);
        const deadRight = frameRateSpoof([24,25,26,27,27]);
        const deadLeft = frameRateSpoof([31,30,29,28,28]);

    //small ENEMY

        const slimeRightAnimate = frameRateSpoof([6,7,8,9,10,11,12,13,14,15,16,17,18]);
        const slimeLeftAnimate =  frameRateSpoof([65,64,63,62,61,60,59,58,57,56,55,54,53]);
        const slimeBaseRightAnimate = frameRateSpoof([0,1,2,3,4,5]);
        const slimeBaseLeftAnimate = frameRateSpoof([71,70,69,68,67,66]);
        const slimeAttackRight = frameRateSpoof([19,20,21,22,23,24,25,26]);
        const slimeAttackLeft = frameRateSpoof([52,51,50,49,48,47,46,45]);
        const slimeHurtAnimateRight = frameRateSpoof([27,28,29,30]);
        const slimeHurtAnimateLeft = frameRateSpoof([44,43,42,41]);
        const slimeDeadRight = frameRateSpoof([31,32,33,34,35])
        const slimeDeadLeft = frameRateSpoof([40,39,38,37,36])
    //  (enemyX, enemyY, img, width, height, scale, HP, ATK, EXP)
    //starting position for other entity(entities)
    let animation = []
    const bossAnimations = [rightAnimate, leftAnimate, baseRightAnimate, baseLeftAnimate, attackRight, attackLeft, hurtAnimateRight, hurtAnimateLeft, deadRight, deadLeft, [27] ,[28]]
    const slimeAnimations = [slimeRightAnimate, slimeLeftAnimate, slimeBaseRightAnimate, slimeBaseLeftAnimate, slimeAttackRight, slimeAttackLeft, slimeHurtAnimateRight, slimeHurtAnimateLeft, slimeDeadRight, slimeDeadLeft, [35], [35]]
    class Enemy{
        constructor(img, enemyX, enemyY, scale, enemyAnimation, HP, ATK, hitboxX, hitboxY, speed, width, height){
            this.enemyX = enemyX;
            this.enemyY = enemyY;
            this.img = img;
            this.width = width;
            this.height = height;
            this.scale = scale
            this.enemyAnimation = enemyAnimation;
            this.HP = HP;
            this.ATK = ATK;
            this.attackBuild = 0;
            this.hitboxX = hitboxX;
            this.hitboxY = hitboxY;
            this.currentFrame = 0;
            this.speed = speed;
            this.dead = false;
            this.dying = 0


        };
           
        drawFrame2(frameX, frameY) {
            ctx.drawImage(this.img,
                          frameX * this.width, frameY * this.height, this.width, this.height,
                          this.enemyX, this.enemyY, this.scale*this.width, this.scale*this.width);
        }
        isDead = () => this.dead;

        step2 = (animations) => {
            let distanceX = canvasX - this.enemyX - this.hitboxX + 100
            let distanceY = canvasY - this.enemyY - this.hitboxY + 140
            let unitVector = Math.hypot(distanceX, distanceY)
            if(this.dead) {
                return;
            }
            else if(this.HP <= 0){
                if(this.dying === 0){
                    this.currentFrame=0
                }
                
                this.dying++
                if(distanceX < 0){
                    this.enemyAnimation = animations[9]
                }else{
                    this.enemyAnimation = animations[8]
                }
                if(this.dying >= this.enemyAnimation.length){
                    if(bossLevel){
                        beforeRoom --;
                    }else{
                        beforeRoom++
                    }
                    maxHealth+=20;
                    playerHealth+=20
                    this.dead = true;
                    if(distanceX > 0){
                        this.enemyAnimation = animations[10]
                    }else{
                        this.enemyAnimation = animations[11]
                    }
                    return
                }
                
            }
            else if(spacePressed && unitVector <= 80){
                this.attackBuild+=10
                if(lastMove === 0 && distanceX < 0 ){
                    this.enemyAnimation = animations[7]
                    this.HP -= 1
                }else if(lastMove === 1 && distanceX > 0){
                    this.enemyAnimation = animations[6]
                    this.HP -= 1
                }
                
            }else{
                if(unitVector <= 80){
                    if(distanceX < 0){
                        this.enemyAnimation = animations[5]
                    }else{
                        this.enemyAnimation = animations[4]
                    }
                    this.attackBuild+=5
                    if(this.attackBuild>=500){
                        
                        playerHurt = true
                        playerHealth-=this.ATK

                        this.attackBuild = 0
                    }
                }else{
                    if(distanceX > 0 ){
                       
                        this.enemyAnimation = animations[0]
                    }
                    else if(distanceX < 0){
                        
                        this.enemyAnimation = animations[1]
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
        const enemy = new Enemy(imageObj2,  Math.random()*1100, Math.random()*620, 1.5, [], 100, 10, 30, 70, 2, 64, 64);
        enemies.push(enemy);
    };
    let BOSS = {};
    if(bossLevel){
        BOSS = new Enemy(imageObj3, 200, 300, 3, [], 10, 25, 125, 175, 4, 100, 100);
    };

    


   
    //draws main character (player)==================
    function drawFrame(img, frameX, frameY) {
        ctx.drawImage(img,
                      frameX * width, frameY * height, width, height,
                      canvasX, canvasY, scaledWidth, scaledHeight);
    }
        

    //basic animation function===================================
    //add in cycleLoop for each entity so they can have seperate animations
    function move(cycleLoop){
        enemies.forEach(enemy => {
            enemy.drawFrame2(enemy.enemyAnimation[enemy.currentFrame], 0, 0, 0)
            enemy.currentFrame++
            
            if(enemy.currentFrame>= enemy.enemyAnimation.length){
                enemy.currentFrame = 0;
            }
        
        })
        if(bossLevel){
            if(BOSS.enemyY < canvasY){
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
            if(attackLength === 0){
                currentLoopIndex = 0
            }
            if(rightPressed){
                lastMove=0
                if(canvasX >= 974) {
                    canvasX -= 6;
                }
                if(upPressed){
                    if(canvasY <= -10){
                        canvasY += 6;
                        canvasX += 2;
                    }
                    else {
                        canvasX += 2;
                        canvasY -= 2;
                    }
                }
                else if(downPressed){
                    if(canvasY >= 476) {
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
                if(canvasX <= -28) {
                    canvasX += 6;
                }
                if(upPressed){
                    if(canvasY <= -10) {
                        canvasY += 6;
                        canvasX -= 2;
                    }
                    else {
                        canvasX -= 2;
                        canvasY -= 2;
                    }
                }
                else if(downPressed){
                    if(canvasY >= 476) {
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
                if(canvasY <= -10) {
                    canvasY += 6;
                }
                else {
                    canvasY -= 2
                }
            }
            else if(downPressed){
                if(canvasY >= 476) {
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
                if(attackLength===80){
                    spacePressed = false
                    attackLength = 0
                }
        }


    //function for directing rendering by keypress======(character movement/collision/behavior)
    const step = () => {
        
        if(playerHurt === true && dying === 0){
            if(playerHurtLength===0){
                currentLoopIndex = 0
            }
            playerHurtLength++
            switch(lastMove){
                case 0 : animation = hurtAnimateRight
                break;
                case 1 : animation =  hurtAnimateLeft
                break;
            
            };
            if(playerHurtLength === 45){
                playerHurt = false
                playerHurtLength = 0
            }
        }else if (dying > 0){
            if(lastMove == 0){
                animation = deadRight
            }else{
                animation = deadLeft
            };
        }else{

            switch(true){
                case spacePressed:
                    attack();
                break;
                case rightPressed:
    
                    if(canvasX >= 974) {
    
                        animation = rightAnimate
                        canvasX -= 6;
                    //===================
                    }
                    else if(canvasY <= -10) {
                        animation = rightAnimate
                        canvasY += 6;
                        canvasX += 2;
                    }
                    else if(canvasY >= 476) {
                        animation = rightAnimate
                        canvasY -= 6;
                        canvasX += 2;
                    }
                    else{
                        right()
                    };
                break;
                case leftPressed:
    
                    if(canvasX <= -28){
    
                        animation = leftAnimate
                        canvasX += 6;
                    //===================
                    }
                    else if(canvasY <= -10) {
                        animation = leftAnimate
                        canvasY += 6;
                        canvasX -= 2;
                    }
                    else if(canvasY >= 476) {
                        animation = leftAnimate
                        canvasY -= 6;
                        canvasX -= 2;
                    }
                    else{
                        left()
                    };
                break;
                case downPressed:
                    if(canvasY >= 476){
                        if(lastMove===0){
                            animation = rightAnimate
                            canvasY -= 6;
                        }else{
                            animation = leftAnimate
                            canvasY -= 6;
                        }
                    }else{
                    down()
                    };
                break;
                case upPressed:
                    if(canvasY <= -10){
                        if(lastMove===0){
                            animation = rightAnimate
                            canvasY += 6;
                        }else{
                            animation = leftAnimate
                            canvasY += 6;
                        }
        
                    }else{
                        up();
                    };
                break;
                default:
                    if(lastMove===0){
                       animation = baseRightAnimate
                    }else{
                       animation = baseLeftAnimate
                    };
                }}
                if(playerHealth <= 0 ){
                    this.setState({...this.state, gameOver: true});
                    if(dying === 0){
                        currentLoopIndex=0
                    }
                    dying++
                }else if(dying >= animation.length){
                    return
                };
            //pass each entities animations into this function
    }
    
    const master = () => {
        if(beforeRoom === this.props.enemyAmount){
            console.log(beforeRoom)
            if ((canvasX >= 436 && canvasX <= 520) && canvasY <= -10) {
                if(!bossLevel) {
                    this.setState({...this.state, direction: "top"});
                    localStorage.setItem("direction", JSON.stringify(this.state));
                }
                this.setState({...this.state, roomChange: true});
            } else if ((canvasX >= 436 && canvasX <= 520) && canvasY >= 476) {
                if(!bossLevel) {
                    this.setState({...this.state, direction: "bottom"});
                    localStorage.setItem("direction", JSON.stringify(this.state));
                }            
                this.setState({...this.state, roomChange: true});
            } else if (canvasX >= 974 && (canvasY >= 190 && canvasY <= 274)) {
                if(!bossLevel) {
                    this.setState({...this.state, direction: "right"});
                    localStorage.setItem("direction", JSON.stringify(this.state));
                }
                this.setState({...this.state, roomChange: true});
            } else if (canvasX <= -28 && (canvasY >= 190 && canvasY <= 274)) {
                if(!bossLevel) {
                    this.setState({...this.state, direction: "left"});
                    localStorage.setItem("direction", JSON.stringify(this.state));
                }
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
            // console.log(dying)
            if(dying >= animation.length){
                if(lastMove === 0){
                    animation = [27]
                }else{
                    animation = [28]
                }
            }else{
               
                if(bossLevel){
                    BOSS.step2(bossAnimations);
                }

                enemies.forEach(enemy => enemy.step2(slimeAnimations));
                step();
                this.setState({isPaused: false});

            };
        };
        if(bossLevel){
            move(animation, BOSS.enemyAnimation)
        }else{
            move(animation)

        };
        setTimeout(() => {
            window.requestAnimationFrame(master);
        }, 10);

       if (BOSS.dying === 40) {
            localStorage.removeItem("direction");
            LevelLogic.resetEnemy();   
       }
    };
    
    

    //calls first animation loop=================
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
        body: {
            position: "relative",
            margin: "0 auto",
            backgroundColor: "black",
            width: "1200px",
            height: "720px"
        },
        background: {
            backgroundImage: "url(" + this.props.background + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        },
        audio: {
            position: "absolute",
            top: "-12px",
            right: "8px",
            transform: "scale(.7)"
        },
        song: {
            position: "absolute",
            color: "white",
            top: "7px",
            right: "280px" 
        }
    }

    return (
        <div style={styles.body} className="d-flex justify-content-center">
            <p style={styles.song}>{this.props.song}</p>
            <audio src={this.props.audio} style={styles.audio} controls loop/>
            {this.state.isPaused ? <Pause /> : <div/>}
            <Stats health={playerHealth} max={maxHealth}/>
            <canvas ref="canvas"
            width={1200} height={720} 
            style={styles.background}></canvas>
            {this.state.roomChange ? <Redirect to={this.props.nextLevel}/> : <></>}
            {this.state.gameOver ? <Redirect to="/harmony/gameover" /> : <></>}
        </div>
        

    );
 }
};

   
