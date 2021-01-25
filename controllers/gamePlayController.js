const db = require("../models");

module.exports = {
   setGenres: function(req, res) {
    db.GameData.create(req.body.genreObj)
        .then(({_id}) => db.User.findOneAndUpdate(req.body.userId, { $push: {genres: _id} }, { new: true}))
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        })
    },

    getGenre: function(req, res) {
        db.User.findOne({_id: req.params.id})
            .populate("genres")
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            })
    },

    updateGenre: function(req, res) {
        db.GameData.findOneAndUpdate({_id: req.params.id}, {randomEnemy: req.body.newEnemy, leftoverGenres: req.body.leftoverGenres})
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            });
    }
};