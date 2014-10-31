/*
 *  Test Dash Controller
 *
 */
'use strict';
describe("E2E: Testing Dashboard", function() {
  beforeEach(function(){
    browser.get('#/login');
    element(by.model('user.name')).sendKeys('jon2');
    element(by.model('user.pass')).sendKeys('pass');
    element(by.tagName('button')).click();
  });

  describe('routing', function() {
    it('should have route', function() {
      expect(browser.getLocationAbsUrl()).toMatch(/\/dashboard$/);
    });

    it('should have correct view', function() {
      //expect(element(by.css('legend')).first().getText()).toMatch(/Dashboard/);
       expect(element(by.tagName('legend')).getText()).toMatch(/Dashboard/);
    });
  });

  describe('Test Adding', function(){
    //var model = element(by.binding('item.itemname'));
    var item, submit, itemList;
    beforeEach(function(){
      item = { name: element(by.model('item.name')),
               phrase: element(by.model('item.phrase')) };
      submit = element(by.tagName('button'));
      itemList = element.all(by.repeater('item in items'));
    });

    it('should add item to items array', function() {
      expect(item.name.getAttribute('value')).toBe('');
      expect(item.phrase.getAttribute('value')).toBe('');
      item.name.sendKeys('hello');
      item.phrase.sendKeys('hello');
      submit.click();
      //expect(model.getText()).toEqual('');
      expect(itemList.count()).toEqual(4);
      expect(itemList.get(3).getText()).toMatch(/hello\nhello/);
    });
  });

  describe('Test Removing', function(){
    var container, repeater, item;
    beforeEach(function(){
      container = element(by.css('col-sm-6'));
      repeater = element.all(by.repeater('item in items'));
      item = { name: container.element(by.model('item.name')),
               phrase: container.element(by.model('item.phrase')) };
    });
    it('should remove the first item', function() {
      expect(repeater.get(0).getText()).toMatch(/^jon\nhello\sRemove/);
      repeater.get(0).element(by.linkText('Remove')).click();
      expect(repeater.get(0).getText()).not.toMatch(/^jon\nhello\sRemove/);
    });
  });
});
