import React from "react";
import Canvas from "../game/GameLogic";
import LevelLogic from "../utils/LevelLogic";
import Dino from "../game/assets/sprites/DinoSprites-doux.png";
import rapChar from "../game/assets/sprites/Character5/Character5.png"
import metalChar from "../game/assets/sprites/Character3/Character3.png"
import classicChar from "../game/assets/sprites/Character1/Character1.png"
import countryChar from "../game/assets/sprites/Character2/Character2.png"
import popChar from "../game/assets/sprites/Character4/Character4.png"

// let { background, audio } = LevelLogic.enemyGenre();

export const Home = () => {
    return (
        <Canvas
            player={rapChar}
            enemy={Dino}
            bossLevel={false}
            enemyAmount={0}
            background={LevelLogic.homeGenre().background.home}
            audio={LevelLogic.homeGenre().audio.home}
            nextLevel="/harmony/level1"
        />
    );
};

export const Level1 = () => {
    let { background, audio } = LevelLogic.enemyGenre();
    localStorage.setItem("currentLevel", JSON.stringify("0"));
    return (
        <Canvas
            player={countryChar}
            enemy={Dino}
            bossLevel={false}
            enemyAmount={3}
            background={background.level1}
            audio={audio.level1}
            nextLevel="/harmony/level2"
        />
    );
};

export const Level2 = () => {
    let { background, audio } = LevelLogic.enemyGenre();
    return (
        <Canvas
            player={popChar}
            enemy={Dino}
            bossLevel={false}
            enemyAmount={5}
            background={background.level2}
            audio={audio.level2}
            nextLevel="/harmony/level3"
        />
    );
};

export const Level3 = () => {
    let { background, audio } = LevelLogic.enemyGenre();
    return (
        <Canvas
            player={metalChar}
            enemy={Dino}
            bossLevel={false}
            enemyAmount={7}
            background={background.level3}
            audio={audio.level3}
            nextLevel="/harmony/bossroom"
        />
    );
};

export const BossRoom = () => {
    let { background, audio } = LevelLogic.enemyGenre();
    return (
        <Canvas
            player={classicChar}
            enemy={Dino}
            bossLevel={true}
            enemyAmount={1}
            background={background.bossroom}
            audio={audio.bossroom}
            nextLevel="/harmony"
        />
    );
};