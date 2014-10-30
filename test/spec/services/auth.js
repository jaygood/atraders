
'use strict';
describe('Services: Login', function () {
  var mockResource, $httpBackend, rootScope, path, _headers, $http, Auth, User,
      _user = {
        name: 'jon2',
        pass:'pass',
        isSigningUp: function(){
          return false;
        }
      };
  beforeEach(angular.mock.module('frameworkApp'));
  beforeEach(function(){
    module('frameworkApp');
  });
  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      User = $injector.get('User');
      Auth = $injector.get('Auth');
      path = $injector.get('API_PATH');
      $http = $injector.get('$http');
      _headers  = $http.defaults.headers.common;
      // included because of the 'login' event emitted in userService
      rootScope = $injector.get('$rootScope');
      spyOn(rootScope, '$emit');
    });
  });
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('assignHeaders success', function () {
    it('should give a value to auth-token', function () {
      $httpBackend.expectPOST(path + '/login')
        .respond({status: 'success', data: 'token'});
      expect(_headers['name']).toBe('guest');
      Auth.assignHeaders(_user, function(name){});
      expect(_headers['name']).toBe('jon2');
      expect(_headers['auth-token']).toBe(undefined);
      $httpBackend.flush();
      expect(_headers['auth-token']).toEqual('token');
    });
  });

  describe('assignHeaders failure', function () {
    it('should not give a value to auth-token', function () {
      $httpBackend.expectPOST(path + '/login')
        .respond({status: 'error', data: 'token'});
      Auth.assignHeaders(_user, function(name){});
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
