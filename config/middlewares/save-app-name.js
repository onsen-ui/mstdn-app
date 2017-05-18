module.exports = name => {
  return (req, res, next) => {
    req.session.appname = name;
    next();
  }
};
