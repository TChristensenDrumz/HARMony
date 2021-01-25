//Background imports
//Classical
import ClassicalHome from "./classical/path.mp3";
import ClassicalLevel1 from "./classical/hcb.mp3";
import ClassicalLevel2 from "./classical/taf.mp3";
import ClassicalLevel3 from "./classical/qotn.mp3";
import ClassicalBossroom from "./classical/caprice.mp3";

//Country
import CountryHome from "./country/tg.mp3";
import CountryLevel1 from "./country/rsc.mp3";
import CountryLevel2 from "./country/j.mp3";
import CountryLevel3 from "./country/jttw.mp3";
import CountryBossroom from "./country/iptbaa.mp3";

//Metal
import MetalHome from "./metal/cafo.mp3";
import MetalLevel1 from "./metal/rts.mp3";
import MetalLevel2 from "./metal/rtl.mp3";
import MetalLevel3 from "./metal/bbtp.mp3";
import MetalBossroom from "./metal/opnl.mp3";


//Pop
import PopHome from "./pop/putj.mp3";
import PopLevel1 from "./pop/lgis.mp3";
import PopLevel2 from "./pop/mb.mp3";
import PopLevel3 from "./pop/yam.mp3";
import PopBossroom from "./pop/mm.mp3";

//Rap
import RapHome from "./rap/hypnotize.mp3";
import RapLevel1 from "./rap/ron.mp3";
import RapLevel2 from "./rap/jump.mp3";
import RapLevel3 from "./rap/chl.mp3";
import RapBossroom from "./rap/gd.mp3";


const tracksArr = {
    classical: {
        home: ClassicalHome,
        level1: ClassicalLevel1,
        level2: ClassicalLevel2,
        level3: ClassicalLevel3,
        bossroom: ClassicalBossroom,
        name: {
            home: "Sonata Pathetique",
            level1: "Hot Cross Buns",
            level2: "Toccata and Fugue",
            level3: "Der Holle Rache",
            bossroom: "Caprice No. 24"
        }
    },
    country: {
        home: CountryHome,
        level1: CountryLevel1,
        level2: CountryLevel2,
        level3: CountryLevel3,
        bossroom: CountryBossroom,
        name: {
            home: "The Gambler",
            level1: "Red Solo Cup",
            level2: "Jolene",
            level3: "Jesus Take The Wheel",
            bossroom: "Proud To Be An American"
        }
    },
    metal: {
        home: MetalHome,
        level1: MetalLevel1,
        level2: MetalLevel2,
        level3: MetalLevel3,
        bossroom: MetalBossroom,
        name: {
            home: "Cafo",
            level1: "Remote Tumor Seeker",
            level2: "Ride The Lightning",
            level3: "Bring Back The Plague",
            bossroom: "Ora Pro Nobis Lucifer"
        }
    },
    pop: {
        home: PopHome,
        level1: PopLevel1,
        level2: PopLevel2,
        level3: PopLevel3,
        bossroom: PopBossroom,
        name: {
            home: "Pump Up The Jam",
            level1: "Let's Get It Started",
            level2: "MMM Bop",
            level3: "You & Me",
            bossroom: "Mamma Mia"
        }
    },
    rap: {
        home: RapHome,
        level1: RapLevel1,
        level2: RapLevel2,
        level3: RapLevel3,
        bossroom: RapBossroom,
        name: {
            home: "Couch Potato",
            level1: "Ready or Not",
            level2: "Jump",
            level3: "Chain Hang Low",
            bossroom: "Gold Digger"
        }
    }
}
        
export default tracksArr;

