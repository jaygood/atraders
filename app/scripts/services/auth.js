/*
 *  Auth Service
 *  Talks with Login Service
 *  Keeps track of authentication and headers
 */

'use strict';
angular.module('frameworkApp')
  .service('Auth', ['$http', '$q', '$rootScope', 'Login', 'localStorageService',
  function($http, $q, $rootScope, Login, lss){
    var _headers  = $http.defaults.headers.common;

    // set headers for API call to get auth-token
    this.acquireToken = function(user){
      var deferred = $q.defer();
      // if user info is stored
      if(this.isStored()){
        _headers['auth-token'] = lss.get('user.token');
        _headers.name          = lss.get('user.name');
        deferred.resolve({data: _headers['auth-token'], name: _headers.name});
      }else{
        _headers.name = user.name;
        _headers.pass = user.pass;
        if(user.isSigningUp()){ _headers.email = user.email; }
        Login.save(function(data){ deferred.resolve(data);
          },       function(e){ deferred.reject(e); });

        delete _headers.pass;
      }

      deferred.promise.then(function(data){
        _headers['auth-token'] = data.data;
        if(user.remember){
          lss.set('user.token', _headers['auth-token']);
          lss.set('user.name', _headers.name);
        }
        $rootScope.$emit('loginEvent');
      }, function(e){ console.log(e.statusText); });

      return deferred.promise;
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
      $rootScope.$emit('logoutEvent');
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
