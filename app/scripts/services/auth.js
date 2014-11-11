/*
 *  Auth Service
 *  Talks with Login Service
 *  Keeps track of authentication and headers
 */

'use strict';
angular.module('frameworkApp')
  .service('Auth', ['$http', 'Login', function($http, Login){
    var _headers  = $http.defaults.headers.common;
    _headers.name = 'guest';

    var _login = function(cb){
      Login.save(
        // success
        function(data){
          if(data.status === 'success'){
            _headers['auth-token'] = data.data;
            cb(_headers['auth-token']);
          }else{
            console.log('login attempt failed!');
          }
        },
        // error
        function(e){
          console.log(e);
        });
    };

    this.assignHeaders = function(user, cb){
      if(user.isSigningUp()){ _headers.email = user.email; }
      _headers.name = user.name;

      // if user is already logged in from last session
      if(user.token){
        _headers['auth-token'] = user.token;
        cb(_headers['auth-token']);
      }
      else{
        _headers.pass = user.pass;
        _login(cb);
        delete _headers.pass;
      }
    };

    this.removeHeaders = function(){
      _headers.name = 'guest';
      delete _headers['auth-token'];
      delete _headers.pass;
      delete _headers.email;
    };
  }]);
