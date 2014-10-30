/*
 *  Service that shares a hash describing the current
 *  blur state of the input boxes
 */

'use strict';
angular.module('frameworkApp')
  .service('Blur', function () {
    // initialize and used for reset
    this.reset = (function me(that){
      // map holds values used to determine error messages on login form
      that.hash = {};
      return function(){me(that);};
    })(this);

    // called from login controllers
    // ng-blur="addBlur('username')"
    this.add = function(input){
      this.hash[input] = true;
    };
  });

  // test attempt at incorporating blurs into a directive
  // example: jd-blur="username"
  // .directive('jdBlur', function() {
  //   return {
  //     require : 'ngModel',
  //     link: function(scope, element, attrs, ngModel){
  //       element.bind('blur', function(event) {
  //         scope.$apply(function() {
  //           scope.blurHash[attrs.jdBlur] = true;
  //           // doesn't work because the form becomes invalid
  //           // ngModel.$setValidity('blurred', false);
  //         });
  //       });
  //     }
  //   }
  // });
