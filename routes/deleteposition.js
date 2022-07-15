const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let pingid = req.body.pingid;
    console.log(pingid)
    knex("position_test")
        .where({ id: pingid, })
        .del().then(function () {
            res.redirect('/map');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/map');
        });;
});

module.exports = router;