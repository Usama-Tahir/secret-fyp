var session = require('express-session');
exports.science = function(req, res, next) {
    var user;
    if (req.session.user) {
        console.log(req.session.user.first_name);
        user = req.session.user.first_name;
        res.render('science', {user : user})
    }
    else{
        res.redirect('/login');
    }
};
