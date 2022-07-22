const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
        res.render("tohelpuser",
        {
            title: '助けられる人用ページ',
        })
});

router.post('/', function (req, res, next) {
    let mylng=req.body.mylng;
    let mylat=req.body.mylat;
    let contents=req.body.contents;
    let classification=req.body.classification;
    console.log(mylng+mylat+contents)
    knex("position_test")
        .insert({ lat: mylat, lng: mylng,contents:contents,class:classification})
        .then(function () {
            res.redirect('/tohelpuser');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/tohelpuser');
        });
});
module.exports = router;