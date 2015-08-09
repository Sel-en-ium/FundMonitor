/*jslint node: true*/
'use strict';

/**
 * An implementation of the Retriever for collecting data from CIBC.
 *
 * @constructor
 */
var
  htmlParser = require("htmlParser"),
  //$ = require('jquery'),
  Retriever = {},
  url = 'https://www.cibc.com/ratesservice/rds?lobId=7&sourceProductCode=';

Retriever.getAllFundsNow = function (callback) {
  callback(null, {hi:'j'});
};

module.exports = Retriever;