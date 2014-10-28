'use strict';

angular.module('frameworkApp')
  .factory('Items', ['$resource', 'API_PATH', function($resource, API_PATH){
    return $resource(API_PATH + '/items/:id', {id: '@id'}, {
      update: { method: 'PUT' }
    });
  }])
  .controller('DashCtrl', ['$scope', 'itemService', 'Items',
    function ($scope, itemService, Items) {
      $scope.item = new Items;

      // query
      $scope.items = Items.query();

      $scope.submit = function(item){
        if ($scope.itemForm.$valid){
          if($scope.item.id){
            $scope.putItem($scope.item.id);
          }else{
            $scope.postItem();
          }
          $scope.item = new Items;
          $scope.itemForm.$setPristine();
          // refocuses on first input to add new item
          if ('jdFocus' in $scope){
            $scope.jdFocus.focus();
          }
        }
      };

      // save
      $scope.postItem = function(){
        $scope.item.$save(function(){
          $scope.items = Items.query();
        });
      };

      $scope.editItem = function(_id){
        $scope.item = Items.get({ id: _id});
      };
      // update
      $scope.putItem = function(_id){
        console.log('updatin')
        $scope.item.$update(function(){
          console.log('successin')
          $scope.items = Items.query();
        });
      };

      // delete
      $scope.deleteItem = function(_id){
        console.log('deletin')
        $scope.item = Items.get({ id: _id}, function(){
          $scope.item.$delete(function(){
            console.log('successin')
            $scope.items = Items.query();
          });
        });
      };
  }])

  .service('itemService', ['Items', function (Items) {
    var create, read, readAll, update, del;
    this.items = {
      0: {name: 'Jon0', phrase: 'Hello'},
      1: {name: 'Jon1', phrase: 'Hello'},
      2: {name: 'Jon2', phrase: 'Hello'},
      3: {name: 'Jon3', phrase: 'Hello'}
    };

    this.submit = function(item){
      var newKey = 0;
      if (item.key){
        delete this.items[item.key].key;
      }
      else {
        while(this.items[newKey]){
          newKey++;
        }
        this.items[newKey] = item;
      }
    };

    this.removeItem = function(key){
      delete this.items[key];
      // this.items.splice(this.items.indexOf(item), 1);
    };

    this.editItem = function(key){
      return this.items[key];
    };

    create = function(){
      var item = new Items();
      item.data = 'some data';
      Items.save(item, function(){
        console.log('create: ', item);
      });
    };

    read = function(myId){
      var item = Items.get({id: myId}, function(){
        console.log('read: ', item);
      });
    };

    readAll = function(){
      var items = Items.query(function(){
        console.log(items);
      });
    };

    update = function(myId){
      var item = Items.get({id: myId}, function(){
        item.data = 'something else';
        item.$update(function(){
          console.log('update: ', item);
        });
      });
    };

    del = function(myId){
      var item = Items.get({id: myId}, function(){
        item.$delete(function(){
          console.log('delete: ', item);
        });
      });
    };
  }]);
