const fs        = require('fs');
const path      = require('path');
const express   = require('express');
const router    = express.Router();
const config    = require('../../config.json');

router.get('/', (req, res, next) => {
  res.render('editor', {title: `${config.name} Editor`});
});

module.exports = router;
