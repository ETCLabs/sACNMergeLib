(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.calc = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
const calculate = (input) => {
  if (input === undefined || input === null) {
    return [];
  }

  const rtn = [];
  input.forEach((obj) => {
    rtn.push(obj.num + 2);
  });
  return rtn;
};

module.exports = {
  calculate,
};

},{}]},{},[1])(1)
});
