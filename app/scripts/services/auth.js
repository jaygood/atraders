'use strict';
angular.module('frameworkApp')
  .factory('myAuth', ['$resource', 'API_PATH', function($resource, API_PATH){
    return $resource(API_PATH + '/auth');
  }])

  .service('token', ['$resource', '$http', '$location', '$rootScope', 'myAuth', 'API_PATH', 'DEV_MODE',
    function($resource, $http, $location, $rootScope, myAuth, API_PATH, DEV_MODE){
      var _resource = $resource(API_PATH + '/login'),
          _headers  = $http.defaults.headers.common,
          _user     = DEV_MODE ? {name:'dev', pass: 'dev', key: 'devdev'} : null;

      // keep track of form typing if user switches login -> signup
      this.formUser = {};
      _headers['name'] = 'guest';

      // versus login route
      this.isSignupRoute = function(){
        return $location.path() === '/signup';
      };

      this.submit = function(user){
        if(this.isSignupRoute()) _headers['email'] = user.email;
        _headers['pass'] = user.pass;
        _headers['name'] = user.name;
        var that = this;
        _resource.save(function(data){
          _headers['auth-token'] = data.data;
          _user.name = user.name;
          that.formUser = {};
          $rootScope.$emit('loginEvent', data);
        });
        _headers['pass'] = null;
      };

      if(DEV_MODE) this.submit(_user)

      this.getUser = function(){
        return _user;
      };

      this.logout = function(){
        _user = null;
        _headers['auth-token'] = null;
        _headers['pass']   = null;
        _headers['name']   = 'guest';
        _headers['email']      = null;
        console.log('Logged Out');
        $rootScope.$emit('logoutEvent', 'nothing');
      };
  }])
