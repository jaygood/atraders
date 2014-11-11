/*
 *  Local Storage
 *  Sets cookies to remember the user and auth-token
 *
 */

'use strict';
angular.module('frameworkApp')
  .service('Storage', ['$rootScope', 'localStorageService',
  function($rootScope, localStorageService){

    $rootScope.$on('loginEvent', function(event, user, token) {
      if(user.remember){
        localStorageService.set('user.name', user.name);
        localStorageService.set('user.token', token);
      }
    });

    $rootScope.$on('logoutEvent', function() {
      // doesn't work for some reason
      // localStorageService.clearAll(/user\./);
      localStorageService.remove('user.name');
      localStorageService.remove('user.token');
    });

    return {
      name:  localStorageService.get('user.name'),
      token: localStorageService.get('user.token')
    }
  }]);


//  TODO
//  create tests for local storage
//
//
// it('should change state', function() {
//   var value1 = element(by.binding('value1'));
//   var value2 = element(by.binding('value2'));
//
//   expect(value1.getText()).toContain('true');
//   expect(value2.getText()).toContain('YES');
//
//   element(by.model('value1')).click();
//   element(by.model('value2')).click();
//
//   expect(value1.getText()).toContain('false');
//   expect(value2.getText()).toContain('NO');
// });
