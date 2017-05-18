const express = require('express');
const router = express.Router();
const Mastodon = require('mastodon-api');

require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const INSTANCE_URL = 'https://mstdn.jp';

const REDIRECT_URL = BASE_URL + '/auth/callback';
const AUTH_API_URL = INSTANCE_URL + '/api/v1/apps';

router.get('/', (req, res) => {
  Mastodon.createOAuthApp(AUTH_API_URL, '♨️', 'write', REDIRECT_URL).then(data => {
    req.session.client_id = data.client_id;
    req.session.client_secret = data.client_secret;
    Mastodon.getAuthorizationUrl(data.client_id, data.client_secret, INSTANCE_URL, 'write', REDIRECT_URL)
    .then(url => res.redirect(url));
  });
});

router.get('/callback', (req, res) => {
  const redirectUrl = '/' + (req.session.appname || '');
  if (req.query.error) {
    res.redirect(redirectUrl);
  }

  Mastodon.getAccessToken(req.session.client_id, req.session.client_secret, req.query.code, INSTANCE_URL, REDIRECT_URL)
  .then(data => {
    req.session.access_token = data;
    res.redirect(redirectUrl);
  })
  .catch(err => {
    res.render('error', {
      message: err.message,
      error: err
    });
  });
});

module.exports = router;
