/*jslint node: true*/
'use strict';

/**
 * An implementation of the Retriever for collecting data from CIBC.
 *
 * @constructor
 */
var
  http = require('http'),
  cheerio = require("cheerio"),
  request = require("request"),
  htmlParser = require("htmlParser"),
  $ = require('jquery'),
  Retriever = {},
  url = 'https://www.cibc.com/ratesservice/rds?lobId=7&sourceProductCode=';






Retriever.getAllFundsNow = function (callback) {

  request({
    uri: 'https://www.cibc.com/ca/rates/mutual-fund-rates.html'
  }, function (error, response, body) {
    if (error) {
      callback(error);
    } else {
      // Parse the html

      var $ = cheerio.load(body);

      var
        i,
        j,
        temp = '',
        rows1,
        rows2,
        names = [],
        list = [],
        allTables = $('table'),
        selectedTables = [];


      for (i = 0; i < allTables.length; i += 1) {
        if ($(allTables[i]).find('.headerRow2').find('th')[1].children[2].data.match(/price/i)) {
          selectedTables.push(allTables[i]);
          console.log(i);
        }
      }

      for (i = 0; i < selectedTables.length; i += 1) {
        rows1 = $(selectedTables[i]).find('.tabularData1');
        rows2 = $(selectedTables[i]).find('.tabularData2');
        console.log('length ' + (rows1.length + rows2.length));
        for (j = 0; j < rows1.length; j += 1) {
          temp = $($(rows1[j]).find('td')[1]).find('script')[0].children[0].data;
          temp = temp.substring(11, temp.indexOf('.'));
          list.push(temp);
          temp = $($(rows1[j]).find('td')[0]).find('a')[0].children[0].data;
          names.push(temp);
        }
        for (j = 0; j < rows2.length; j += 1) {
          temp = $($(rows2[j]).find('td')[1]).find('script')[0].children[0].data;
          temp = temp.substring(11, temp.indexOf('.'));
          list.push(temp);
          temp = $($(rows1[j]).find('td')[0]).find('a')[0].children[0].data;
          names.push(temp);
        }
      }

      console.log(list);
      console.log(names);

    }
  });

};

module.exports = Retriever;

//jsdom.env(
//  body,
//  ["http://code.jquery.com/jquery.js"],
//  function (err, window) {
//    var
//      i,
//      j,
//      temp = '',
//      entries,
//      list = [],
//      allTables = $('table'),
//      selectedTables = [];
//
//
//    for (i = 0; i < allTables.length; i += 1) {
//      if ($(allTables[i]).find('tr.headerRow2>th:nth-of-type(2)')[0].innerHTML.match(/price/i)) {
//        selectedTables.push(allTables[i]);
//      }
//    }
//
//    for (i = 0; i < selectedTables.length; i += 1) {
//      entries = $(selectedTables[i]).find('tr.tabularData1>td:nth-of-type(2)>script');
//      entries.append($(selectedTables[i]).find('tr.tabularData2>td:nth-of-type(2)>script'));
//      for (j = 0; j < entries.length; j += 1) {
//        temp = entries[j].innerHTML;
//        temp = temp.substring(11, temp.indexOf('.'));
//        list.push(temp);
//      }
//    }
//
//    console.log(JSON.stringify(list));
//  }
//);

//var
//  handler,
//  parser;
//handler = new htmlParser.DefaultHandler(function (error, dom) {
//  if (error) {
//    callback(error);
//  } else {
//
//  }
//});
//parser = new htmlParser.Parser(handler);
//parser.parseComplete(body);
//sys.puts(sys.inspect(handler.dom, false, null));

//var options = {
//  host: 'www.cibc.com',
//  port: 80,
//  path: '/ca/rates/mutual-fund-rates.html'
//};
//
//http.get(options, function(res) {
//  console.log("Got response: " + res.statusCode);
//}).on('error', function(e) {
//  console.log("Got error: " + e.message);
//});


////The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
//var options = {
//  host: 'www.cibc.com',
//  path: '/ca/rates/mutual-fund-rates.html'
//};
//
//var cb = function(response) {
//  var str = '';
//
//  //another chunk of data has been recieved, so append it to `str`
//  response.on('data', function (chunk) {
//    str += chunk;
//  });
//
//  //the whole response has been recieved, so we just print it out here
//  response.on('end', function () {
//    console.log(str);
//  });
//};
//
//http.request(options, cb).end();
