'use strict';
describe("E2E: Testing Routes", function() {
  beforeEach(function(){ /*browser.sleep(100); */  });

  describe('root', function(){
    beforeEach(function(){
      browser.get('#/');
    });
    it('should be the starting point', function() {
      expect(browser.getLocationAbsUrl()).toMatch("/");
    });
  });

  describe('about', function() {
    beforeEach(function(){
      browser.get('#/about');
    });
    it('should have route', function() {
      expect(browser.getLocationAbsUrl()).toMatch(/\/about$/);
    });

    it('should have correct view', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).toMatch(/About/);
    });
  });

  describe('owners', function() {
    beforeEach(function(){
      browser.get('#/owners');
    });
    it('should have route', function() {
      expect(browser.getLocationAbsUrl()).toMatch(/\/owners$/);
    });

    it('should have correct view', function() {
      expect(element.all(by.css('.row h3')).first().getText()).toMatch(/Owners/i);
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
