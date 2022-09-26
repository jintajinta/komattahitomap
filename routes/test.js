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
            knex.select('contents')
            .table('helps')
            .innerJoin(
                'tasks',
                'helps.task_id',
                '=',
                'tasks.id'
            ).then(function (resultusers) {
                res.render('test', {
                    title: '助けられる人用ページ',
                    users: resultusers,
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
        })
        .catch(function (err) {
            console.error(err);
            res.render('test', {
                title: '助けられる人用ページ',
                isAuth: isAuth,
            });
        });

    

});
module.exports = router;