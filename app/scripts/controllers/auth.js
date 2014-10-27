/*
 *  Control owners and owner view
 */

'use strict';
angular.module('frameworkApp')
  .controller('AuthCtrl', ['$scope', '$routeParams', '$http', 'myAuth', 'token',
    function($scope, $routeParams, $http, myAuth, token){
    $scope.owners = myAuth.save();

    $scope.submit = function(user){
      token.submit(user);
      $scope.owners = token.user.user;
      //$scope.oneOwner.data = owners.get({id: arg});
    };
  }]);
