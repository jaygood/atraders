'use strict';
angular.module('frameworkApp')

  .factory('myAuth', ['$resource', 'myToken', function($resource, myToken){
    var resource = $resource('/site/api/auth/:id', {}, {
      query: {
        method: 'GET',
        isArray: true,
        headers: {'authToken': 'chloe'}
      }
    });
    return myToken.wrapActions(resource, ['query']);
  }])

  .factory('myToken', function(){
    var token = '';
    var tokenWrapper = function(resource, action){
      resource['_' + action] = resource[action];

      resource[action] = function(data, success, error){
        return resource['_' + action](
          angular.extend({}, data || {},
          {access_token: tokenHandler.get()}),
          success,
          error
        );
      };
    };
    var tokenHandler = {
      set: function(newToken){
        token = newToken;
      },
      get: function(){
        return token;
      },
      wrapActions: function(resource, actions){
        var wrappedResource = resource;
        for(var i = 0; i < actions.length; i++){
          tokenWrapper(wrappedResource, actions[i]);
        }
        return wrappedResource;
      }
    };
    return tokenHandler;
  });

//
// function getAuth() {
//   $arr = array('');
//   echo "hello"
//   foreach (getallheaders() as $name => $value) {
//     array_push($arr, "$name: $value\n");
//   }
//   echo json_encode($arr)
// }
