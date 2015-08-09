/*jslint node: true*/
'use strict';

/**
 * An api defining functions used to gather fund data from different sources.
 *
 *
 * @param adapter - An implementation of the api.
 * @constructor
 */
module.exports = function Retriever(adapter) {

  /**
   * Gathers all the funds from a certain source.
   *
   * @param {function} callback - func(error, fundData)
   *  fundData -> [{fundId: 123, date: jsDateObj, value: 12.123}, {...}]
   */
  this.getAllFundsNow = function (callback) {
    adapter.getAllFundsNow(callback);
  };

};