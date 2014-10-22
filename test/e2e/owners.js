'use strict';
describe("E2E: Testing Owners", function() {
  describe('Test Binding', function(){
    beforeEach(function(){
      browser.get('#/owners');
    });
    var number = element(by.model('oneOwner.number'));
    var button = element(by.tagName('button'));
    var owners = element.all(by.repeater('owner in owners').column('rptOwnerName'));
    var result;

    // it('should have a title', function() {
    //   expect(browser.getTitle()).toEqual('Super Calculator');
    // });

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
