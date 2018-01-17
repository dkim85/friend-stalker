// To include the path package to deliver pages 
var path = require("path");


// Building routes to tell my router what page to deliver based on URL.
module.exports = function (app) {

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(_dirname + "/../public/survey.html"));
    });

// creating a route for my homepage
    app.use(function(req, res) {
        res.sendFile(path.join(_dirname + "/../public/home.html"));
    });
}