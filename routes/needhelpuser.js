const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    knex("tasks").where({
        post_user_id: userId,
    })
        .select("*")
        .then(function (results) {
            if (isAuth) {
                res.render('needhelpuser', {
                    title: '助けられる人用ページ',
                    tasks: results,
                    isAuth: isAuth,
                });
            } else {
                res.redirect('/');
            }
        })
        .catch(function (err) {
            if (isAuth) {
                console.error(err);
                res.render('needhelpuser', {
                    title: '助けられる人用ページ',
                    isAuth: isAuth,
                });
            } else {
                res.redirect('/');
            }
        });
});

router.post('/', function (req, res, next) {
    let mylng = req.body.mylng;
    let mylat = req.body.mylat;
    let contents = req.body.contents;
    let classification = req.body.classification;
    let location_details = req.body.location_details;
    let appearance = req.body.appearance;
    const userId = req.session.userid;
    let year=('00'+req.body.year).slice(-2);
    let month=('00'+req.body.month).slice(-2);
    let date=('00'+req.body.date).slice(-2);
    let hour=('00'+req.body.hour).slice(-2);
    let createdAt = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss');
    let needhelpAt= year+"-"+month+"-"+date+" "+hour+":00:00";
    knex("tasks")
        .insert({ lat: mylat, lng: mylng, content: contents, class: classification, post_user_id: userId, location_details: location_details, appearance: appearance ,ts:createdAt,needts:needhelpAt})
        .then(function () {
            res.redirect('/needhelpuser');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/needhelpuser');
        });
});
module.exports = router;