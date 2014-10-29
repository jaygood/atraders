/*
 *  Intercepts API requests + any request really
 * http://bitoftech.net/2014/06/09/angularjs-token-authentication-using-asp-net-web-api-2-owin-asp-net-identity/
 */

'use strict';
angular.module('frameworkApp')
  .factory('authInterceptor', ['$q', '$location', function ($q, $location) {
    return {
      request: function (config) {
        // config.headers = config.headers || {};
        // var authData = localStorageService.get('authorizationData');
        // if (authData) {
        //   config.headers.Authorization = 'Bearer ' + authData.token;
        // }
        // return config;
        console.log('config: ', config);
        return config;
      },
      responseError: function (rejection) {
        // if (rejection.status === 401) {
        //   $location.path('/login');
        // }
        // return $q.reject(rejection);
        console.log('reject: ', rejection);
        return rejection;
      }
    };
  }]);
