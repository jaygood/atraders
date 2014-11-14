/*
 *  d3 barChart
 *  Inserts a chart div into the page
 *
 */

'use strict';
angular.module('frameworkApp')
  .directive('barsChart', ['percentFilter', function (percentFilter) {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="chart"></div>',
      scope: {data: '=chartData'},
      link: function (scope, element, attrs) {
        var max = Math.max.apply(null, scope.data);
        //in D3, any selection[0] contains the group
        //selection[0][0] is the DOM node
        var chart = d3.select(element[0]);
        chart.selectAll('div')
          .data(scope.data).enter().append('div')
          .transition().ease('elastic')
          .style('width', function(d) { return percentFilter(d, max); })
          .text(function(d) { return percentFilter(d, max, 2); });
      }
    };
  }]);
