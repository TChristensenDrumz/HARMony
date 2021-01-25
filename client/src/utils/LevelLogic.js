import mapsArr from "../game/assets/maps/allMaps";
import tracksArr from "../game/assets/audio/allTracks";
import spritesArr from "../game/assets/sprites/allSprites";
import API from "../utils/API";
import Token from "../utils/Token";

export default {

    setGenre: async function(homeGenre) {
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
        return res;
    },

    getGenre: async function() {
        let userId = Token.getId();
        const data = await API.getGenre({id: userId})
                return data.data.genres[0];
    },

    resetGenre: async function(homeGenre, id) {
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
        let res = await API.updateGenre(id, genreObj);
        return res;
    },

    resetEnemy: async function() {
        let genres = await this.getGenre();
        let { _id, randomEnemy, leftoverGenres, homeGenre } = genres;
        leftoverGenres.splice(leftoverGenres.indexOf(randomEnemy), 1);
        if (leftoverGenres.length === 0) {
            leftoverGenres = ["pop", "classical", "country", "metal", "rap"];
            leftoverGenres.splice(leftoverGenres.indexOf(homeGenre), 1);
        };
        let newEnemy = leftoverGenres[Math.floor(Math.random() * leftoverGenres.length)];
        let data = {
            randomEnemy: newEnemy,
            leftoverGenres: leftoverGenres
        };
        API.updateGenre(_id, data);
    },

    levelObj: function(genre) {
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