const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
  const userId = req.session.userid;
  const isAuth = Boolean(userId);
    knex("tasks")
    .select("*")
    .then(function (results) {
        console.log(results)
        res.render("helpuser",
        {
            title: '助ける人用ページ',
            tasks: results,
            isAuth: isAuth,
        })
      })
      .catch(function (err) {
        console.error(err);
        res.render("helpuser",
        {
            title: '助ける人用ページ',
            isAuth: isAuth,
        })
      });
});



module.exports = router;