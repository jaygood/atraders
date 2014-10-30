/*
 *  Test User service
 *
 */

'use strict';
describe('Services: Login', function () {
  var $httpBackend, rootScope, path, User, $location;
  beforeEach(angular.mock.module('frameworkApp'));

  // Inject services
  beforeEach(angular.mock.inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    User = $injector.get('User');
    path = $injector.get('API_PATH');
    $location = $injector.get('$location');
    // included because of the 'login' event emitted in userService
    rootScope = $injector.get('$rootScope');
    spyOn(rootScope, '$emit');
  }));

  // configure services and variables
  beforeEach(function () {});

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('LOGIN and LOGOUT', function () {
    it('should log user in and out', inject(function () {
      $httpBackend.expectPOST(path + '/login')
        .respond({status: 'success', data: 'token'});
      expect(User.name).toBe(undefined);
      expect(User.pass).toBe(undefined);
      expect(User.loggedIn).toBe(false);
      User.name = 'jon2';
      User.pass = 'pass';
      User.login(User);
      $httpBackend.flush();
      expect(User.name).toBe('jon2');
      expect(User.pass).toBe(undefined);
      expect(User.loggedIn).toBe(true);

      User.logout();
      expect(User.name).toBe(undefined);
      expect(User.loggedIn).toBe(false);
    }));
  });

  describe('isSigningUp', function () {
    it('be based on location path', inject(function () {
      $location.path('/login');
      expect(User.isSigningUp()).toBe(false);
      $location.path('/signup');
      expect(User.isSigningUp()).toBe(true);
    }));
  });
});
