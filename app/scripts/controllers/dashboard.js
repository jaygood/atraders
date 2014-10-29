/*
 *  Controller to provide connection of Items
 *  and a restricted view
 */

'use strict';
angular.module('frameworkApp')
  .controller('DashCtrl', ['$scope', 'Items',
    function ($scope, Items) {
      $scope.item = new Items;
      // query
      var _requery = (function me(){
        Items.query(function(data){
          $scope.items = data;
        });
        return me;
      })();

      // delete
      $scope.deleteItem = function(item){
        item.$delete(_requery);
      };

      // update or save
      $scope.submit = function(item){
        if ($scope.itemForm.$valid){
          // if the item exists, update... if not, save new
          item.$save(_requery);
          // if(item.id || item.id === 0){
          //   item.$update(_requery);
          // } else{
          //   item.$save(_requery);
          // }
          $scope.item = new Items;
          $scope.itemForm.$setPristine();
          // refocuses on first input to add new item
          if ('jdFocus' in $scope) $scope.jdFocus.focus();
        }
      };

      $scope.editItem = function(item){
        $scope.item = item;
        if ('jdFocus' in $scope) $scope.jdFocus.focus();
      };
  }]);
