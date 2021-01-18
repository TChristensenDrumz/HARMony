const db = require("../models");
const passport = require("../config/passport");
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res) {  
        console.log(req.body)   
        Users=new db.User({email: req.body.email, username: req.body.username });
        db.User.register(Users, req.body.password, (err, user) => {
            if (err) {
                res.json({success: false, message: "Your account could not be saved. Error: ", err});
            } else {
                res.json({success: true, message: "Your account has been created"});
            };
        });
    },
    login: function(req, res) {
        if(!req.body.username){ 
            res.json({success: false, message: "Username was not given"}) 
          } else { 
            if(!req.body.password){ 
              res.json({success: false, message: "Password was not given"}) 
            }else{ 
              passport.authenticate('local', function (err, user, info) {  
                 if(err){ 
                   res.json({success: false, message: err}) 
                 } else{ 
                  if (! user) { 
                    res.json({success: false, message: 'Your username and/or password is incorrect'}) 
                  } else{ 
                    req.login(user, function(err){ 
                      if(err){ 
                        res.json({success: false, message: err}) 
                      }else{ 
                        const token =  jwt.sign({userId : user._id,  
                           username:user.username}, "HARMony",  
                              {expiresIn: '24h'}); 
                        res.json({success:true, message:"Authentication successful", token: token }); 
                      }; 
                    }); 
                  }; 
                 }; 
              })(req, res); 
            }; 
          }; 
    }
};