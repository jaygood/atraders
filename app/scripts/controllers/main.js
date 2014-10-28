/*
 *  Main page doing nothin at the moment
 */

'use strict';
angular.module('frameworkApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.one = 1;
    $scope.two = 2;
    $scope.awesomeThings = [
      'one',
      'two',
      'three'
    ];
  }]);
