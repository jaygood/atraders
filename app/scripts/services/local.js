/*
 *  Local
 */

'use strict';
angular.module('frameworkApp')
  .service('Local', ['$http', 'localStorageService', function($http, localStorageService){
    this.set = function(){
      localStorageService.set('name', 'chlopps');
      var nam = localStorageService.get('name');
      console.log(nam);
    }


  }]);
