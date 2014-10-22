/*
 *  Control owners and owner view
 */

'use strict';
angular.module('frameworkApp')
  .controller('OwnersCtrl', ['$scope', '$routeParams', 'ownersMock',
    function($scope, $routeParams, owners){
    $scope.owners = owners.query();

    // initiation for input box
    $scope.oneOwner = {
      number: 1
    };
    // search database with the ownerNumb value
    $scope.searchOwners = function(arg){
      $scope.oneOwner.data = owners.get({id: arg});
    };

    // currently only used for owner view
    if ($routeParams.owner){
      $scope.searchOwners($routeParams.owner);
    }
  }]);
