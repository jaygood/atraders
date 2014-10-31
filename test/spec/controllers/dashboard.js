
/*
 *  Test Dash Controller
 *
 */


'use strict';
describe('Owners Controller', function() {
  var Resource = function(id, name, phrase){
    this.id = id;
    this.name = name;
    this.phrase = phrase;
  };

  // find resource with id in myArray
  var _search = function (id, myArray){
    for (var i=0, len=myArray.length; i < len; i++) {
      if (myArray[i].id === id){ return i; }
    }
    return null;
  };

  Resource.prototype = {
    $save: function(){
      // if exists, update rather than create
      this.id ? data[_search(this.id, data)] = this :
                data.push(this);
    },
    $delete: function(){
      data.splice(_search(this.id, data), 1);
    }
  };
  Resource.query = function(cb){
    cb(data);
    return data;
  };

  var ctrl, scope, $httpBackend, path, $location, $routeParams, Items,
      data = [new Resource(0, 'jon', 'hello'),
              new Resource(1, 'jon', 'hello for secnod time'),
              new Resource(2, 'jon', 'hello for third time')];;

  beforeEach(function(){module('frameworkApp');});
  // Inject services
  beforeEach(inject(function($rootScope, $controller, $injector){
    scope = $rootScope.$new();
    ctrl = $controller('DashCtrl', { '$scope': scope });
    path = $injector.get('API_PATH');
    Items = $injector.get('Items');
    $httpBackend = $injector.get('$httpBackend');
  }));

  // configure services and variables
  beforeEach(function(){
    $httpBackend.expectGET(path + '/items')
      .respond(data);
    $httpBackend.flush();
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('OwnersCtrl on owners view', function(){
    it('should have query', function() {
      expect(scope.items.length).toEqual(3);
    });
    it('should instance a new item', function() {
      expect(scope.item).not.toBe(undefined);
    });

    // it('should have delete', function() {
    //   $httpBackend.expectDELETE(path + '/items/1')
    //     .respond();
    //   scope.deleteItem(scope.items[1]);
    //   $httpBackend.expectGET(path + '/items')
    //     .respond(data);
    //   $httpBackend.flush();
    //   expect(scope.items).toEqual(2);
    // });
  });
});
