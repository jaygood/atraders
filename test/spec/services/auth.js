/*
 *  Test Auth service
 *
 */

'use strict';
describe('Services: Login', function () {
  var $httpBackend, rootScope, path, _headers, $http, $location, Auth, User;
  beforeEach(angular.mock.module('frameworkApp'));

  // Inject services
  beforeEach(angular.mock.inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    User = $injector.get('User');
    Auth = $injector.get('Auth');
    path = $injector.get('API_PATH');
    $http = $injector.get('$http');
    $location = $injector.get('$location');
    // included because of the 'login' event emitted in userService
    rootScope = $injector.get('$rootScope');
    spyOn(rootScope, '$emit');
  }));

  // configure services and variables
  beforeEach(function () {
    User.name = 'jon2';
    User.pass = 'pass';
    _headers  = $http.defaults.headers.common;
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Login assignHeaders success', function () {
    it('should give a value to auth-token', function () {
      $httpBackend.expectPOST(path + '/login')
        .respond({status: 'success', data: 'token'});
      expect(_headers['name']).toBe('guest');
      Auth.assignHeaders(User, function(name){});
      expect(_headers['name']).toBe('jon2');
      expect(_headers['auth-token']).toBe(undefined);
      $httpBackend.flush();
      expect(_headers['auth-token']).toEqual('token');
    });
  });

  describe('Signup assignHeaders success', function () {
    it('should give a value to auth-token', function () {
      $location.path('/signup');
      $httpBackend.expectPOST(path + '/login')
        .respond({status: 'success', data: 'token'});
      expect(_headers['email']).toBe(undefined);
      User.email = 'jon@jon.jon';
      Auth.assignHeaders(User, function(name){});
      $httpBackend.flush();
      expect(_headers['auth-token']).toEqual('token');
      expect(_headers['email']).toEqual('jon@jon.jon');
    });
  });

  describe('assignHeaders failure', function () {
    it('should not give a value to auth-token', function () {
      $httpBackend.expectPOST(path + '/login')
        .respond({status: 'error', data: 'token'});
      Auth.assignHeaders(User, function(name){});
      $httpBackend.flush();
      expect(_headers['auth-token']).toBe(undefined);
    });
  });

  describe('removeHeaders', function () {
    it('should delete header values', function () {
      Auth.removeHeaders();
      expect(_headers['name']).toBe('guest');
      expect(_headers['auth-token']).toBe(undefined);
      expect(_headers['email']).toBe(undefined);
      expect(_headers['pass']).toBe(undefined);
    });
  });
});
