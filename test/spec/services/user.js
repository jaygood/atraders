'use strict';

describe('Services: User', function(){

  beforeEach(module('frameworkApp'));

  var user;
  beforeEach(inject(function(_userService_){
    user = _userService_;
  }));

  it('should not be defined', function(){
    expect(user.you).not.toBeDefined();
  });
  it('should be defined', function(){
    expect(user.formUser).toBeDefined();
  });


});
