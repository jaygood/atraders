/*
 *  Test Owners Controller
 *
 */

'use strict';
describe('Owners Controller', function() {
  var ctrl, scope, $httpBackend, path, data, $location, $routeParams,
      _owners = _owners = [{
        id: 1,
        rptOwnerCik: '0001610900',
        rptOwnerName: '1987-1988 Richard C Blum Irrevocable Childrens Trust',
        rptOwnerStreet1: '1133 CONNECTICUT AVENUE NW SUITE 600',
        rptOwnerStreet2: '',
        rptOwnerCity: 'WASHINGTON',
        rptOwnerState: 'DC',
        rptOwnerZipCode: '20036',
        lastupdate: '2014-08-09 13:49:52'
        },
        {
        id: 2,
        rptOwnerCik: '0001066062',
        rptOwnerName: 'KLEIN MICHAEL R',
        rptOwnerStreet1: '1133 CONNECTICUT AVENUE NW',
        rptOwnerStreet2: 'SUITE 600',
        rptOwnerCity: 'WASHINGTON',
        rptOwnerState: 'DC',
        rptOwnerZipCode: '20036',
        lastupdate: '2014-08-09 13:49:52'
      }];
  beforeEach(function(){module('frameworkApp');});
  // Inject services
  beforeEach(inject(function($rootScope, $controller, $injector){
    data = {status: 'success', data: _owners};
    scope = $rootScope.$new();
    //ctrl = $controller('OwnersCtrl', { '$scope': scope });
    ctrl = $controller('OwnersCtrl', {
      $scope: scope,
      $routeParams: { id: 1 }
    });
    path = $injector.get('API_PATH');
    $location = $injector.get('$location');
    $httpBackend = $injector.get('$httpBackend');
  }));

  // configure services and variables
  beforeEach(function(){
    $httpBackend.expectGET(path + '/owners')
      .respond(data);
    $httpBackend.flush();
  })

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('OwnersCtrl on owners view', function(){
    it('should have query', function() {
      expect(scope.owners.length).toEqual(2);
    });

    it('should have get', function() {
      $httpBackend.expectGET(path + '/owners/1')
        .respond({data: _owners[0]});
      scope.searchOwners(1);
      $httpBackend.flush();
      var result = scope.oneOwner;
      expect(result.data.id).toEqual(1);
    });

    it('should have search.number', function() {
      expect(scope.search.number).toEqual(1);
    });
  });
});
