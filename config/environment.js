'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'spending-ui',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      TRANSACTION_API_BASE_PATH: 'api/v1',
      TRANSACTION_SUMMARY_API_BASE_PATH: 'api/v1',
      IMPORTED_TRANSACTION_API_BASE_PATH: 'api/v1',
      CATEGORY_API_BASE_PATH: 'api/v1',
      SUPPORTED_CURRENCIES: ['CAD', 'USD', 'TWD'],
      SUPPORTED_TRANSACTION_TYPES: ['DEBIT', 'CREDIT'],
    }
  };

  if (environment === 'development') {
    ENV.APP.SPENDING_API_HOST = 'http://localhost:8080';
  }

  if (environment === 'test') {
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.APP.SPENDING_API_HOST = 'http://192.168.86.115:9000';
  }

  return ENV;
};
