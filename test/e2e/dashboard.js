'use strict';
describe("E2E: Testing Dashboard", function() {
  beforeEach(function(){
    browser.get('#/dashboard');
  });
  describe('Test Adding', function(){
    //var model = element(by.binding('item.itemname'));
    var item = {
      itemname: element(by.model('item.itemname')),
      phrase: element(by.model('item.phrase'))
    };
    var submit = element(by.tagName('button'));
    var itemList = element.all(by.repeater('(key, item) in items'));

    it('should add item to items array', function() {
      item.itemname.sendKeys('hello');
      item.phrase.sendKeys('hello');
      submit.click();
      //expect(model.getText()).toEqual('');
      expect(itemList.count()).toEqual(5);
      expect(itemList.get(4).getText()).toMatch(/\{\shello,\shello\s\}/);
    });
  });
});
