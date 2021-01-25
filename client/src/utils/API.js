import axios from "axios";

export default {
    createUser: function(userData) {
        return axios.post("/api/user/register", userData);
    },

    login: function(userData) {
        return axios.post("/api/user/login", userData);
    },

    setGenres: async function(gameData) {
        return await axios.post("/api/gameplay/genre", gameData);
    },

    getGenre: async function(gameData) {
        return await axios.get("/api/gameplay/"+ gameData.id, gameData);
    },

    updateGenre: async function(id, gameData) {
        return await axios.put("/api/gameplay/" + id, gameData);
    }
};