/*
 *  Login Service
 *  Keeps track of user and authorized state
 */

'use strict';
angular.module('frameworkApp')
  .service('token', ['$http', '$location', '$rootScope', 'Login', 'API_PATH', 'DEV_MODE',
    function($http, $location, $rootScope, Login, API_PATH, DEV_MODE){
      var _headers  = $http.defaults.headers.common,
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
        Login.save(
          // success
          function(data){
            if(data.status == 'success'){
              _headers['auth-token'] = data.data;
              _user = { name: user.name};
              that.formUser = {};
              $rootScope.$emit('loginEvent', data);
            }else{
              console.log('login attempt failed!');
            }
          },
          // error
          function(e){
            console.log(e);
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
        _headers['pass']       = null;
        _headers['name']       = 'guest';
        _headers['email']      = null;
        $rootScope.$emit('logoutEvent', 'nothing');
      };
  }]);


// .service('token', ['$resource', '$http', '$location', '$rootScope', 'API_PATH', 'DEV_MODE',
//   function($resource, $http, $location, $rootScope, API_PATH, DEV_MODE){
//     var _resource = $resource(API_PATH + '/login'),
//         _headers  = $http.defaults.headers.common,
//         _user     = DEV_MODE ? {name:'dev', pass: 'dev', key: 'devdev'} : null;
//
//     // keep track of form typing if user switches login -> signup
//     this.formUser = {};
//     _headers['name'] = 'guest';
//
//     // versus login route
//     this.isSignupRoute = function(){
//       return $location.path() === '/signup';
//     };
//
//     this.submit = function(user){
//       if(this.isSignupRoute()) _headers['email'] = user.email;
//       _headers['pass'] = user.pass;
//       _headers['name'] = user.name;
//       var that = this;
//       _resource.save(
//         // success
//         function(data){
//           if(data.status == 'success'){
//             _headers['auth-token'] = data.data;
//             _user = { name: user.name};
//             that.formUser = {};
//             $rootScope.$emit('loginEvent', data);
//           }else{
//             console.log('login attempt failed!');
//           }
//         },
//         // error
//         function(e){
//           console.log(e);
//         });
//       _headers['pass'] = null;
//     };
//
//     if(DEV_MODE) this.submit(_user)
//
//     this.getUser = function(){
//       return _user;
//     };
//
//     this.logout = function(){
//       _user = null;
//       _headers['auth-token'] = null;
//       _headers['pass']       = null;
//       _headers['name']       = 'guest';
//       _headers['email']      = null;
//       $rootScope.$emit('logoutEvent', 'nothing');
//     };
// }]);
