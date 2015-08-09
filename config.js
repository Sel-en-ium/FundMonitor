/*jslint node: true*/

(function () {
  'use strict';

  var path = require('path');

  module.exports = {
    "serviceApi": require(path.resolve('ServiceServer/Service/ServiceApi')),
    "services": [
      {
        "service": require(path.resolve('ServiceServer/Service/Services/Retriever')), // The service
        "config": {
          "interval": 1800000,
          "api": require(path.resolve('ServiceServer/Retriever/RetrieverApi')), // The retriever api
          "adaptersDir": path.resolve('ServiceServer/Retriever/Adapters') // The dir containing the retrievers you want to run
        }
      }
    ]
  };

}())
