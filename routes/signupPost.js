var session = require('express-session');
var db = require('../db');
// bcrypt package for hashing the password...
var bcrypt = require('bcrypt');
const saltRounds = 10;
var myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
// ends here

// signup post function starts here...

exports.signup = function(req, res){
    var message = '';

    if(req.method == "POST"){
        var post = req.body;
        var post = req.body;
        var name = post.username;
        var pass = post.password;
        var fname = post.first_name;
        var lname = post.last_name;
        var email = post.email;
        console.log(email);
        console.log(pass);

        bcrypt.hash(pass, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            if (err) {
                message = "Something Bad Happened";
                res.render('signup', { message: message });
            }
            var sql = "INSERT INTO `users`(`first_name`,`last_name`,`email`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + email + "','" + name + "','" + hash + "')"
            var query = db.query(sql, function(err, result) {
                if (err) {
                    console.log(err);
                    message = "Couldn't create new user";
                    res.render('signup', {message : message});

                }

                message = "Succesfully! Your account has been created.";
                res.render('login', { message: message });
            });

        });

    }
}