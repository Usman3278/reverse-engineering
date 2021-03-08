//Requiring our models and passport 

var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  //Using the passport.authenticate middleware with our local strategy.
  
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  //Route for logging user out

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //Route for getting some data about our user to be used client side

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {

      res.json({});
    } 
    else 
    
    {
      
      //Sending back a password
      
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
