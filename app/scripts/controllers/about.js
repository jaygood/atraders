/*
 *  Controller to test effects of services and factories
 *  used across multiple controllers and views
 */

'use strict';
angular.module('frameworkApp')
  .controller('AboutCtrl', ['$scope', 'one', 'two',
    function ($scope, one, two) {
      $scope.one = one.doit();
      $scope.two = two.doit();
  }]);
