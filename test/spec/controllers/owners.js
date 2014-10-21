'use strict';

describe("Application Controller", function() {
  var ctrl, scope, $httpBackend;
  beforeEach(function(){
    module('frameworkApp');
  });
  beforeEach(inject(function($rootScope, $controller, $injector){
    scope = $rootScope.$new();
    ctrl = $controller('OwnersCtrl', { '$scope': scope });
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('OwnersCtrl', function(){
    it('should have access to owners service', function() {
      $httpBackend.expectGET('/site/api/owners')
        .respond([{}])
      $httpBackend.expectGET('/site/api/owners/1')
        .respond({id:1})
      scope.searchOwners(1);
      $httpBackend.flush();
      var result = scope.oneOwner;
      expect(result.id).toEqual(1);
    });
  });
});
