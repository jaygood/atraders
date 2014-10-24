/*
 *  Service that shares a hash describing the current
 *  blur state of the input boxes
 */

'use strict';
angular.module('frameworkApp')

//   <form name="userForm">
//   <div class="field">
//     <label for="emailAddress">Enter your email address:</label>
//     <input type="email"
//            name="emailAddress"
//            ng-model="data.email"
//            ng-minlength="5"
//            ng-maxlength="30"
//            record-availability-validator="/api/emails.json"
//            required />
//
//     <div ng-messages="userForm.emailAddress.$error" id="error-messages.html">
//       <div ng-message="recordLoading">Checking database...</div>
//       <div ng-message="recordAvailable">The email address is already in use...</div>
//     </div>
//   </div>
//   <input type="submit" />
// </form>
  .directive('recordAvailabilityValidator', ['$http',
    function($http) {
      return {
        require : 'ngModel',
        link : function(scope, element, attrs, ngModel) {
          var apiUrl = attrs.recordAvailabilityValidator;

          function setAsLoading(bool) {
            ngModel.$setValidity('recordLoading', !bool);
          }

          function setAsAvailable(bool) {
            ngModel.$setValidity('recordAvailable', bool);
          }

          ngModel.$parsers.push(function(value) {
            if(!value || value.length == 0) return;

            setAsLoading(true);
            setAsAvailable(false);

            $http.get(apiUrl, { v : value })
              .success(function() {
                setAsLoading(false);
                setAsAvailable(true);
              })
              .error(function() {
                setAsLoading(false);
                setAsAvailable(false);
              });

            return value;
          })
        }
      }
  }]);
