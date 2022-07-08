const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    res.render("map",
        {
            title: 'Map',
            id: userId,
        })
});

module.exports = router;