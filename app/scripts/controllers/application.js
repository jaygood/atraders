/*
 *  Controller to control top-level application decisions
 *  Displays the current user state
 */

'use strict';
angular.module('frameworkApp')
  .controller('ApplicationCtrl', ['$scope', 'User', 'Local', function ($scope, User, Local) {
    // watch login and logout
    // * simple assignment cannot be used
    // * because of the user object is not
    // * altered but redefined on login
    // $scope.$watch(function(){ return User.loggedIn; },
    //   function (newVal, oldVal){
    //     if(newVal !== oldVal || !$scope.user){
    //       $scope.user = newVal;
    //     }
    //   }
    // );
    $scope.user = User;

    $scope.error = {
      // if true, show message
      status: false,
      message: 'There is an error'
    };

    // bye-bye
    $scope.logout = function(){
      User.logout();
    };

    Local.set();

  }]);
