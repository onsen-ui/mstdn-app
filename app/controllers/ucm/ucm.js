const utils = require('../../../config/utils');
const UCMS = ['うんこ', 'ちんこ', 'まんこ'];

function ucmOnce() {
  return Array(3).fill(UCMS).map(utils.sampling).join('');
}

function ucm(num) {
  return Array(num).fill(0).map(ucmOnce).join('\n');
}

module.exports = ucm;
