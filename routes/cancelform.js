const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let helpid = req.body.helpid;
    knex("helps").where('id', parseInt(helpid)).
        del()
        .then(function () {
            res.redirect('/');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/');
        });
});

module.exports = router;