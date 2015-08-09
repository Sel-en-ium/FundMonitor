/*jslint node: true*/
(function () {
  'use strict';

  var
    i,
    path = require('path'),
    config = require(path.resolve('config')),
    services = [];

  // Load all services.
  for (i = 0; i < config.services.length; i += 1) {
    services.push(new config.serviceApi(config.services[i].service, config.services[i].config));
  }

  // Starts all services.
  for (i = 0; i < services.length; i += 1) {
    services[i].startService();
  }

}());
