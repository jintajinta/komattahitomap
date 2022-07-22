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
        res.render('tohelpuser', {
          title: '助けられる人用ページ',
          todos: results,
          isAuth: isAuth,
        });
      })
      .catch(function (err) {
        console.error(err);
        res.render('tohelpuser', {
          title: '助けられる人用ページ',
          isAuth: isAuth,
        });
      });
  });

router.post('/', function (req, res, next) {
    let mylng=req.body.mylng;
    let mylat=req.body.mylat;
    let contents=req.body.contents;
    let classification=req.body.classification;
    const userId = req.session.userid;
    console.log(mylng+mylat+contents)
    knex("tasks")
        .insert({ lat: mylat, lng: mylng,content:contents,class:classification ,user_id:userId})
        .then(function () {
            res.redirect('/tohelpuser');
        })
        .catch(function (err) {
            console.error(err);
            res.redirect('/tohelpuser');
        });
});
module.exports = router;