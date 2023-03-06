const db = require('../db/models');
const { v4: uuidv4 } = require('uuid');


const controller = {
    loginProcess: (req, res) => {

        db.users.findOne({
            where: { mail: req.body.email }
        })
            .then(userToLogin => {
                console.log(userToLogin)
                if (userToLogin) {

                    let isOk = req.body.pass == userToLogin.pass;
                    console.log(req.body.pass)
                    console.log(userToLogin.pass)
                    if (isOk) {
                        console.log(isOk)
                        delete userToLogin.password;
                        req.session.userLogged = userToLogin;
                        req.session.save()
                        console.log(req.body.chkRecordame)
                        if (req.body.chkRecordame) {
                            
                            res.cookie('usercookie', req.body.email, { maxAge: (1000 * 60) * 2 })
                        }

                        return res.redirect('../rates/home');

                    }
                    return res.render('login', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son invalidas'
                            }
                        }

                    })

                }
                return res.render('login', {
                    errors: {
                        email: {
                            msg: 'No se encuentra el email en nuestra base de datos'
                        }
                    }

                })
            })
    },
    register: (req, res) => {
        console.log(req.body)
            db.users.create({
                user_id : uuidv4(),
                user_name: req.body.name,
                pass: req.body.pass,
                mail: req.body.email,
            })
                .then(() => {
                    return res.send("OK")
                })
                .catch(error => res.send(error))
            // const users = readJsonFile(usersDbPath);
    },

    update: function (req, res) {
        //return console.log(req.body.name)
        db.users.update({
            user_name: req.body.name,
            pass: req.body.pass,
            mail: req.body.email,
        },

            { where: { user_id: req.params.id } }
        )
            .then(() => {
                return res.send('OK')
            })
            .catch(error => res.send(error))
        // const users = readJsonFile(usersDbPath);
    },

    borrar: function (req, res) {
        db.users.destroy({
            where: {
                user_id: req.params.id
            }
        });
        res.send('OK')
    },
    login: (req, res) => {

        res.render('../view/login')

    }
}



module.exports = controller
