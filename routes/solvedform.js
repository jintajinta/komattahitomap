const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let taskid = req.body.taskid;
    console.log(taskid)
    knex("tasks").where('id',1).
    update({
        completed:'t'
        })
        .then(function () {
            res.redirect('/test');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/test');
        });
});

module.exports = router;