import mapsArr from "../game/assets/maps/allMaps";
import tracksArr from "../game/assets/audio/allTracks";

export default {

    levelObj: function() {
        let genre = "classical";
        switch (genre) {
            case "pop":
                return {
                    background: mapsArr.pop,
                    audio: tracksArr.pop
                };
                break;
            case "classical":
                return {
                    background: mapsArr.classical,
                    audio: tracksArr.classical
                };
                break;
            case "country":
                return {
                    background: mapsArr.country,
                    audio: tracksArr.country
                };
                break;
            case "metal":
                return {
                    background: mapsArr.metal,
                    audio: tracksArr.metal
                };
                break;
            case "rap":
                return {
                    background: mapsArr.rap,
                    audio: tracksArr.rap
                };
                break;
            default:
                return;
        }
    }
}