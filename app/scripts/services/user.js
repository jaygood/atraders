/*
 *  Login Service
 *  Keeps track of user state
 */

'use strict';
angular.module('frameworkApp')
  .service('User', ['$rootScope', '$location', 'DEV_MODE', 'Auth',
    function($rootScope, $location, DEV_MODE, Auth){
      var _user = this;

      this.login = function(user){
        Auth.assignHeaders(user, function(name){
          _user.name = name;
          _user.loggedIn = true;
          delete _user.pass;
          $rootScope.$emit('loginEvent');
        });
      };

      this.logout = function(){
        Auth.removeHeaders();
        delete _user.name;
        delete _user.loggedIn;
        $rootScope.$emit('logoutEvent');
      };

      // versus login route
      this.isSigningUp = function(){
        return $location.path() === '/signup';
      };

      if (DEV_MODE){
        this.name = 'dev';
        this.pass = 'dev';
        this.login(_user);
      }
  }]);
