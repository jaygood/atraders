'use strict';

angular.module('frameworkApp')
  .service('userService', ['$resource', '$http', '$q', '$rootScope', '$location', 'DEV_MODE',
    function ($resource, $http, $q, $rootScope, $location, DEV_MODE) {
      var _user = DEV_MODE ? {username:'DEV', password:'DEV', email:'dev@dev.dev'} : null,
          promise,
          signup,
          login;

      // keep track of form typing if user switches login -> signup
      this.formUser = {};

      this.isLoggedIn = function(){
        return _user ? _user : false;
      };

      // versus login route
      this.isSignupRoute = function(){
        return $location.path() === '/signup';
      };

      this.logout = function(){
        _user = null;
        promise = null;
        console.log('Logged Out');
        $rootScope.$emit('logoutEvent', 'nothing');
      };

      this.editUser = function(key){
        return this.users[key];
      };

      this.submit = function(user){
        var deferred = $q.defer();
        if (this.isSignupRoute()){
          signup(user, deferred);
        }
        else{
          login(user, deferred);
        }
        return deferred.promise;
      };

      signup = function(user, deferred){
        $http.post('data.json', user)
          .success(function(data){
            //this.formUser = {};
            _user = user;
            // create arbitrary key for user identity
            _user.key =(new Date()).valueOf().toString();
            $rootScope.$emit('loginEvent', data);
            deferred.resolve(_user);
            $http.defaults.headers.common['Authtoken'] = 'token';
          })
          .error(function(message, code){
            console.log(message);
            console.log(code);
            deferred.reject(message);
          });
      };

      login = function(user, deferred){
        $http.get('data.json')
          .success(function(data){
            // check user and password combination
            if(user && data[user.username] && data[user.username].password === user.password){
              //this.formUser = {};
              _user = data[user.username];
              $rootScope.$emit('loginEvent', data);
              deferred.resolve(_user);
            }
            else{
              console.log('Wrong combination');
              deferred.reject(data);
            }
            $http.defaults.headers.common['Authtoken'] = 'token';
          })
          .error(function(message, code){
            console.log(message);
            console.log(code);
            deferred.reject(message);
          });
      };
  }]);
