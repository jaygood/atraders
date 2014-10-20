'use strict';

describe('Services: One', function(){

  beforeEach(module('frameworkApp'));

  var one;
  beforeEach(inject(function(_one_){
    one = _one_;
  }));

  it('should have a doit function that evaluates to 1 on first call', function(){
    expect(one.doit()).toEqual(1);
  });
});
