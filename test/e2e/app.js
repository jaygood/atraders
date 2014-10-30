'use strict';
describe("E2E: Testing Routes", function() {
// beforeEach(function(){ /*browser.sleep(100); */  });

  describe('root', function(){
    beforeEach(function(){
      browser.get('#/');
    });
    it('should be the starting point', function() {
      expect(browser.getLocationAbsUrl()).toMatch("/");
    });
  });

  describe('login', function() {
    beforeEach(function(){
      browser.get('#/login');
    });
    it('should have route', function() {
      expect(browser.getLocationAbsUrl()).toMatch(/\/login$/);
    });

    it('should have correct view', function() {
      expect(element.all(by.css('legend')).first().getText()).toMatch(/My\sForm/);
    });
  });

  describe('owner', function() {
    beforeEach(function(){
      browser.get('#/owners/1');
    });
    it('should have route', function() {
      expect(browser.getLocationAbsUrl()).toMatch(/\/owners\/1$/);
    });

    it('should have correct view', function() {
      expect(element.all(by.css('.row h3')).first().getText()).toMatch(/Owner$/i);
    });
  });
});
