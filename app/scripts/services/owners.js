/*
 *  Accesses the API
 */

"use strict";
angular.module("frameworkApp")
  .factory("owners", ['$resource', function ($resource) {
    return $resource("/site/api/owners/:id", {}, {
      query: {
        method: "GET",
        isArray: true
      }
    })
  }]);
