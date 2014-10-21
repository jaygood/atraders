'use strict';

describe('LoginCtrl', function() {
  beforeEach(function(){
    module('frameworkApp');
  });
  var ctrl, scope;
  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    ctrl = $controller('LoginCtrl', { '$scope': scope });
  }));

  // it('sets the name', function () {
  //   expect(scope.user.username).toBe('');
  // });
  //
  // it('watches the name and updates the counter', function () {
  //     expect(scope.counter).toBe(0);
  //     scope.name = 'Batman';
  //     scope.$digest();
  //     expect(scope.counter).toBe(1);
  // });
});
//     describe('CtrlHttp', function () {
//
//         var $httpBackend,
//             expectedUrl = '/someUrl?key1=value1',
//             promise,
//             successCallback,
//             errorCallback,
//             httpController;
//
//         beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
//             $httpBackend = _$httpBackend_;
//             scope = $rootScope.$new();
//             successCallback = jasmine.createSpy();
//             errorCallback = jasmine.createSpy();
//             httpController = $controller('CtrlHttp', {
//                 '$scope': scope
//             });
//         }));
//
//         afterEach(function() {
//             $httpBackend.verifyNoOutstandingExpectation();
//             $httpBackend.verifyNoOutstandingRequest();
//         });
//
//         it('returns http requests successfully and resolves the promise', function () {
//             var data = '{"translationKey":"translationValue"}';
//             expect(httpController).toBeDefined();
//             $httpBackend.expectGET(expectedUrl).respond(200, data);
//             promise = scope.getHttp();
//             promise.then(successCallback, errorCallback);
//
//             $httpBackend.flush();
//
//             expect(successCallback).toHaveBeenCalledWith(angular.fromJson(data));
//             expect(errorCallback).not.toHaveBeenCalled();
//         });
//
//         it('returns http requests with an error and rejects the promise', function () {
//             $httpBackend.expectGET(expectedUrl).respond(500, 'Oh no!!');
//             promise = scope.getHttp();
//             promise.then(successCallback, errorCallback);
//
//             $httpBackend.flush();
//
//             expect(successCallback).not.toHaveBeenCalled();
//             expect(errorCallback).toHaveBeenCalled();
//         });
//     });
//
// });
