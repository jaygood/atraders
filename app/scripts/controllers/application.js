'use strict';

angular.module('frameworkApp')

  .controller('ApplicationCtrl', ['$scope', 'userService', function ($scope, userService) {

    // watch login and logout
    // the user object is referenced and thus cannot be set directly to scope
    $scope.$watch(
      function(){
        return userService.isLoggedIn();
      },
      function (newVal, oldVal) {
        $scope.user = newVal;
      }
    );

    $scope.logout = function(){
      userService.logout();
    };
  }])
