'use strict';
angular.module('frameworkApp')

  // Watches route to add active class to <li>s in a <ul>
  // Depends on firstChild being an <a> with hash for route - change if needed
  // Example:
  // <ul jd-active-class="active">
  //   <li><a ng-href="#/">Home</a></li>
  // </ul>
  .directive('jdActiveClass', function () {
    return function(scope, element, attrs){
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
