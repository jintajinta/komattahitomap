const e = require('express');
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
    knex("tasks")
    .select("*")
    .then(function (results) {
        if(isAuth){
        res.render("helpuser",
        {
            title: '助ける人用ページ',
            tasks: results,
            isAuth: isAuth,
        })
      }else{
        res.redirect('/');
      }
      })
      .catch(function (err) {
        console.error(err);
        if(isAuth){
        res.render("helpuser",
        {
            title: '助ける人用ページ',
            isAuth: isAuth,
        })
      }else{
        res.redirect('/');
      }
      });
});



module.exports = router;