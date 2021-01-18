import React from 'react'
import Canvas from "../components/Canvas"
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

export default function Harmony() {
  return (
    <div>
      <Canvas width={40} height={40} tileSize={16}/>;
    </div>
  );
}
