const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
        res.render("helpuser",
        {
            title: '助ける人用ページ',
        })
});
module.exports = router;