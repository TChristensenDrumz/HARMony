import React from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

export default function Harmony() {
    const bodyStyle={
        height: "80vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "black"
    }

    const game = {
        width: "100vw",
        height: "80vh",
        type: Phaser.CANVAS,
        scene: {
          init: function() {
            this.cameras.main.setBackgroundColor('#24252A')
          },
          create: function() {
            this.helloWorld = this.add.text(
              this.cameras.main.centerX, 
              this.cameras.main.centerY, 
              "HARMony", { 
                font: "40px", 
                fill: "#ffffff" 
              }
            );
            this.helloWorld.setOrigin(0.5);
          },
          update: function() {
            this.helloWorld.angle += 1000;
          }
        }
      }

    return (
        <div style={bodyStyle}>
             <IonPhaser game={game} />
        </div>
    )
}
