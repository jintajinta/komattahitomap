const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    knex("tasks").where({
        user_id: userId,
    })
        .select("*")
        .then(function (results) {
            knex("users").where("*").then(function (resultsuser) {
                res.render('test', {
                    title: '助けられる人用ページ',
                    tasks: results,
                    users: resultsuser,
                    isAuth: isAuth,
                });
            }).catch(function (err) {
                console.error(err);
                res.render('test', {
                    title: '助けられる人用ページ',
                    tasks: results,
                    isAuth: isAuth,
                });
                });
            });
        })
        .catch(function (err) {
            console.error(err);
            res.render('test', {
                title: '助けられる人用ページ',
                isAuth: isAuth,
            });
        });
module.exports = router;