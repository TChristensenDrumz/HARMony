import Canvas from "../../components/Canvas/Canvas";

export default class Enemy extends Canvas{
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
        if(this.HP <= 0){
            // playerHealth+=1
            this.enemyAnimation = []
            beforeRoom++
            console.log(beforeRoom)
            return
        }
        
        
        let distanceX = canvasX - this.enemyX 
        let distanceY = canvasY - this.enemyY
        let unitVector = Math.hypot(distanceX,distanceY)

        if(spacePressed && unitVector<=15){
            console.log(this.attackBuild)
            this.attackBuild+=10
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
                this.enemyX+=(distanceX/(2*unitVector))
                this.enemyY+=(distanceY/(2*unitVector))
            }  

        }
        
        
            
        

    }
        
        
    
    
}