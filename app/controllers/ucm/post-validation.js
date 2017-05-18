const vis = require('../../../config/visibility.js');

module.exports = (req, res, next) => {
  const visibility = req.body.visibility;
  const num = parseInt(req.body.num, 10);

  if (!vis.validation(visibility)) {
    res.redirect('/ucm');
    return;
  }
  if (!num || num <= 0 || 40 < num) {
    res.redirect('/ucm');
    return;
  }

  next();
};
