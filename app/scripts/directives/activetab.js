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
          if (current.$$route.originalPath === scope.link.ref){
            element.addClass(scope.link.activeClass);
          }
          else{
            element.removeClass(scope.link.activeClass);
          }
        });
      }
    };
  })

  // <ul class="nav nav-pills pull-right" jd-active-class="active">
  //   <li><a ng-href="#/">Home</a></li>
  // </ul>
  .directive('jdActiveClass', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        scope.$on('$routeChangeSuccess', function (event, current) {
          var elem = element[0],
              activeClass = attrs.jdActiveClass,
              length = elem.children.length,
              child;
          for(var i = 0; i < length; i++){
            child = elem.children[i];
            if ('#' + current.$$route.originalPath === child.firstChild.hash){
              angular.element(child).addClass(activeClass);
            }else{
              angular.element(child).removeClass(activeClass);
            }
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
