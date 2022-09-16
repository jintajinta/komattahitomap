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
            res.render('test', {
                title: '助けられる人用ページ',
                tasks: results,
                isAuth: isAuth,
            });
        })
        .catch(function (err) {
            console.error(err);
            res.render('test', {
                title: '助けられる人用ページ',
                isAuth: isAuth,
            });
        });
});

router.post('/', function (req, res, next) {
    let mylng = req.body.mylng;
    let mylat = req.body.mylat;
    let contents = req.body.contents;
    let classification = req.body.classification;
    let location_details = req.body.location_details;
    let appearance = req.body.appearance;
    const userId = req.session.userid;

    console.log(mylng + mylat + contents)
    knex("tasks")
        .insert({ lat: mylat, lng: mylng, content: contents, class: classification, user_id: userId , location_details: location_details , appearance : appearance})
        .then(function () {
            res.redirect('/test');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/test');
        });
});
module.exports = router;