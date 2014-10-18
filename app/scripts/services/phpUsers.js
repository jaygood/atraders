"use strict";

angular.module("frameworkApp")
  .factory("phpOwners", function ($resource) {
    return $resource("/site/api/owners/:id", {}, {
      query: {
        method: "GET",
        isArray: true
      }
    })
  })

  .controller("PhpCtrl", function($scope, phpOwners){
    $scope.owners = phpOwners.query();

    $scope.ownerNumb = 1;
    $scope.searchOwners = function(arg){
      $scope.oneOwner = phpOwners.get({id: arg});
    };
  })

  .controller("OwnerCtrl", function($scope, phpOwners, $routeParams){
    $scope.oneOwner = phpOwners.get({id: $routeParams.owner});
  })
