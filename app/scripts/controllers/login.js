/*
 *  Control interactions with the login and sign-up views
 *  between the token and the blurService
 */

'use strict';
angular.module('frameworkApp')
  .controller('LoginCtrl', ['$scope', 'blurService', 'token',
    function ($scope, blurService, token) {
      // Hash that keeps track of which inputs have been blurred
      $scope.blurHash = blurService.blurHash;
      $scope.user = token.formUser;

      // determines which view to show
      $scope.isSignupForm = token.isSignupRoute();

      // submits either the signup or login form
      // depending on the current view
      $scope.submit = function(user){
        if ($scope.userForm.$valid){
          token.submit(user);
        }
      };

      // called when user blurs an input
      $scope.addBlur = function(input){
        blurService.addBlur(input);
      };
  }]);
