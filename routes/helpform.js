const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let taskid = req.body.taskid;
    console.log(taskid)
    knex("tasks")
        .where({ id: taskid, })
        .del().then(function () {
            res.redirect('/helpuser');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/helpuser');
        });;
});

module.exports = router;