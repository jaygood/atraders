'use strict';

angular.module('frameworkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngResource'
])
  .constant('DEV_MODE', false)

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/owners', {
        templateUrl: 'views/phpUsers.html',
        controller: 'PhpCtrl'
      })
      .when('/owner/:owner', {
        templateUrl: 'views/owner.html',
        controller: 'OwnerCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashCtrl',
        isRestricted: true
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(['$rootScope', '$location', 'userService', 'DEV_MODE',
  function ($rootScope,  $location, userService, DEV_MODE) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if(!DEV_MODE){
      if (next.$$route.isRestricted){
        if (!userService.isLoggedIn()) {
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

    $rootScope.$on('loginEvent', function(data) {
      $location.path('/dashboard');
    });

    $rootScope.$on('logoutEvent', function(data) {
      $location.path('/login');
    });
  }])
