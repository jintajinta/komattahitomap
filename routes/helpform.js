const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const dayjs = require('dayjs')

router.post('/', function (req, res, next) {
    let taskid = req.body.taskid;
    const userId = req.session.userid;
    let helpAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    knex("helps")
        .insert({ user_id: userId, task_id: taskid ,help_ts:helpAt})
        .then(function () {
            res.redirect('/');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/');
        });
});

module.exports = router;