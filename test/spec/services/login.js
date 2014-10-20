'use strict';

describe("Unit Testing Examples", function() {
  beforeEach(angular.mock.module('frameworkApp'));

  // it('should have a LoginCtrl controller', function() {
  //   expect(LoginController).toBeDefined();
  // });

  it('should have a working userService service', inject(['userService',
    function(userService) {
      expect(userService.isValidEmail).not.toEqual(null);

      // test cases - testing for success
      var validEmails = [
        'test@test.com',
        'test@test.co.uk',
        'test734ltylytkliytkryety9ef@jb-fe.com'
      ];

      // test cases - testing for failure
      var invalidEmails = [
        'test@testcom',
        'test@ test.co.uk',
        'ghgf@fe.com.co.',
        'tes@t@test.com',
        ''
      ];

      // you can loop through arrays of test cases like this
      for (var i in validEmails) {
        var valid = userService.isValidEmail(validEmails[i]);
        expect(valid).toBeTruthy();
      }
      for (var i in invalidEmails) {
        var valid = userService.isValidEmail(invalidEmails[i]);
        expect(valid).toBeFalsy();
      }
    }])
  );
});
