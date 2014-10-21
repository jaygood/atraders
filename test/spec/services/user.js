'use strict';
describe('Services: Users', function () {
  var mockResource, $httpBackend, rootScope;
  beforeEach(angular.mock.module('frameworkApp'));
  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockResource = $injector.get('userService');
      // included because of the 'login' event emitted in userService
      rootScope = $injector.get('$rootScope');
      spyOn(rootScope, '$emit');
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('LOGIN and LOGOUT', function () {
    it('should log user in and out', inject(function () {
      $httpBackend.expectGET('data.json')
        .respond({"jon1": {"username": "jon1", "password": "pass"}});

      mockResource.submit({"username": "jon1", "password": "pass"});
      $httpBackend.flush();
      var result = mockResource.isLoggedIn();
      expect(result.username).toBe('jon1');
      mockResource.logout();
      expect(mockResource.isLoggedIn()).toBe(false);
    }));
  });

  describe('SIGNUP', function () {
    it('should log user in', inject(function ($location) {
      // userService POSTs for signup and GETs for login route
      $location.path('/signup');
      // there is no need to load the view for the unit test
      $httpBackend.whenGET('views/login.html').respond('');
      $httpBackend.whenPOST('data.json').respond({});
      mockResource.submit({"username": "jon7", "password": "pass"});
      $httpBackend.flush();
      var result = mockResource.isLoggedIn();
      expect(result.username).toBe('jon7');
    }));
  });
});
