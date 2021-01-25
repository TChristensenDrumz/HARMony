const db = require("../models");

module.exports = {
   setGenres: function(req, res) {
    db.GameData.create(req.body.genreObj) 
    .then(({_id}) => db.User.findOneAndUpdate(req.body.userId, { $push: {genres: _id} }, { new: true})
    .then((err, data) => {
        if (err) {
            res.json(err);
        } else {
            console.log(data)
            res.json(data);
        };
    })
    )}
};