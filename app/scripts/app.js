'use strict';
angular.module('frameworkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngResource',
  'ngMessages',
  'LocalStorageModule',
  'frameworkApp.stocks',
  //'jdResource'
  'jdResource.mock'
])
  // set to true for automatic login
  // code is in auth service and bottom of this page
  .constant('DEV_MODE', false)
  .constant('API_PATH', '/site/api')

  .config(['$routeProvider', '$httpProvider', 'localStorageServiceProvider',
    function ($routeProvider, $httpProvider, lssp) {
      // changes prefix for local storage variables
      lssp.setPrefix('jd');

      // adds interceptor to all routes
      //$httpProvider.interceptors.push('authInterceptor');

      $routeProvider
        .when('/', {
          title: 'A Trader\'s Guide',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .when('/login', {
          title: 'Login',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          isPrevented: true
        })
        .when('/signup', {
          title: 'Sign Up',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl',
          isPrevented: true
        })
        .when('/owners', {
          title: 'SEC Owners',
          templateUrl: 'views/owners.html',
          controller: 'OwnersCtrl',
          isRestricted: true
        })
        .when('/owners/:owner', {
          title: 'SEC Owner',
          templateUrl: 'views/owner.html',
          controller: 'OwnersCtrl',
          isRestricted: true
        })
        .when('/dashboard', {
          title: 'User Dashboard',
          templateUrl: 'views/dashboard.html',
          controller: 'DashCtrl',
          isRestricted: true
        })
        .when('/bars', {
          title: 'd3 Bars',
          templateUrl: 'views/bars.html',
          controller: 'BarCtrl'
        })
        .when('/stocks', {
          title: 'Stocks',
          templateUrl: 'views/stocks.html',
          controller: 'StockCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
  }])

  // TODO - add local storage for app
  // will fill headers with local data
  // app.run(['Auth', function (Auth) {
  //     Auth.fillAuthData();
  // }])

  .run(['$rootScope', '$location', 'User', 'DEV_MODE',
  function ($rootScope,  $location, User, DEV_MODE) {
    // Change titles for different views
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.title = current.$$route.title;
    });

    // restricts access to logged in users for certain views
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (!DEV_MODE && next.$$route.isRestricted){
        if (!User.loggedIn) {
          console.log('DENY: ', next.$$route.originalPath);
          event.preventDefault();
          $location.path('/login');
        }
        else {
          console.log('ALLOW: ', next.$$route.originalPath);
        }
      }

      // Prevents login access after user is already logged in
      if (!DEV_MODE && next.$$route.isPrevented){
        if (User.loggedIn) {
          console.log('DENY: ', next.$$route.originalPath);
          event.preventDefault();
          $location.path('/');
        }
        else {
          console.log('ALLOW: ', next.$$route.originalPath);
        }
      }
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
