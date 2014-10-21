'use strict';
describe('Services: Owners', function () {
  var mockResource, $httpBackend;
  beforeEach(angular.mock.module('frameworkApp'));
  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockResource = $injector.get('owners');
    });
  });

  describe('API', function () {
    it('should call get with owner.id', function () {
      $httpBackend.expectGET('/site/api/owners/1')
        .respond({
          id: 1,
          rptOwnerCik: '0001610900',
          rptOwnerName: '1987-1988 Richard C Blum Irrevocable Childrens Trust',
          rptOwnerStreet1: '1133 CONNECTICUT AVENUE NW SUITE 600',
          rptOwnerStreet2: '',
          rptOwnerCity: 'WASHINGTON',
          rptOwnerState: 'DC',
          rptOwnerZipCode: '20036',
          lastupdate: '2014-08-09 13:49:52'
        });

      var result = mockResource.get({id: 1});
      $httpBackend.flush();
      expect(result.id).toEqual(1);
    });

    it('should query 5 owners', function () {
      $httpBackend.expectGET('/site/api/owners')
        .respond([{},{},{},{},{}]);

      var result = mockResource.query();
      $httpBackend.flush();
      expect(result.length).toEqual(5);
    });
  });
});
