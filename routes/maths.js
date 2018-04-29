var session = require('express-session');
exports.maths = function(req, res, next) {
    var user;
    if (req.session.user) {
        console.log(req.session.user.first_name);
        user = req.session.user.first_name;
        res.render('maths', {user : user})
    }
    else{
        res.redirect('/login');
    }
};
