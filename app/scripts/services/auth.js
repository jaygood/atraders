'use strict';
angular.module('frameworkApp')
  .factory('myAuth', ['$resource', '$http', 'API_PATH', function($resource, $http, API_PATH){
    return $resource(API_PATH + '/auth');
  }])
  .factory('myLogin', ['$resource', '$http', 'API_PATH', function($resource, $http, API_PATH){
    $http.defaults.headers.common['username'] = 'guest';
    return $resource(API_PATH + '/login');
  }])

  .service('token', ['$http', 'myAuth', 'myLogin', 'DEV_MODE',
    function($http, myAuth, myLogin, DEV_MODE){
      var _user = DEV_MODE ? {username:'DEV', password:'DEV', email:'dev@dev.dev'} : null,
          _isSignupRoute;
      this.user = _user;

      // versus login route
      _isSignupRoute = function(){
        return $location.path() === '/signup';
      };

      this.submit = function(user){
        var headers = $http.defaults.headers.common;
        if(_isSignupRoute()) headers['email'] = user.email;
        headers['password'] = user.password; //'jon2pass'
        headers['username'] = user.username; //'jon2'
        myLogin.save(function(data){
          headers['auth-token'] = data.data;
          //$rootScope.$emit('loginEvent', data);
        });
        headers['password'] = null;
      };
      
      this.isLoggedIn = function(){
        return _user ? _user : false;
      };

      this.logout = function(){
        _user = null;
        var headers = $http.defaults.headers.common;
        headers['auth-token'] = null;
        headers['password']   = null;
        headers['username']   = null;
        headers['email']      = null;
        console.log('Logged Out');
        $rootScope.$emit('logoutEvent', 'nothing');
      };

      // keep track of form typing if user switches login -> signup
      this.formUser = {};

      this.getIt = function(success){
        _user.user = "Loading";
        myAuth.save(function(data){
          console.log(data);
          _user.user = data;
          //this.user.user = data;
          //success(data);
        });
      };
  }])
