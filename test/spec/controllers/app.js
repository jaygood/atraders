'use strict';

describe("Unit: Controllers", function() {

  beforeEach(module('frameworkApp'));

  it('should have a LoginCtrl controller', function() {
    expect(frameworkApp.LoginCtrl).not.to.equal(null);
  });

  it('should map routes to controllers', function() {
    inject(function($route) {
      //jasmine.log($route.routes);
      console.log($route.routes);
      expect($route.routes['/'].controller).toBe('MainCtrl');
      expect($route.routes['/about'].templateUrl).toEqual('views/about.html');

      // otherwise redirect to
      expect($route.routes[null].redirectTo).toEqual('/')
    });
  });
});
