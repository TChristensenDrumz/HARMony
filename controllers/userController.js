const db = require("../models");

module.exports = {
    create: function(req, res) {     
        Users=new db.User({email: req.body.email, username: req.body.username });
        db.User.register(Users, req.body.password, (err, user) => {
            if (err) {
                res.json({success: false, message: "Your account could not be saved. Error: ", err});
            } else {
                res.json({success: true, message: "Your account has been saved"});
            };
        });
    }
};

