'use strict';
angular.module('frameworkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngResource',
  'ngMessages'
])
  // set to true for automatic login
  .constant('DEV_MODE', true)
  .constant('API_PATH', '/site/api')

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/owners', {
        templateUrl: 'views/owners.html',
        controller: 'OwnersCtrl',
        isRestricted: true
      })
      .when('/owners/:owner', {
        templateUrl: 'views/owner.html',
        controller: 'OwnersCtrl',
        isRestricted: true
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashCtrl',
        isRestricted: true
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

  .run(['$rootScope', '$location', 'token', 'DEV_MODE',
  function ($rootScope,  $location, token, DEV_MODE) {

    // restricts access to certain views
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if(!DEV_MODE){
      if (next.$$route.isRestricted){
        if (!token.getUser()) {
          console.log('DENY');
          event.preventDefault();
          $location.path('/login');
          //alert('Please login to continue');
        }
        else {
          console.log('ALLOW');
        }
      }}
    });

    // redirects user after login
    $rootScope.$on('loginEvent', function() {
      $location.path('/dashboard');
    });

    // redirects user after logout
    $rootScope.$on('logoutEvent', function() {
      $location.path('/login');
    });
  }]);
