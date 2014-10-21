/*
 *  Service that shares a hash describing the current
 *  blur state of the input boxes
 */

'use strict';
angular.module('frameworkApp')
  .service('blurService', function () {
    // initialize and used for reset
    this.resetBlurHash = (function me(that){
      // values used to determine error messages on login form
      that.blurHash = {
        username: false,
        password: false,
        email: false
      };
      return function(){me(that)};
    })(this);

    // called from login controllers
    this.addBlur = function(input){
      this.blurHash[input] = true;
    };
  })
