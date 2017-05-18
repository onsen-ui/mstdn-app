const express = require('express');
const router = express.Router();

router.use(require('../../../config/middlewares/save-app-name')('ucm'));

router.get('/', (req, res) => {
  res.render('ucm', {visibility: 'public'});
});

router.post('/post', require('../../../config/middlewares/authorization'));
router.use('/post', require('./post'));

module.exports = router;
