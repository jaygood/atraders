'use strict';

describe('Controller: AppCtrl', function () {

  // load the controller's module
  beforeEach(module('frameworkApp'));

  var AppCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppCtrl = $controller('ApplicationCtrl', {
      $scope: scope
    });
  }));

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
