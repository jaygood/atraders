'use strict';
angular.module('frameworkApp')

  .controller('DashCtrl', ['$scope', 'itemService',
    function ($scope, itemService) {
      $scope.items = itemService.items;
      $scope.item = {};

      $scope.eraseItem = function(key){
        itemService.removeItem(key);
      };

      $scope.editItem = function(key){
        $scope.item = itemService.editItem(key);
        $scope.item.key = key;
        if ('jdFocus' in $scope){
          $scope['jdFocus'].focus();
        }
      };

      $scope.submit = function(item){
        if ($scope.itemForm.$valid){
          itemService.submit(item);
          $scope.item = {};
          $scope.itemForm.$setPristine();
          if ($scope['jdFocus']){
            $scope['jdFocus'].focus();
          }
        }
      };
  }]);
