"use strict";

/**
 * @typedef TestObj
 * @type {Object}
 * @property {number} num Some number.
 */

/**
* 
* @typedef SACNUniverse
* @type {Object}
* @property {number[]} values The values of this universe for this source.
* @property {number} priority The universe priority for this source.
* @property {number[]} [perAddressPriority]  The priority of each address in this universe.
*  
*/

/**
 * Merges two universes of sACN input.
 * Uses perAddressPriority if available for a given source and the universe priority if not.
 * 
 * @param {SACNUniverse[]} sources An array of the sources.
 * 
 * @returns {number[]} 
 */
var merge_peraddress = function merge_peraddress(sources) {
  if (sources === undefined || sources === null || sources.length === 0)
  {
    return [];
  }
  return sources[0].values;  
}


/**
 * Merges two universes of sACN input.
 * Ignores perAddressPriority and just uses universe priority.
 * 
 * @param {SACNUniverse[]} sources An array of the sources.
 * 
 * @returns {number[]} 
 */
var merge_peruniverse = function merge_peruniverse(sources) {
  if (sources === undefined || sources === null || sources.length === 0)
  {
    return [];
  }
  return sources[0].values;  
}

/**
 * Merges two universes of sACN input.
 * Uses per-address priority by default, but can be set to run in per-universe priority mode.
 * (Note: If a universe does not have a per-address priority array, it will use the universe priority for all addresses.)
 * 
 * @param {SACNUniverse[]} sources An array of the sources.
 * @param {bool} [peraddress] Whether or not to use 
 * 
 * @returns {number[]} The merged values of the universe.
 */
var merge = function merge(sources, peraddress) {
  if (peraddress === undefined)
  {
    peraddress = true
  }
  if (peraddress)
  {
    return merge_peraddress(sources)
  } 
  else
  {
    return merge_peruniverse(sources)
  }
}

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
  calculate: calculate,
  merge: merge
};