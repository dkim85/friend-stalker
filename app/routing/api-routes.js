var friends = require("../data/friends.js");

module.exports = function (app) {
    // a route to view all the homies
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        // create parameter to match
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);
        // This is where the result of the user's survey is POST and parse it
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // a variable to calculate the difference the user's score and the score of each user
        var totalDifference = 0;

        // creating all the stalker possibilities in the database through  a nested loop
        for(var i =0; i <friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;

            // a loop to go through all the scores of each stalker
            for (var j = 0 ; j < friends[i].scores[j]; j++) {
            // calculating the differences between the scores and adding them into totalDifferences
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
            // best match if the sums is < than the difference of current
                if (totalDifference <= bestMatch.friendDifference) {
                    // reset the bestMatch to be the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // saving user's data to the database 
        friends.push(userData);
        // Json for bestmatch
        res.json(bestMatch);
    });

}