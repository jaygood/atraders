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

      this.login = function(){
        Auth.assignHeaders(_user, function(token){
          _user.loggedIn = true;
          delete _user.pass;
          $rootScope.$emit('loginEvent', _user, token);
        });
      };

      this.logout = function(){
        Auth.removeHeaders();
        delete _user.name;
        _user.loggedIn = false;
        $rootScope.$emit('logoutEvent');
      };

      // versus login route
      this.isSigningUp = function(){
        return $location.path() === '/signup';
      };

      if (DEV_MODE){
        this.name = 'dev';
        this.pass = 'dev';
        this.remember = true;
        this.login(_user);
        $rootScope.$emit('loginEvent', _user, 'auth-token');
      }
  }]);
