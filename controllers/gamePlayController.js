const db = require("../models");

module.exports = {
   setGenres: function(req, res) {
    db.GameData.create(req.body.genreObj)
        .then(({_id}) => db.User.findOneAndUpdate(req.body.userId, { $push: {genres: _id} }, { new: true}))
        .then(dbUser => {
            console.log(dbUser);
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        })
    },

    getGenre: function(req, res) {
        console.log(req.params.id)
        db.User.findOne({_id: req.params.id})
            .populate("genres")
            .then(dbUser => {
                console.log("user " + dbUser);
                res.json(dbUser);
            })
            .catch(err => {
                console.log("err " + err);
                res.json(err);
            })
    }
};