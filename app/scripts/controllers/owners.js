'use strict';
angular.module('frameworkApp')

  .controller('OwnersCtrl', ['$scope', '$routeParams', 'owners',
    function($scope, $routeParams, owners){
    $scope.owners = owners.query();

    $scope.ownerNumb = 1;
    $scope.searchOwners = function(arg){
      $scope.oneOwner = owners.get({id: arg});
    };

    $scope.oneOwner = owners.get({id: $routeParams.owner});
  }]);
