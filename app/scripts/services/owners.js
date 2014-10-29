/*
 *  Accesses the API
 */

'use strict';
angular.module('frameworkApp')
  .factory('Owners', ['$resource', 'API_PATH', function($resource, API_PATH){
    return $resource(API_PATH + '/owners/:id', {},{
      query: {isArray: false}
    });
  }])

  .factory('Owners.mock', function(){
    var _owners = [{
      id: 1,
      rptOwnerCik: '0001610900',
      rptOwnerName: '1987-1988 Richard C Blum Irrevocable Childrens Trust',
      rptOwnerStreet1: '1133 CONNECTICUT AVENUE NW SUITE 600',
      rptOwnerStreet2: '',
      rptOwnerCity: 'WASHINGTON',
      rptOwnerState: 'DC',
      rptOwnerZipCode: '20036',
      lastupdate: '2014-08-09 13:49:52'
      },
      {
      id: 2,
      rptOwnerCik: '0001066062',
      rptOwnerName: 'KLEIN MICHAEL R',
      rptOwnerStreet1: '1133 CONNECTICUT AVENUE NW',
      rptOwnerStreet2: 'SUITE 600',
      rptOwnerCity: 'WASHINGTON',
      rptOwnerState: 'DC',
      rptOwnerZipCode: '20036',
      lastupdate: '2014-08-09 13:49:52'
      },
      {
      id: 3,
      rptOwnerCik: '0001201396',
      rptOwnerName: 'BENATAR LEO',
      rptOwnerStreet1: '309 E. PACES FERRY ROAD, NE',
      rptOwnerStreet2: '',
      rptOwnerCity: 'ATLANTA',
      rptOwnerState: 'GA',
      rptOwnerZipCode: '30305-',
      lastupdate: '2014-08-09 13:49:53'
      },
      {
      id: 4,
      rptOwnerCik: '0001275992',
      rptOwnerName: 'ABBASI SOHAIB',
      rptOwnerStreet1: 'C/O INFORMATICA CORPORATION',
      rptOwnerStreet2: '2100 SEAPORT BOULEVARD',
      rptOwnerCity: 'REDWOOD CITY',
      rptOwnerState: 'CA',
      rptOwnerZipCode: '94063',
      lastupdate: '2014-08-09 13:49:54'
      },
      {
      id: 5,
      rptOwnerCik: '0001017659',
      rptOwnerName: 'ABDOO RICHARD A',
      rptOwnerStreet1: '9227 CENTRE POINTE DRIVE',
      rptOwnerStreet2: '',
      rptOwnerCity: 'WEST CHESTER',
      rptOwnerState: 'OH',
      rptOwnerZipCode: '45069',
      lastupdate: '2014-08-09 13:49:55'
    }
  ];
    return {
      get: function(arg){
        return _owners[arg.id - 1];
      },
      query: function(){
        return _owners;
      }
    };
  });
