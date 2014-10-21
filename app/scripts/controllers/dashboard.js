/*
 *  Controller to provide connection of itemService
 *  and a restricted view
 */

'use strict';
angular.module('frameworkApp')
  .controller('DashCtrl', ['$scope', 'itemService',
    function ($scope, itemService) {
      $scope.items = itemService.items;
      $scope.item = {};

      $scope.eraseItem = function(key){
        itemService.removeItem(key);
      };

      // keeps track of the item being edited by key
      $scope.editItem = function(key){
        $scope.item = itemService.editItem(key);
        $scope.item.key = key;
        // refocuses on first input to edit item
        if ('jdFocus' in $scope){
          $scope['jdFocus'].focus();
        }
      };

      $scope.submit = function(item){
        if ($scope.itemForm.$valid){
          itemService.submit(item);
          $scope.item = {};
          $scope.itemForm.$setPristine();
          // refocuses on first input to add new item
          if ($scope['jdFocus']){
            $scope['jdFocus'].focus();
          }
        }
      };
  }]);
