const express = require('express');
const router = express.Router();
const ucm = require('./ucm');
const Mastodon = require('mastodon-api');

router.use(require('./post-validation'));
router.post('/', (req, res) => {
  const visibility = req.body.visibility;
  const num = parseInt(req.body.num, 10);

  const M = new Mastodon({
    access_token: req.session.access_token,
    timeout_ms: 60 * 1000,
    api_url: 'https://mstdn.jp/api/v1/'
  });

  const result = ucm(num);
  let send;
  if (num === 1) {
    send = {
      status: `うちまガチャ！\n${result}`,
      visibility: visibility
    };
  } else {
    send = {
      status: result,
      spoiler_text: `うちま${num}連ガチャ！`,
      visibility: visibility
    };
  }

  M.post('statuses', send)
  .then(() => {
    res.redirect('https://mstdn.jp/web/timelines/public/local');
  })
  .catch(err => {
    req.session.err = err;
    res.redirect('/ucm');
  });
});

module.exports = router;
