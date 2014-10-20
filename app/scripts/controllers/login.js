'use strict';
angular.module('frameworkApp')

  .controller('LoginCtrl', ['$scope', 'userService', 'blurService',
    function ($scope, userService, blurService) {
      $scope.blurHash = blurService.blurHash;
      $scope.user = userService.formUser;
      $scope.isSignupForm = userService.isSignupRoute();

      $scope.submit = function(user){
        if ($scope.userForm.$valid){
          userService.submit(user)
            .then(function(data) {
              // do nothin right now
            });
        }
      };

      $scope.addBlur = function(input){
        blurService.addBlur(input);
      };
  }])
