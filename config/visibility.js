const vis = {
  validation: str => {
    return /public|unlisted|private|direct/.test(str);
  }
}
module.exports = vis;
