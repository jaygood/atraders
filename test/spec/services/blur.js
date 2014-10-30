/*
 *  Test User service
 *
 */

'use strict';
describe('Services: Login', function () {
  var Blur;
  beforeEach(angular.mock.module('frameworkApp'));
  // Inject services
  beforeEach(angular.mock.inject(function ($injector) {
    Blur = $injector.get('Blur');
  }));

  describe('Blur', function () {
    it('should become blurred', function() {
      expect(Blur.hash.name).toBe(undefined);
      expect(Blur.hash.pass).toBe(undefined);
      expect(Blur.hash.email).toBe(undefined);
      Blur.add('name');
      expect(Blur.hash.name).toBe(true);
      Blur.add('pass');
      expect(Blur.hash.pass).toBe(true);
      Blur.add('email');
      expect(Blur.hash.email).toBe(true);
    });
  });
});
