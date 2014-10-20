'use strict';
describe("Controller: Dashboard", function() {

  beforeEach(module('frameworkApp'));
  var ctrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('ApplicationCtrl', {
      $scope: $scope,
      $routeParams: {
        q: searchTestAtr
      }
    });
  }));
  
  it('should have a properly working VideosCtrl controller', inject(function($httpBackend) {
    var searchTestAtr = 'cars';
    var response = $httpBackend.expectJSONP(
      'https://gdata.youtube.com/feeds/api/videos?q=' + searchTestAtr + '&v=2&alt=json&callback=JSON_CALLBACK');
    response.respond(null);
  }));
});
