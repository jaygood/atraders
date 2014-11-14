/*
 *  Bars
 *
 */

'use strict';
angular.module('frameworkApp')
  .controller('BarCtrl', ['$scope', function ($scope) {
    $scope.myData = [10,20,30,40,60,100, 132];
  }]);
