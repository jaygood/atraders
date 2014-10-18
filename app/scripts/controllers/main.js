'use strict';

angular.module('frameworkApp')
  .controller('MainCtrl', ['$scope', 'one', 'two', function ($scope, one, two) {
    $scope.one = one.x;
    $scope.two = two.doit();
    $scope.awesomeThings = [
      'one',
      'two',
      'three'
    ]
  }]);
