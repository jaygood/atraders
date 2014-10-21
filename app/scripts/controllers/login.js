/*
 *  Control interactions with the login and sign-up views
 *  between the userService and the blurService
 */

'use strict';
angular.module('frameworkApp')
  .controller('LoginCtrl', ['$scope', 'userService', 'blurService',
    function ($scope, userService, blurService) {
      // Hash that keeps track of which inputs have been blurred
      $scope.blurHash = blurService.blurHash;
      $scope.user = userService.formUser;

      // determines which view to show
      $scope.isSignupForm = userService.isSignupRoute();

      // submits either the signup or login form
      // depending on the current view
      $scope.submit = function(user){
        if ($scope.userForm.$valid){
          userService.submit(user)
            .then(function(){ // data) {
              // do nothin right now
            });
        }
      };

      // called when user blurs an input
      $scope.addBlur = function(input){
        blurService.addBlur(input);
      };
  }]);
