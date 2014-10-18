'use strict';
angular.module('frameworkApp')

  // changes class for current active element within set of tabs
  // example: <jd-nav-tab jd-info="{activeClass:'active', ref:'#/', label:'Home'}"></jd-nav-tab>
  .directive('jdNavTab', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        link: '=jdInfo'
      },
      template: '<li><a ng-href="{{link.ref}}" ng-bind="link.label"></a></li>',
      link: function(scope, element, attrs) {
        scope.$on("$routeChangeSuccess", function (event, current, previous) {
          if (current.$$route.hash === scope['link'].ref){ //attrs['jdInfo'])
            element.addClass(scope['link'].activeClass);
          }
          else{
            element.removeClass(scope['link'].activeClass);
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
      link: function(scope, element, attrs) {
        scope['jdFocus'] = {
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
    }
  }])
