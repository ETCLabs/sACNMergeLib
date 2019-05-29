(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.calc = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  //console.log("new run");
  if (sources === undefined || sources === null || sources.length === 0)
  {
    return [];
  }
  var maxlen = 0;
  var highestPriority = -1;
  var highPriorityCount = 0;
  sources.forEach(function(source){
    //console.log("Looking at source with priority" + source.priority);
    if (source.values.length > maxlen)
      maxlen = source.values.length;
    if (source.priority === undefined)
      source.priority = 0;
    if (source.priority > highestPriority)
    {
      highestPriority = source.priority;
      highPriorityCount = 1;
      //console.log("Highest priority is now " + source.priority) ;
    }
    else if (source.priority === highestPriority)
    {
      highPriorityCount++;
    }
  });
  if (highPriorityCount === 1)
  {
    for (var i = 0; i < sources.length; i++)
    {
      var source = sources[i];
      //console.log("Searching for highest priority " + highestPriority + " with current source " + source.priority);
      if (source.priority === highestPriority)
        return source.values;
    }
  }
  else
  {
    // TODO: Merge.
    for (i = 0; i < sources.length; i++)
    {
      source = sources[i];
      //console.log("Searching for highest priority " + highestPriority + " with current source " + source.priority);
      //console.log(source.values);
      if (source.priority === highestPriority)
      {
        //console.log("found it");
        return source.values;
      }
    }
  }
  return []

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
    peraddress = true;
  }
  if (peraddress)
  {
    return merge_peraddress(sources);
  } 
  else
  {
    return merge_peruniverse(sources);
  }
}

module.exports = {
  merge: merge, 
  merge_peraddress: merge_peraddress,
  merge_peruniverse: merge_peruniverse
};
},{}]},{},[1])(1)
});
