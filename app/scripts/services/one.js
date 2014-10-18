'use strict';

angular.module('frameworkApp')
  .service('one', function () {
    this.x = 0;
    this.doit = function(){
      this.x++;
      return this.x;
    };
  })

  .factory('two', function () {
    var x = 0;
    return {
      doit: function(){
        x++;
        return x;
      }
    }
  });
