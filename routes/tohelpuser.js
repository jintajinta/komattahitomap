const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
        res.render("map",
        {
            title: '助けられる人用ページ',
        })
});
module.exports = router;