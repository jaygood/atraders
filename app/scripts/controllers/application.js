/*
 *  Controller to control top-level application decisions
 *  Displays the current user state
 */

'use strict';
angular.module('frameworkApp')
  .controller('ApplicationCtrl', ['$scope', 'userService', function ($scope, userService) {
    // watch login and logout
    // * simple assignment cannot be used
    // * because of the user object is not
    // * altered but redefined on login
    $scope.$watch(
      function(){
        return userService.isLoggedIn();
      },
      function (newVal, oldVal) {
        $scope.user = newVal;
      }
    );

    // bye-bye
    $scope.logout = function(){
      userService.logout();
    };
  }])
