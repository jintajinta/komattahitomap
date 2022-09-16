const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/', function (req, res, next) {
    let taskid = req.body.taskid;
    const userId = req.session.userid;
    console.log(taskid)
    knex("helps")
        .insert({ user_id: userId, task_id: taskid })
        .then(function () {
            res.redirect('/');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/');
        });
});

module.exports = router;