/*
 *  Login Service
 *  Keeps track of user state
 */

'use strict';
angular.module('frameworkApp')
  .service('User', ['$rootScope', '$location', 'DEV_MODE', 'Auth', 'Storage',
    function($rootScope, $location, DEV_MODE, Auth, Storage){
      var _user = this;
      this.loggedIn = false;
      this.name = Storage.name;
      this.token = Storage.token;

      this.login = function(){
        Auth.assignHeaders(_user, function(token){
          _user.loggedIn = true;
          delete _user.pass;
          delete _user.token;
          $rootScope.$emit('loginEvent', _user, token);
        });
      };

      this.logout = function(){
        Auth.removeHeaders();
        this.resetUser();
        $rootScope.$emit('logoutEvent');
      };

      // versus login route
      this.isSigningUp = function(){ return $location.path() === '/signup'; };

      // called when form is reset or user logs out
      this.resetUser = function(){
        delete this.name;
        delete this.pass;
        delete this.email;
        delete this.remember;
        delete this.token
        this.loggedIn = false;
      };

      // log me in, please!
      if (DEV_MODE){
        this.name = 'dev';
        this.pass = 'dev';
        this.remember = true;
        this.login();
        $rootScope.$emit('loginEvent', _user, 'auth-token');
      }

      // the user has auth-token from previous login
      if(Storage.token){
        this.login();
      }
  }]);
