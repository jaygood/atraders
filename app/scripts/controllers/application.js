/*
 *  Controller to control top-level application decisions
 *  Displays the current user state
 */

'use strict';
angular.module('frameworkApp')
  .controller('ApplicationCtrl', ['$scope', 'token', function ($scope, token) {
    // watch login and logout
    // * simple assignment cannot be used
    // * because of the user object is not
    // * altered but redefined on login
    $scope.$watch(token.getUser,
      function (newVal, oldVal){
        if(newVal !== oldVal || !$scope.user){
          $scope.user = newVal;
        }
      }
    );

    $scope.error = {
      // if true, show message
      status: false,
      message: 'There is an error'
    };

    // bye-bye
    $scope.logout = function(){
      token.logout();
    };
  }]);
