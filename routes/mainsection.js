var session = require('express-session');
var db = require('../db');

exports.dashboard = function(req, res, next) {
        console.log('now we are here bitches!');
        var user = req.session.user,
            userId = req.session.userId;
            console.log(user);
            console.log(userId);
        if (userId == null) {
            res.redirect("/login");
            return;
        }
        
        var sql = "SELECT user_name FROM `users` WHERE `id`='" + userId + "'";
        // var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
    
        db.query(sql, function(err, results) {
           var username = results[0].user_name;
            console.log('holaaaaaa')
            console.log(results[0].user_name);
            if(err) {
                console.log(err);
            }
            if(username.length){
                res.render('subjects.hbs', { user: username });
            }
           
        });
    };
    