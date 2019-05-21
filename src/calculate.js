"use strict";

/**
 * @typedef TestObj
 * @type {Object}
 * @property {number} num Some number.
 */

/**
 * Example function that takes an array of objects and
 * returns an array.
 * @param {TestObj[]} input an array of input objects
 * @returns {number[]} an array of numbers
 */
var calculate = function calculate(input) {
  if (input === undefined || input === null) {
    return [];
  }

  var rtn = [];
  input.forEach(function (obj) {
    rtn.push(obj.num + 2);
  });
  return rtn;
};

module.exports = {
  calculate: calculate
};