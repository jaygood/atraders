'use strict';

angular.module('frameworkApp')
  .factory('Items', ['$resource', 'API_PATH', function($resource, API_PATH){
    return $resource(API_PATH + '/items/:id', {id: '@id'}, {
      update: { medthod: 'PUT' }
    });
  }]);
  //
  //
  // .controller('ResourceCtrl', function($scope, Items){
  //   // get
  //   var entry = Items.get({id: $scope.id}, function(){
  //     console.log(entry);
  //   });
  //
  //   // get all
  //   var entries = Items.query(function(){
  //     console.log(entries);
  //   });
  //
  //   // save
  //   $scope.entry = new Entry();
  //   $scope.entry.data = 'some data';
  //   Entry.save($scope.entry, function(){
  //   });
  //
  //   // update
  //   $scope.entry2 = User.get({id: $scope.id}, function(){
  //     $scope.entry2.data = 'something else';
  //     $scope.entry2.$update(function(){
  //     });
  //   });
  //
  //   // delete
  //   $scope.entry2 = User.get({id: $scope.id}, function(){
  //     $scope.entry2.data = 'something else';
  //     $scope.entry2.$delete(function(){
  //     });
  //   });
  // });
