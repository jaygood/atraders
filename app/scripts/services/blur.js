'use strict';

angular.module('frameworkApp')
  .service('blurService', function () {
    this.resetBlurHash = (function me(that){
      // values used to determine error messages on login form
      that.blurHash = {
        username: false,
        password: false,
        email: false
      };
      return function(){me(that)};
    })(this);

    this.addBlur = function(input){
      this.blurHash[input] = true;
    };
  })
