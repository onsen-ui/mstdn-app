function rand(num) {
  return Math.floor(Math.random() * num);
}
function sampling(arr) {
  return arr[rand(arr.length)];
}

const utils = {rand, sampling};
module.exports = utils;
