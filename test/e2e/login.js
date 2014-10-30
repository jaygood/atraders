'use strict';
describe("E2E: Testing Login", function() {
  beforeEach(function(){
    browser.get('#/login');
  });

  describe('Test blurHash', function(){
    var model = {
      name: element(by.binding('user.name')),
      pass: element(by.binding('user.pass'))
    };
    var input = {
      name: element(by.model('user.name')),
      pass: element(by.model('user.pass'))
    };

    // it('should become have correct style', function() {
    // });
  });
});
