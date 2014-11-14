/*
 *  Auth Service
 *  Talks with Login Service
 *  Keeps track of authentication and headers
 */

'use strict';
angular.module('frameworkApp')
  .service('Auth', ['$http', 'Login', 'localStorageService', function($http, Login, lss){
    var _headers  = $http.defaults.headers.common,
        _login;

    _login = function(cb, remember){
      Login.save(function(data){
        if(data.status === 'success'){
          _headers['auth-token'] = data.data;
          if(remember){
            lss.set('user.token', _headers['auth-token']);
            lss.set('user.name', _headers.name);
          }
          cb(_headers['auth-token']);
        }else{
          console.log('login attempt failed!');
        }
      }, function(e){ console.log(e); });
      delete _headers.pass;
    };

    // set headers for API call to get auth-token
    this.acquireToken = function(user, cb){
      // if user info is stored
      if(this.isStored()){
        _headers['auth-token'] = lss.get('user.token');
        _headers.name          = lss.get('user.name');
        user.name              = _headers.name;
        cb(lss.get('user.token'));
      }else{
        _headers.name = user.name;
        _headers.pass = user.pass;
        if(user.isSigningUp()){ _headers.email = user.email; }
        _login(cb, user.remember);
      }
    };

    this.removeAll = function(){
      delete _headers.name;
      delete _headers['auth-token'];
      delete _headers.pass;
      delete _headers.email;
      // doesn't work for some reason
      // lss.clearAll(/user\./);
      lss.remove('user.name');
      lss.remove('user.token');
    };

    this.isStored = function(){ return (lss.get('user.token') && lss.get('user.name')); };
  }]);
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
