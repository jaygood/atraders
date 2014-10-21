'use strict';
angular.module('frameworkApp')

  // changes class for current active element within set of tabs
  // example: <jd-nav-tab jd-info="{activeClass:'active', ref:'/'}">Home</jd-nav-tab>
  // transcludes the tab name
  .directive('jdNavTab', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        link: '=jdInfo'
      },
      transclude: true,
      template: '<li><a ng-href="#{{::link.ref}}" ng-transclude></a></li>',
      link: function(scope, element) {
        scope.$on('$routeChangeSuccess', function (event, current) {
          if (current.$$route.originalPath === scope.link.ref){ //attrs['jdInfo'])
            element.addClass(scope.link.activeClass);
          }
          else{
            element.removeClass(scope.link.activeClass);
          }
        });
      }
    };
  })

  // sets focus to directive on api call
  // example: jd-focus
  // use from controller: $scope['jdFocus'].focus();
  .directive('jdFocus', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        scope.jdFocus = {
          focus: (function me(){
            // timeout needed to allow for directive to register listener
            // timeout needed to prevent '$apply already in progress'
            $timeout(function(){
              element[0].focus();
            });
            return me;
          })()
        };
      }
    };
  }]);
