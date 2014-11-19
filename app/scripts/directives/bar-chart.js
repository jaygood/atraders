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

  .directive('barChart', [function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        var elem = d3.select(element[0]);
        var bars = elem.selectAll('.bar');

        setTimeout(function(){
          var n = Math.round(Math.random() * 9) + 1;
          var data = d3.range(n);
          bars = bars.data(data);

          bars.enter().append('div')
            .attr('class', 'bar')

          bars.exit().remove();

          bars
            .style('width', function(d){ return d / (n-1) * 100 + '%' })
            .style('height', 100 / n + 'px');
        }, 2000);
      }
    };
  }])

  .directive('d3Shapes', [function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        var elem = d3.select(element[0]);
        var div = d3.select('.marketing');

        // sort z-index
// circles
        elem.selectAll('circles').sort(function(a, b){
          return a.zIndex - b.zIndex;
        });

// Star
        // genertator
        var lineGenerator = d3.svg.line()
            .x(function(d) {return d[0]; })
            .y(function(d) {return d[1]; });

        var lineData = [[154, 14], [35, 172], [251, 127], [31, 58], [157, 205], [154, 14]];
        elem.append('svg')
          .append('path').datum(lineData).attr('d', lineGenerator);

// semicircles
        var rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        var arc = d3.svg.arc()
          .innerRadius(30)
          .outerRadius(function(d, i){
            return (rainbow.length - i) * 20 + 30;
          })
          .startAngle(-Math.PI / 2).endAngle(Math.PI / 2);

        div.append('svg')
          .selectAll('path').data(rainbow).enter().append('path')
          .attr({
            d: arc,
            transform: 'translate(150, 150)',
            fill: function(d){ return d; }
          });

// Pies
        var arc = d3.svg.arc()
          .innerRadius(100)
          .outerRadius(150);

        var data = [21, 32, 35, 64, 83];

        var color = d3.scale.category10();

        var pie = d3.layout.pie();
        var arcData = pie(data);

        div.append('svg')
          .append('g').attr('transform', 'translate(200, 175)')
            .selectAll('path').data(arcData).enter()
              .append('path').attr('d', arc).style('fill', function(d, i){
                return color(i);
              });
      }
    };
  }]);
