module.exports = (req, res, next) => {
  if (!req.session.access_token) {
    res.redirect('/auth');
    return;
  }
  next();
};
