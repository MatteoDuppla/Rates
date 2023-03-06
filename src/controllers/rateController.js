const db = require('../db/models');
const { v4: uuidv4 } = require('uuid');
const users = require('../db/models/users');
const { QueryTypes } = require('sequelize');
const rates = require('../db/models/rates');
require('dotenv').config();

const SlackNotify = require('slack-notify');
const MY_SLACK_WEBHOOK_URL = process.env.SLACK_URL;
const slack = SlackNotify(MY_SLACK_WEBHOOK_URL);


const controller = {
    addRate: (req, res) => {
        let date_ob = new Date();
        ssn = req.session.userLogged;
        console.log(MY_SLACK_WEBHOOK_URL)
            db.rates.create({
                rate_id : uuidv4(),
                value: parseFloat(req.body.value),
                creation_date: date_ob.toString(),
                user_id: ssn.user_id,
                type:'Duppla'
            })
                .then(() => {
                    slack.alert('La nueva tasa de duppla es '+req.body.value);
                    res.redirect('/rates/home');
                })
                .catch(error => res.send(error))
            // const users = readJsonFile(usersDbPath);
    },
    addBankRate: (req, res) => {
        let date_ob = new Date();
        ssn = req.session.userLogged;
        console.log(ssn)
            db.rates.create({
                rate_id : uuidv4(),
                value: parseFloat(req.body.value),
                creation_date: date_ob.toString(),
                user_id: ssn.user_id,
                type:'Banco'
            })
                .then(() => {
                    slack.alert('La nueva tasa del banco es '+req.body.value);
                    res.redirect('/rates/home');
                })
                .catch(error => res.send(error))
            // const users = readJsonFile(usersDbPath);
    },

    getRate: function (req, res) {
        db.sequelize.query("select * from rates where type='Duppla' order by creation_date desc limit 1", { type: QueryTypes.SELECT })
        .then(function(rate){
            res.send(JSON.stringify(rate[0]))
          }); 
        /* db.rates.findOne(
            {where : {type: 'Duppla'}},
            {
            order: [ 'creation_date', 'DESC' ],
            }).then(function(rate){
            res.send(rate)
          }); */
    }, 
    getBankRate: function (req, res) {
        db.sequelize.query("select * from rates where type='Banco' order by creation_date desc limit 1", { type: QueryTypes.SELECT })
        .then(function(rate){
            res.send(JSON.stringify(rate[0]))
          }); 
        /* db.rates.findOne(
            {where : {type: 'Banco'}},
            {
            order: [ [ 'creation_date', 'DESC' ]],
            }).then(function(rate){
            res.send(rate)
          }); */ 
    },

    borrar: function (req, res) {
        db.rates.destroy({
            where: {
                rate_id: req.params.id
            }
        });
        res.send('OK')
    },
    home: (req, res) => {
        db.sequelize.query("select * from rates where type='Duppla' order by creation_date desc limit 1", { type: QueryTypes.SELECT })
        .then(function(rate){
            db.sequelize.query("select * from rates where type='Banco' order by creation_date desc limit 1", { type: QueryTypes.SELECT })
            .then(function(bank){
                r = rate[0]
                b = bank[0]
                res.render('../view/home',{r,b})
            });
        });
        /* db.rates.findOne(
            {where : {type: 'Duppla'}},
            {
            order: [ [ 'creation_date', 'DESC' ]],
            }).then(function(rate){
                db.rates.findOne({where : {type: 'Banco'}},
                {
                order: [ [ 'creation_date', 'DESC' ]],
                })
                .then(bank => {
                    console.log(rate)
                    res.render('../view/home',{rate,bank})
                })
            });  */

    },
    getAll: async (req,res)=>{
        const rates = await db.sequelize.query("SELECT * FROM rates left join users on rates.user_id = users.user_id  ", { type: QueryTypes.SELECT });
        console.log(JSON.stringify(rates))
        res.send(JSON.stringify(rates))
        /* db.rates.findAll(
            {
                include: [{
                    model: "users",
                    required: true
                   }],
                order: [['creation_date', 'DESC']]
            }
        ).then((rates)=>{
            console.log(JSON.stringify(rates))
            res.send(JSON.stringify(rates))
        }) */
    }
}



module.exports = controller
