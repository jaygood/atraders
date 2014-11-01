'use strict';
describe("E2E: Testing Routes", function() {
// beforeEach(function(){ /*browser.sleep(100); */  });

  describe('main page', function(){
    beforeEach(function(){
      browser.get('#/');
    });
    it('should be the starting point', function() {
      expect(browser.getLocationAbsUrl()).toMatch("/");
    });
  });
});
