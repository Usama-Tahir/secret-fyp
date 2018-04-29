var session = require('express-session');
var db = require('../db');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.login = function(req, resp) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;
        console.log(name);
        console.log(pass);
        var sql = "SELECT id, first_name, last_name, user_name,password FROM `users` WHERE `user_name`='" + name + "'";

        db.query(sql, function(err, results) {
            console.log(results.length);
            console.log(results);
            console.log('entered sql query');
            if (err) {
                console.log("error found");
            }
            if (results.length) {
                var temp = results[0].password;
                console.log(temp);
                bcrypt.compare(pass, temp, function(err, res) {
                    if (err) {
                        message = 'Login Failed';
                        res.render('login', { message: message });
                    }
                    // console.log()
                    sess.userId = results[0].id;
                    sess.user = results[0];
                    resp.redirect('/mainsection');
                });


            } else {
                console.log('wrong babe')
                message = 'Wrong Credentials.';
                // res.render('index.ejs', { message: message });
            }

        });




    } else {
        message = 'Something bad happened!';
        res.render('login.hbs', { message: message });
    }
};