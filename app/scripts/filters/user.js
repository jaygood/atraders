/*
 *  Accesses the API
 */

'use strict';
angular.module('frameworkApp')
  .factory('userFilter', function () {
    return function(input, lowercase) {
      if(input){
        return 'User: ' + (lowercase ? input.username.toLowerCase() : input.username);
      }else{
        return 'framework';
      }
    };
  });
