/*
 *  Login Service
 *  Keeps track of user state
 */

'use strict';
angular.module('frameworkApp')
  .service('User', ['$location', 'DEV_MODE', 'Auth', function($location, DEV_MODE, Auth){
    this.login = function(){
      var _user = this;
      Auth.acquireToken(_user).then(function(data){
        if(data.name){ _user.name = data.name; }
        _user.loggedIn = true;
        delete _user.pass;
        delete _user.token;
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
    if(Auth.isStored()){ this.login(); }

    // log me in, please!
    if (DEV_MODE){
      this.name = 'dev';
      this.pass = 'dev';
      this.login();
    }
  }]);
