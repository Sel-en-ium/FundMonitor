/*jslint node: true*/

/**
 * An api defining the expected functions of a service.
 */
module.exports = function ServiceApi(service, serviceConfig) {
  'use strict';

  /**
   * Starts the service with the specified config.
   * @param serviceConfig
   */
  this.startService = function () {
    service.startService(serviceConfig);
  };
};


