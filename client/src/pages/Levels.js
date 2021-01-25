import React, { useState, useEffect } from "react";
import Canvas from "../game/GameLogic";
import LevelLogic from "../utils/LevelLogic";
import Slime from "../game/assets/sprites/Slime/slime.png";

export const Home = () => {
    const [genre, setGenre] = useState();

    useEffect(() => {
        loadGenre();
    }, [])

    const loadGenre = async () => {
        const data = await LevelLogic.getGenre();
        const obj = LevelLogic.levelObj(data.homeGenre);
        setGenre(obj)
    };
    if(!genre) return <h1>Loading....</h1>

    const { background, audio, player } = genre;

    return (
        <Canvas
            player={player}
            enemy={Slime}
            bossLevel={false}
            enemyAmount={0}
            background={background.home}
            audio={audio.home}
            song={audio.name.home}
            nextLevel="/harmony/level1"
        />
    );
};

export const Level1 = () => {
    const [genre, setGenre] = useState();

    useEffect(() => {
        loadGenre();
    }, [])

    const loadGenre = async () => {
        const data = await LevelLogic.getGenre();
        const enemy = LevelLogic.levelObj(data.randomEnemy);
        const home = LevelLogic.levelObj(data.homeGenre);
        setGenre({enemy: enemy, home: home})
    };
    if(!genre) return <h1>Loading....</h1>

    const { enemy, home } = genre;
    return (
        <Canvas
            player={home.player}
            enemy={Slime}
            bossLevel={false}
            enemyAmount={0}
            background={enemy.background.level1}
            audio={enemy.audio.level1}
            song={enemy.audio.name.level1}
            nextLevel="/harmony/level2"
        />
    );
};

export const Level2 = () => {
    const [genre, setGenre] = useState();

    useEffect(() => {
        loadGenre();
    }, [])

    const loadGenre = async () => {
        const data = await LevelLogic.getGenre();
        const enemy = LevelLogic.levelObj(data.randomEnemy);
        const home = LevelLogic.levelObj(data.homeGenre);
        setGenre({enemy: enemy, home: home})
    };
    if(!genre) return <h1>Loading....</h1>

    const { enemy, home } = genre;
    return (
        <Canvas
            player={home.player}
            enemy={Slime}
            bossLevel={false}
            enemyAmount={0}
            background={enemy.background.level2}
            audio={enemy.audio.level2}
            song={enemy.audio.name.level2}
            nextLevel="/harmony/level3"
        />
    );
};

export const Level3 = () => {
    const [genre, setGenre] = useState();

    useEffect(() => {
        loadGenre();
    }, [])

    const loadGenre = async () => {
        const data = await LevelLogic.getGenre();
        const enemy = LevelLogic.levelObj(data.randomEnemy);
        const home = LevelLogic.levelObj(data.homeGenre);
        setGenre({enemy: enemy, home: home})
    };
    if(!genre) return <h1>Loading....</h1>

    const { enemy, home } = genre;
    return (
        <Canvas
            player={home.player}
            enemy={Slime}
            bossLevel={false}
            enemyAmount={0}
            background={enemy.background.level3}
            audio={enemy.audio.level3}
            song={enemy.audio.name.level3}
            nextLevel="/harmony/bossroom"
        />
    );
};

export const BossRoom = () => {
    const [genre, setGenre] = useState();

    useEffect(() => {
        loadGenre();
    }, [])

    const loadGenre = async () => {
        const data = await LevelLogic.getGenre();
        const enemy = LevelLogic.levelObj(data.randomEnemy);
        const home = LevelLogic.levelObj(data.homeGenre);
        setGenre({enemy: enemy, home: home})
    };
    if(!genre) return <h1>Loading....</h1>

    const { enemy, home } = genre;
    return (
        <Canvas
            player={home.player}
            boss={enemy.player}
            enemy={Slime}
            bossLevel={true}
            enemyAmount={0}
            background={enemy.background.bossroom}
            audio={enemy.audio.bossroom}
            song={enemy.audio.name.bossroom}
            nextLevel="/harmony"
        />
    );
};

