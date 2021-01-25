import mapsArr from "../game/assets/maps/allMaps";
import tracksArr from "../game/assets/audio/allTracks";
import spritesArr from "../game/assets/sprites/allSprites";
import API from "../utils/API";
import Token from "../utils/Token";

export default {

    setGenre: async function(genre) {
        let homeGenre = genre;
        let genres = ["pop", "classical", "country", "metal", "rap"];
        if (genres.includes(homeGenre)) {
            genres.splice(genres.indexOf(homeGenre), 1);
        };
        let randomEnemy = genres[Math.floor(Math.random() * genres.length)];
        let genreObj = {
            homeGenre: homeGenre,
            randomEnemy: randomEnemy,
            leftoverGenres: genres
        };
        let userId = {_id: Token.getId()};
        let data = {genreObj, userId};
        let res = await API.setGenres(data);
        console.log(res);
        return res;
    },

    getGenre: async function() {
        let userId = Token.getId();
        let res = await API.getGenre({id: userId});
        console.log(res);
        return res;
    },

    homeGenre: function() {
        let homeGenre = "classical";
        return this.levelObj(homeGenre);
    },

    enemyGenre: function() {
        let homeGenre = "classical";
        let genres = JSON.parse(localStorage.getItem("leftoverGenres")) || ["pop", "classical", "country", "metal", "rap"];
        if (genres.includes(homeGenre)) {
            genres.splice(genres.indexOf(homeGenre), 1);
        };
        let randomEnemy = JSON.parse(localStorage.getItem("randomEnemy")) || genres[Math.floor(Math.random() * genres.length)];
        localStorage.setItem("randomEnemy", JSON.stringify(randomEnemy));
        localStorage.setItem("leftoverGenres", JSON.stringify(genres));
        return this.levelObj(randomEnemy);
    },

    levelObj: function(genre) {
        // let genres = ["pop", "classical", "country", "metal", "rap"];
        // let homeGenre = "classical";
        // genres.splice(genres.indexOf(homeGenre), 1);
        // let hash = {home: homeGenre};
        // for (let i = 0; i < genres.length; i++) {
        //     hash.i = genres[i];
        // }
        // let randomGenre = genres[Math.floor(Math.random() * genres.length)];
        // localStorage.setItem(currentGenre, JSON.stringify(randomGenre));
        switch (genre) {
            case "pop":
                return {
                    background: mapsArr.pop,
                    audio: tracksArr.pop,
                    player: spritesArr.pop
                };
                break;
            case "classical":
                return {
                    background: mapsArr.classical,
                    audio: tracksArr.classical,
                    player: spritesArr.classical
                };
                break;
            case "country":
                return {
                    background: mapsArr.country,
                    audio: tracksArr.country,
                    player: spritesArr.country
                };
                break;
            case "metal":
                return {
                    background: mapsArr.metal,
                    audio: tracksArr.metal,
                    player: spritesArr.metal
                };
                break;
            case "rap":
                return {
                    background: mapsArr.rap,
                    audio: tracksArr.rap,
                    player: spritesArr.rap
                };
                break;
            default:
                return;
        }
    }
}