/*jslint node: true*/

/**
 * A service for retrieving and saving fundData from various sources
 */
(function () {
  'use strict';

  var
    jsUtility = require('jsUtility'),
    fileUtility = require('fileUtility'),
    adapters = [],
    Retriever = {};

  /**
   * Gathers all the funds from a certain source.
   *
   * @param {function} callback - func(error, fundData)
   *  fundData -> [{fundId: 123, date: jsDateObj, value: 12.123}, {...}]
   */
  function getAllFundsNow(callback) {
    var
      i,
      done,
      allFundData = [];

    done = jsUtility.syncBarrier(adapters.length, function (err) {
      callback(err, allFundData);
    });

    function conglomerate(err, fundData) {
      allFundData = allFundData.concat(fundData);
      done(err);
    }

    for (i = 0; i < adapters.length; i += 1) {
      adapters[i].getAllFundsNow(conglomerate);
    }
  }

  /**
   * Performs the business logic of the Retriever Service.
   */
  function serviceLoop() {
    getAllFundsNow(function (err, fundData) {
      if (err) {
        console.log(err);
      }
      console.log(JSON.stringify(fundData));
    });
  }

  /**
   * Starts the service loop with the specified interval.
   *
   * @param intervalPeriod - In ms.
   */
  function startLoop(intervalPeriod) {
    setInterval(function () {
      serviceLoop();
    }, intervalPeriod);
  }

  /* IMPLEMENTATION */

  Retriever.startService = function (config) {
    var Api = config.api;

    fileUtility.forEachFile(config.adaptersDir,
      function (file, done) {
        adapters.push(new Api(require(file)));
        done();
      },
      function (err) {
        if (err) {
          throw new Error(err);
        }
        startLoop(config.interval);
      });
  };

  module.exports = Retriever;

}());
