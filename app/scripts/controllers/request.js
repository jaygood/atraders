// 'use strict';
//
// angular.module('frameworkApp')
//
//   .controller('RequestController', ['$scope', '$timeout', 'otherService'
//     function($scope, $timeout, otherService) {
//       var timeout;
//       $scope.$watch('username', function(newVal) {
//         if (newVal) {
//           if (timeout) $timeout.cancel(timeout);
//           timeout = $timeout(function() {
//             otherService.events(newVal)
//               .success(function(data, status) {
//                 $scope.events = data.data;
//               });
//           }, 350);
//         }
//       });
//   }])
//
//   .factory('githubService', ['$http', function($http) {
//     var githubUsername;
//     return {
//       events: function() {
//         return $http({
//           method: 'JSONP',
//           url: 'https://api.github.com/users/' + githubUsername + '/events' + '?callback=JSON_CALLBACK'
//         });
//       },
//       setUsername: function(newUsername) {
//         githubUsername = newUsername;
//       }
//     };
//
//   }]);
