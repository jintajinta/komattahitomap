const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    knex
    .from('helps')
    .innerJoin(
        'tasks', 
        'helps.id', 
        'helps.task_id'
      )
      .select('*')
      .where({
        user_id: userId,
      })
      .then(function (result) {
        res.render("test", {
            results:result
          });
})
.catch(function (err) {
    res.render("test", {
      });
});

});




module.exports = router;