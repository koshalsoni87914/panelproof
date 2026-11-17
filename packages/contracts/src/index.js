'use strict';

const errors = require('./errors');
const claim = require('./claim');
const verdict = require('./verdict');
const envelope = require('./envelope');
const receipt = require('./receipt');

module.exports = {
  ...errors,
  ...claim,
  ...verdict,
  ...envelope,
  ...receipt
};
