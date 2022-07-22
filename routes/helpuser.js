const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    knex("tasks")
    .select("*")
    .then(function (results) {
        console.log(results)
        res.render("helpuser",
        {
            title: '助ける人用ページ',
            tasks: results,
        })
      })
      .catch(function (err) {
        console.error(err);
        res.render("助ける人用ページ",
        {
            title: 'Map',
        })
      });
});



module.exports = router;