/*
 *  Login Service
 *  Keeps track of user state
 */

'use strict';
angular.module('frameworkApp')
  .service('User', ['$rootScope', '$location', 'DEV_MODE', 'Auth',
    function($rootScope, $location, DEV_MODE, Auth){
      this.login = function(user){
        Auth.acquireToken(user).then(function(token, name){
          if(name){ this.name = name; }
          user.loggedIn = true;
          delete user.pass;
          delete user.token;
        });
      };

      this.logout = function(){
        Auth.removeAll();
        this.reset();
      };

      // versus login route
      this.isSigningUp = function(){ return $location.path() === '/signup'; };

      // called when form is reset or user logs out
      this.reset = function(){
        delete this.name;
        delete this.pass;
        delete this.email;
        delete this.remember;
        delete this.token
        this.loggedIn = false;
      };

      // the user has auth-token from previous login
      if(Auth.isStored()){ this.login(this); }

      // log me in, please!
      if (DEV_MODE){
        this.name = 'dev';
        this.pass = 'dev';
        this.login(this);
      }
  }]);
