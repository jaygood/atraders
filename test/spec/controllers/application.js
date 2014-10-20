'use strict';

describe("Application Controller", function() {
  var ctrl, scope;
  beforeEach(function(){
    module('frameworkApp');
  });

  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    ctrl = $controller('ApplicationCtrl', { '$scope': scope });
  }));

  describe('User', function(){
    it('should not be defined', function() {
      expect(scope.user).toBeUndefined();
    });
  });
});
