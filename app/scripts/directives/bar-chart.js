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
  }])

  .directive('barChart', ['percentFilter', function (percentFilter) {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        var elem = d3.select(element[0]);
        var bars = elem.selectAll('.bar');

        setTimeout(function(){
          var n = Math.round(Math.random() * 10);
          var data = d3.range(n);
          bars = bars.data(data);

          bars.enter().append('div')
            .attr('class', 'bar')

          bars.exit().remove();

          bars
            .style('width', function(d){ return d / (n-1) * 100 + '%' })
            .style('height', 100 / n + 'px');

        }, 2000);

        // sort z-index
        elem.selectAll('circles').sort(function(a, b){
          return a.zIndex - b.zIndex;
        });

        // genertator
        var lineGenerator = d3.svg.line()
            .x(function(d) {return d[0]; })
            .y(function(d) {return d[1]; });

        var lineData = [[154, 14], [35, 172], [251, 127], [31, 58], [157, 205], [154, 14]];
        elem.append('svg')
          .append('path').datum(lineData).attr('d', lineGenerator);
      }
    };
  }]);
