'use strict';

describe("Unit: Controllers", function() {
  var ctrl, scope;
  beforeEach(function(){
    module('frameworkApp');
  });

  describe('Routing', function(){
    beforeEach(inject(function($rootScope, $controller){
      scope = $rootScope.$new();
      ctrl = $controller('LoginCtrl', { '$scope': scope });
    }));

    it('should map routes to controllers', function() {
      inject(function($route) {
        //jasmine.log($route.routes);
        console.log($route.routes);

        describe('home', function(){
          expect($route.routes['/'].controller).toBe('MainCtrl');
          expect($route.routes['/'].templateUrl).toEqual('views/main.html');
        })

        describe('home', function(){
          expect($route.routes['/owners'].controller).toBe('PhpCtrl');
          expect($route.routes['/owners'].templateUrl).toEqual('views/phpUsers.html');
        })

        // otherwise redirect to
        expect($route.routes[null].redirectTo).toEqual('/')
      });
    });
  });
});
