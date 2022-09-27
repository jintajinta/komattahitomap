const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const userId = req.session.userid;
    const isAuth = Boolean(userId);
    knex
    .select('*')
    .from('tasks')
    .innerJoin(
        'tasks', 
        'tasks.id', 
        '=', 
        'helps.task_id'
      )
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