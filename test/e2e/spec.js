// // spec.js
// describe('angularjs homepage', function() {
//   var firstNumber = element(by.model('first'));
//   var secondNumber = element(by.model('second'));
//   var goButton = element(by.id('gobutton'));
//   var latestResult = element(by.binding('latest'));
//   var history = element.all(by.repeater('result in memory'));
//
//   function add(a, b) {
//     firstNumber.sendKeys(a);
//     secondNumber.sendKeys(b);
//     goButton.click();
//   }
//
//   beforeEach(function() {
//     browser.get('http://juliemr.github.io/protractor-demo/');
//   });
//
//   it('should have a title', function() {
//     expect(browser.getTitle()).toEqual('Super Calculator');
//   });
//
//   it('should add one and two', function() {
//     add(1, 2)
//     expect(latestResult.getText()).toEqual('3');
//   });
//
//   it('should have a history', function() {
//     add(1, 2);
//     add(3, 4);
//     expect(history.count()).toEqual(2);
//   });
// });
