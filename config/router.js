const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});
router.use('/auth', require('../app/controllers/auth'));

router.use('/ucm/', require('../app/controllers/ucm'));


module.exports = router;
