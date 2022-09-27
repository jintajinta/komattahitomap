const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    knex('helps')
    .select('*').then(function (results) {
    res.render('test', {
        results: results,
    });
})
.catch(function (err) {
    console.error(err);
    res.redirect('/map');
});

});




module.exports = router;