/*
 *  Control owners and owner view
 */

'use strict';
angular.module('frameworkApp')
  .controller('OwnersCtrl', ['$scope', '$routeParams', 'Owners',
    function($scope, $routeParams, Owners){
    Owners.query(function(data){
      if(data.status != 'success'){
        //$scope.errors = data.message;
      }else{
        $scope.owners = data.data;
      }
    });

    // initiation for input box
    $scope.oneOwner = {
      number: 1
    };
    // search database with the ownerNumb value
    $scope.searchOwners = function(arg){
      $scope.oneOwner = Owners.get({id: arg}, function(data){
        console.log(data);
      });
    };

    // currently only used for owner view
    if ($routeParams.owner){
      $scope.searchOwners($routeParams.owner);
    }
  }]);
