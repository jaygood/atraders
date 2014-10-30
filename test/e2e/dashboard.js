'use strict';
describe("E2E: Testing Dashboard", function() {
  beforeEach(function(){
    browser.get('#/dashboard');
  });

  describe('routing', function() {
    it('should have route', function() {
      expect(browser.getLocationAbsUrl()).toMatch(/\/dashboard$/);
    });

    it('should have correct view', function() {
      expect(element.all(by.css('legend')).first().getText()).toMatch(/Dashboard/);
    });
  });

  describe('Test Adding', function(){
    //var model = element(by.binding('item.itemname'));
    var item = {
      name: element(by.model('item.name')),
      phrase: element(by.model('item.phrase'))
    };
    var submit = element(by.tagName('button'));
    var itemList = element.all(by.repeater('item in items'));

    it('should add item to items array', function() {
      item.name.sendKeys('hello');
      item.phrase.sendKeys('hello');
      submit.click();
      //expect(model.getText()).toEqual('');
      expect(itemList.count()).toEqual(4);
      expect(itemList.get(3).getText()).toMatch(/hello\nhello/);
    });
  });
});
