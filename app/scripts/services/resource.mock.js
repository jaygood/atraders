/*
 *  API for items used on diagnostics sheet
 *
 */

'use strict';
angular.module('jdResource.mock', [])
  .factory('Login', function () {
    return {
      save: function(cb){
        cb({status: 'success', data: 'auth-token'});
      }
    };
  })

  .factory('Items', function () {
    var funct = function(){
      this.$update= function(cb){
        _items[_search(this.id, _items)] = this;
      };
      this.$save= function(cb){
        _items.push(this);
      };
      this.$delete= function(cb){
        _items.splice(_search(this.id, _items), 1);
      };
    };
    funct.query = function(cb){
      cb(_items)
      return _items;
    };

    var _search = function (id, myArray){
      for (var i=0, len=myArray.length; i < len; i++) {
        if (myArray[i].id === id) {
          return i;
        }
      }
      return null;
    };

    function Item(id, name, phrase){
      var item = new funct();
      item.id = id;
      item.name = name;
      item.phrase = phrase;
      return item;
    }
    var item1 = Item(0, 'jon', 'hello'),
        item2 = Item(1, 'jon', 'hello for secnod time'),
        item3 = Item(2, 'jon', 'hello for third time'),
        _items = [item1, item2, item3];

    return funct;
  })

  .factory('Owners', function(){
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
      get: function(arg, cb){
        var data = {data: _owners[arg.id - 1]};
        cb(data);
        return data;
      },
      query: function(cb){
        var data = {status: 'success', data: _owners};
        cb(data);
        return data;
      }
    };
  });
