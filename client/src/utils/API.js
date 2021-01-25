import axios from "axios";

export default {
    createUser: function(userData) {
        return axios.post("/api/user/register", userData);
    },

    login: function(userData) {
        return axios.post("/api/user/login", userData);
    },

    setGenres: function(gameData) {
        return axios.post("/api/gameplay/genre", gameData);
    },

    getGenre: function(gameData) {
        return axios.get("/api/gameplay/"+ gameData.id, gameData);
    }
};