
'use strict';
angular.module('frameworkApp.stocks', [])

  // Login used for authentication
  .factory('Stocks', ['$resource', '$q', function($resource, $q){
    //return $resource('site/app/data/stocks.json');
    var deferred = $q.defer(),
        ret = [],
        trans,
        sum;

    var stocks = $resource('scripts/stocks/stocks.json').query(function(data){
      var max = 0;
      for(var i = 0, l = stocks.length, j, m; i < l; i++){
        trans = stocks[i].transactions;
        sum = 0;
        for(j = 0, m = trans.length; j < m; j++){
          if(trans){
            if(trans[j].type === 'S'){
              sum -= +trans[j].number;
            }else{
              sum += +trans[j].number;
            }
          }
        }
        if(Math.abs(sum) > max){ max = Math.abs(sum); }
        ret.push({name: stocks[i].name, number: sum});
      }

      deferred.resolve({data: ret, max: max});
    });
    return deferred.promise;
  }])

  .controller('StockCtrl', ['$scope', 'Stocks',function ($scope, Stocks) {
    $scope.stocks = Stocks;
    // Stocks.then(function(data){
    //   $scope.stocks = data;
    // });
  }])

  .directive('stockChart', ['percentFilter', function (percentFilter) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="chart"></div>',
      scope: {data: '=chartData'},
      link: function (scope, element, attrs) {
        scope.data.then(function(data){
          var max = data.max;

          d3.select(element[0]).selectAll('div')
            .data(data.data).enter().append('div')
            .transition().ease('elastic')
            .style('width', function(d) { return percentFilter(Math.abs(d.number), max); })
            .style('background-color', function(d) { return (d.number > 0) ? 'green': 'red'; })
            // .style('fill', function(d) { return (d.number > 0) ? 'blue':'red'; })
            .text(function(d) { return d.name; });
        });
      }
    };
  }]);
