/*
 *  Percent filter
 *  filter the input to a certain number
 *  of decimal places if needed
 */

'use strict';
angular.module('frameworkApp')
  .factory('percentFilter', function () {
    return function(dividend, divisor, decPlaces) {
      var ret = 100 * dividend / divisor;
      if(decPlaces){ ret = ret.toFixed(decPlaces).replace(/\.00$/, ''); }
      return ret + '%';
    };
  });
