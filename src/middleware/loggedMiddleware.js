const db = require('../db/models');



async function userLoggedMiddleware(req, res, next) {
    res.locals.islogged = false;

    let emailInCookie = req.cookies.usercookie;
    if(emailInCookie != null){
        let userFromCookie = await db.users.findOne({
            where: { mail: emailInCookie }
        });
        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
        if (req.session && req.session.userLogged) {
            res.locals.islogged = true;
            res.locals.userLogged = req.session.userLogged
        }
    }
    if (req.session.userLogged) {
        return res.redirect('/rates/home')
    }
    next();
}
module.exports = userLoggedMiddleware