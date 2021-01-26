// Players
import Character2 from "./Character2/Character2.png";
import Character3 from "./Character3/Character3.png";
import Character4 from "./Character4/Character4.png";
import Character5 from "./Character5/Character5.png";
import Character6 from "./Character6/Character6.png";

// Slimes
import ClassicalSlime from "../sprites/Slime/greySlime.png"
import CountrySlime from "../sprites/Slime/brownSlime.png"
import MetalSlime from "../sprites/Slime/redSlime.png"
import PopSlime from "../sprites/Slime/lbSlime.png"
import RapSlime from "../sprites/Slime/purpleSlime.png"

const spritesArr = {
    classical: {
        sprite: Character6,
        slime: ClassicalSlime
    },
    country:{
        sprite: Character2,
        slime: CountrySlime
    },
    metal: {
        sprite: Character3,
        slime: MetalSlime
    }, 
    pop: {
        sprite: Character4,
        slime: PopSlime
    }, 
    rap: {
        sprite: Character5,
        slime: RapSlime
    }
};

export default spritesArr;