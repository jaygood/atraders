'use strict';
describe("E2E: Testing Owners", function() {
  describe('Test Binding', function(){
    beforeEach(function(){
      browser.get('#/login');
      element(by.model('user.name')).sendKeys('jon2');
      element(by.model('user.pass')).sendKeys('pass');
      element(by.tagName('button')).click();
      element(by.linkText('Owners')).click()
    });

    describe('routing', function() {
      it('should have route', function() {
        expect(browser.getLocationAbsUrl()).toMatch(/\/owners$/);
      });

      it('should have correct view', function() {
        expect(element.all(by.css('.row h3')).first().getText()).toMatch(/Owners/i);
      });

      it('should have a title', function() {
        expect(browser.getTitle()).toEqual('SEC Owners');
      });
    });

    describe('function', function() {
      var number, button, owners, result;
      beforeEach(function(){
        number = element(by.model('search.number'));
        button = element(by.tagName('button'));
        owners = element.all(by.repeater('owner in owners').column('rptOwnerName'));
      });
      it('should search for owner and add him to page', function() {
        number.clear().sendKeys(2);
        button.click();
        result = element(by.id('owner-name'));
        expect(result.getText()).toEqual(owners.get(1).getText());
      });

      it('should have correct coloring', function() {
        number.clear().sendKeys(2);
        button.click();
        result = element(by.id('color-change'));
        expect(result.getAttribute('class')).toBe('mygreen');

        number.clear().sendKeys(3);
        button.click();
        expect(result.getAttribute('class')).toBe('myred');
      });
    });
  });
});
