'use strict';
angular.module('frameworkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngResource',
  'ngMessages',
  //'jdResource'
  'jdResource.mock'
])
  // set to true for automatic login
  // code is in auth service and bottom of this page
  .constant('DEV_MODE', false)
  .constant('API_PATH', '/site/api')

  .config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
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
          controller: 'LoginCtrl'
        })
        .when('/signup', {
          title: 'Sign Up',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
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
        .otherwise({
          redirectTo: '/'
        });
  }])

  // will fill headers with local data
  // app.run(['Auth', function (Auth) {
  //     Auth.fillAuthData();
  // }])

  .run(['$rootScope', '$location', 'User', 'DEV_MODE',
  function ($rootScope,  $location, User, DEV_MODE) {
    // Change titles for different views
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      $rootScope.title = current.$$route.title;
      console.log('root', $rootScope.title);
      console.log(current.$$route.title);
    });



    // restricts access to certain views
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if(!DEV_MODE){
      if (next.$$route.isRestricted){
        if (!User.loggedIn) {
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
