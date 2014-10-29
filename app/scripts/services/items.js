/*
 *  API for items used on diagnostics sheet
 *
 */


'use strict';
angular.module('frameworkApp')
  .factory('Items', ['$resource', 'API_PATH', function($resource, API_PATH){
    return $resource(API_PATH + '/items/:id', {id: '@id'}, {
      update: { method:  'PUT' },
      query:  { isArray: true}
    });
  }])

  .factory('Items.mock', function () {
    var funct = function(){
      this.$update= function(cb){
        _items[_search(this.id, _items)] = this;
      };
      this.$save= function(cb){
        _items.push(this);
      };
      this.$delete= function(cb){
        _items.splice(_search(this.id, _items), 1);
      };
    };
    funct.query = function(cb){
      cb(_items)
      return _items;
    };

    var _search = function (id, myArray){
      for (var i=0, len=myArray.length; i < len; i++) {
        if (myArray[i].id === id) {
          return i;
        }
      }
      return null;
    };

    function Item(id, name, phrase){
      var item = new funct();
      item.id = id;
      item.name = name;
      item.phrase = phrase;
      return item;
    }
    var item1 = Item(0, 'jon', 'hello'),
        item2 = Item(1, 'jon', 'hello for secnod time'),
        item3 = Item(2, 'jon', 'hello for third time'),
        _items = [item1, item2, item3];

    return funct;
  });
