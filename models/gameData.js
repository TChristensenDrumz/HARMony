const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    homeGenre: String,
    randomEnemy: String,
    leftoverGenres: [{
        type: String
    }]
});

const GameData = mongoose.model("GameData", DataSchema);

module.exports = GameData;