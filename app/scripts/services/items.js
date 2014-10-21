'use strict';

angular.module('frameworkApp')
  .factory('Items', function ($resource) {
    return $resource('/data/:id', {id: '@id'}, {
      update: {
        medthod: 'PUT',
        headers: { 'auth-token': 'C3PO R2D2' }
      }
    });
  });
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
