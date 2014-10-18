'use strict';

angular.module('frameworkApp')
  .controller('AboutCtrl', ['$scope', 'one', 'two',
    function ($scope, one, two) {
      $scope.one = one.doit();
      $scope.two = two.doit();
  }]);
