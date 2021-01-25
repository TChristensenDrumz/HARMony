import React, { useState, useEffect } from "react";
import Canvas from "../game/GameLogic";
import LevelLogic from "../utils/LevelLogic";
import Dino from "../game/assets/sprites/DinoSprites-doux.png";

const useLevelObj = (genre) => {
    // console.log(genre)
    const levelObj = React.useMemo(() => LevelLogic.levelObj(genre), [genre])
    // console.log(levelObj)
    return levelObj;
}

export const Home = ({genres}) => {
    const [genre, setGenre] = useState();

    useEffect(() => {
        loadGenre();
    }, [])

    const loadGenre = async () => {
        const data = await LevelLogic.getGenre();
        const obj = LevelLogic.levelObj(data.homeGenre);
        setGenre(obj)
    };
    // console.log(genres)
    // const {background} = useLevelObj(genres.homeGenre)
    if(!genre) return <h1>Loading....</h1>

    const { background, audio, player } = genre;

    return (
        <Canvas
            player={player}
            enemy={Dino}

            bossLevel={false}
            enemyAmount={0}
            background={background.home}
            audio={audio.home}
            nextLevel="/harmony/level1"
        />
    );
};

export const Level1 = () => {
    return (
        <Canvas
            player={Dino}
            enemy={Dino}
            bossLevel={false}
            enemyAmount={3}
            // background={enemy.background.level1}
            // audio={enemy.audio.level1}
            nextLevel="/harmony/level2"
        />
    );
};

export const Level2 = () => {
    return (
        <Canvas
            player={Dino}
            enemy={Dino}
            bossLevel={false}
            enemyAmount={5}
            // background={background.level2}
            // audio={audio.level2}
            nextLevel="/harmony/level3"
        />
    );
};

export const Level3 = () => {
    return (
        <Canvas
            player={Dino}
            enemy={Dino}
            bossLevel={false}
            enemyAmount={7}
            // background={background.level3}
            // audio={audio.level3}
            nextLevel="/harmony/bossroom"
        />
    );
};

export const BossRoom = () => {
    return (
        <Canvas
            player={Dino}
            enemy={Dino}
            bossLevel={true}
            enemyAmount={1}
            // background={background.bossroom}
            // audio={audio.bossroom}
            nextLevel="/harmony"
        />
    );
};

//Edited code
// let allGenres;

// const setGenres = genres => {
//     allGenres = genres;
// }

// LevelLogic.getGenre().then(genres => setGenres(genres));

// export const Home = () => {
//     console.log(allGenres);
//     // console.log(LevelLogic.levelObj(allGenres.homeGenre));
//     return (
//         <Canvas
//             player={Slime}
//             enemy={Dino}
//             bossLevel={false}
//             enemyAmount={0}
//             // background={background.home}
//             // audio={audio.home}
//             nextLevel="/harmony/level1"
//         />
//     );
// };

// export const Level1 = () => {
//     return (
//         <Canvas
//             player={Dino}
//             enemy={Dino}
//             bossLevel={false}
//             enemyAmount={3}
//             // background={enemy.background.level1}
//             // audio={enemy.audio.level1}
//             nextLevel="/harmony/level2"
//         />
//     );
// };

// export const Level2 = () => {
//     return (
//         <Canvas
//             player={Dino}
//             enemy={Dino}
//             bossLevel={false}
//             enemyAmount={5}
//             // background={background.level2}
//             // audio={audio.level2}
//             nextLevel="/harmony/level3"
//         />
//     );
// };

// export const Level3 = () => {
//     return (
//         <Canvas
//             player={Dino}
//             enemy={Dino}
//             bossLevel={false}
//             enemyAmount={7}
//             // background={background.level3}
//             // audio={audio.level3}
//             nextLevel="/harmony/bossroom"
//         />
//     );
// };

// export const BossRoom = () => {
//     return (
//         <Canvas
//             player={Dino}
//             enemy={Dino}
//             bossLevel={true}
//             enemyAmount={1}
//             // background={background.bossroom}
//             // audio={audio.bossroom}
//             nextLevel="/harmony"
//         />
//     );
// };