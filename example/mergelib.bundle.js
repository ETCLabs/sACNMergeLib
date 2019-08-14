(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mergelib = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/**
* 
* @typedef SACNUniverse
* @type {Object}
* @property {number[]} values The values of this universe for this source.
* @property {number} priority The universe priority for this source.
* @property {number[]} [perAddressPriority]  The priority of each address in this universe.
*  
*/

var getArray = function getArray(length, value) {
  var x = Array(length);
  for (var i = 0; i < length; i++)
  {
    x[i] = value;
  }
  return x;
}

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
  for (var i = 0; i < sources.length; i++)
  {
    if (sources[i].perAddressPriority === undefined)
    {
      sources[i].perAddressPriority = getArray(sources[i].values.length, sources[i].priority);
    }
  }
  return merge_allperaddr(sources);
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
  for (var i = 0; i < sources.length; i++)
  {
    var pri = sources[i].priority
    if (pri === undefined || pri === 0)
      pri = 0.5;
    sources[i].perAddressPriority = getArray(sources[i].values.length, pri);
  }
  return merge_allperaddr(sources);
}

/**
 * Merges two universes of sACN input.
 * Assumes that all sources have had their inputs defined by 
 * 
 * @param {SACNUniverse[]} sources 
 * @returns {number[]} Merged values.
 */
var merge_allperaddr = function merge_allperaddr(sources) {
  
  var maxlen = 0;
  sources.forEach(function(source){
    //console.log("Looking at source with priority" + source.priority);
    if (source.values.length > maxlen)
      maxlen = source.values.length;
  });
  maxlen = Math.min(maxlen, 512);

  var outarr = [];
  for (var address = 0; address < maxlen; address++)
  {
    var high_pri = 0.1;
    var high_val = 0;
    for (var source_idx = 0; source_idx < sources.length; source_idx++)
    {
      if (sources[source_idx].perAddressPriority.length > address && sources[source_idx].values.length > address)
      {
        if(sources[source_idx].perAddressPriority[address] > high_pri)
        {
          high_pri = sources[source_idx].perAddressPriority[address];
          high_val = sources[source_idx].values[address];
        }
        else if (sources[source_idx].perAddressPriority[address] === high_pri && sources[source_idx].values[address] > high_val)
        {
          high_val = sources[source_idx].values[address];
        }
      }
    }
    outarr.push(high_val);
  }
  return outarr;
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
