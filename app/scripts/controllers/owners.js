/*
 *  Control owners and owner view
 */

'use strict';
angular.module('frameworkApp')
  .controller('OwnersCtrl', ['$scope', '$routeParams', 'owners',
    function($scope, $routeParams, owners){
    owners.query(function(data){
      if(data[0] == "No Access"){
        $scope.errors = "Please log in";
      } else{
        $scope.owners = data;
      }
    });

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
