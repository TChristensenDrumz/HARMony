import mapsArr from "../game/assets/maps/allMaps";
import tracksArr from "../game/assets/audio/allTracks";
import API from "../utils/API";
import Token from "../utils/Token";

export default {

    setGenre: function() {
        let homeGenre = "classical";
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
        let userId = {id: Token.getId()};
        let data = {genreObj, userId};
        API.setGenres(data).then(res => (console.log(res)));
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