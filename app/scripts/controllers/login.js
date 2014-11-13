/*
 *  Control interactions with the login and sign-up views
 *  between the User and the blurService
 */

'use strict';
angular.module('frameworkApp')
  .controller('LoginCtrl', ['$scope', 'Blur', 'User',
    function ($scope, Blur, User) {
      // Map that keeps track of which inputs have been blurred
      $scope.blur = Blur;
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

      $scope.reset = function(){
        User.resetUser();
        $scope.userForm.$setPristine();
      };
  }]);
