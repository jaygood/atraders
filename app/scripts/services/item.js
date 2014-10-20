'use strict';

angular.module('frameworkApp')
  .service('itemService', ['Items', function (Items) {
    var create, read, readAll, update, del;
    this.items = {
      0: {itemname: "Jon0", phrase: "Hello"},
      1: {itemname: "Jon1", phrase: "Hello"},
      2: {itemname: "Jon2", phrase: "Hello"},
      3: {itemname: "Jon3", phrase: "Hello"}
    };

    this.submit = function(item){
      var newKey = 0;
      if (item.key){
        delete this.items[item.key].key
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
