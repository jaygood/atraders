/*
 *  API for resources
 *
 */
'use strict';
angular.module('jdResource', [])

  // Overloads $resource's $save with a PUT capability
  // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
  .factory( 'Resource', [ '$resource', function( $resource ) {
    return function( url, params, methods ) {
      var defaults = {
        update: { method: 'PUT', isArray: false },
        create: { method: 'POST' }
      };
      methods = angular.extend( defaults, methods );
      var resource = $resource( url, params, methods );
      resource.prototype.$save = function(cb) {
        if ( !this.id ) {
          return this.$create(cb);
        } else {
          return this.$update(cb);
        }
      };
      return resource;
    };
  }])

  // Items used on the diagnostics sheet
  .factory('Items', ['Resource', 'API_PATH', function($resource, API_PATH){
    return $resource(API_PATH + '/items/:id', {id: '@id'});
  }])

  // Login used for authentication
  .factory('Login', ['$resource', 'API_PATH', function($resource, API_PATH){
    return $resource(API_PATH + '/login');
  }])

  // Owners used on owners sheet
  .factory('Owners', ['$resource', 'API_PATH', function($resource, API_PATH){
    return $resource(API_PATH + '/owners/:id', {},{
      query: {isArray: false}
    });
  }]);
