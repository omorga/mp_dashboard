'use strict';

/**
 * @ngdoc overview
 * @name monitoringDashboardApp
 * @description
 * # monitoringDashboardApp
 *
 * Main module of the application.
 */
angular
  .module('mp-dashboard', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'angular-flot',
    'bw.paging',
      'ui.bootstrap',
      'ui.select'
  ]);
