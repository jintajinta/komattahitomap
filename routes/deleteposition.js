const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let pingid = req.body.pingid;
    console.log(pingid)
    knex("tasks")
        .where({ id: pingid, })
        .del().then(function () {
            res.redirect('/helpuser');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/helpuser');
        });;
});

module.exports = router;