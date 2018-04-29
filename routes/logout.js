var session = require('express-session');
exports.logout = function(req, res, next) {
    if (req.session.user) {
        req.session.destroy();
        res.redirect('/login')
    }
};