/*
 *  Control interactions with the login and sign-up views
 *  between the User and the blurService
 */

'use strict';
angular.module('frameworkApp')
  .controller('LoginCtrl', ['$scope', 'blurService', 'User',
    function ($scope, blurService, User) {
      // Hash that keeps track of which inputs have been blurred
      $scope.blurHash = blurService.blurHash;
      $scope.user = User;

      // determines which view to show
      $scope.isSignupForm = User.isSigningUp();

      // submits either the signup or login form
      // depending on the current view
      $scope.submit = function(user){
        if ($scope.userForm.$valid){
          User.login(user);
        }
      };

      // called when user blurs an input
      $scope.addBlur = function(input){
        blurService.addBlur(input);
      };
  }]);
