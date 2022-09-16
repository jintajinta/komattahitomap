const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let taskid = req.body.taskid;
    console.log(taskid)
    knex("tasks").where('id',parseInt(taskid)).
    update({
        closed:'t'
        })
        .then(function () {
            res.redirect('/needhelpuser');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/needhelpuser');
        });
});

module.exports = router;