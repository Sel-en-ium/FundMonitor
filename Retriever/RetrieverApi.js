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
   * @param {function} successCallback - func(fundData)
   *  fundData -> [{fundId: 123, date: jsDateObj, value: 12.123}, {...}]
   * @param {function} errorCallback - func(err)
   */
  this.getAllFundsNow = function (successCallback, errorCallback) {
    adapter.getAllFundsNow (successCallback, errorCallback);
  };

  /**
   * Gathers all the funds from a certain source for a specified date.
   *
   * @param {date} date - The date you wish to gather data for.
   * @param {function} successCallback - func(fundData)
   *  fundData -> [{fundId: 123, value: 12.123}, {...}]
   * @param {function} errorCallback - func(err)
   */
  this.getAllFundsOnDate = function (date, successCallback, errorCallback) {
    adapter.getAllFundsOnDate(date, successCallback, errorCallback);
  };

  /**
   * Gets all the data for all funds as far back as possible.
   *
   * @param {function} successCallback - func(fundData)
   *  fundData -> [
   *                {date: jsDateObj, funds: [{fundId: 123, value: 12.123}, {...}]},
   *                {date: ..., funds: [...]}
   *              ]
   * @param {function} errorCallback - func(err)
   */
  this.getAllFundsHistory = function (successCallback, errorCallback) {
    adapter.getAllFundsHistory(successCallback, errorCallback);
  };

};