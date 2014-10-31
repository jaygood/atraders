'use strict';
describe("E2E: Testing Login", function() {
  var input, model, button;
  beforeEach(function(){
    browser.get('#/login');
    model = { name: element(by.binding('user.name')),
              pass: element(by.binding('user.pass')) };
    input = { name: element(by.model('user.name')),
              pass: element(by.model('user.pass')) };
    button = element(by.tagName('button'));
  });

  describe('routing', function() {
    it('should have route', function() {
      expect(browser.getLocationAbsUrl()).toMatch(/\/login$/);});
    it('should have correct view', function() {
      expect(element.all(by.tagName('legend')).first().getText()).toMatch(/^Login/i); });
    it('should have a title', function() {
      expect(browser.getTitle()).toEqual('Login'); });
  });

  describe('error messages', function() {
    it('should have correct coloring', function() {
      input.name.sendKeys('jo');
      input.pass.click();
      //expect(element(by.css('help-block')).getAttribute('class')).toBe('mygreen');
      //element.all(by.css('legend'))
      // button.click();
      // result = element(by.id('color-change'));
      // expect(result.getAttribute('class')).toBe('mygreen');
      //
      // number.clear().sendKeys(3);
      // button.click();
      // expect(result.getAttribute('class')).toBe('myred');
    });
  });
});
