'use strict';

/**
 * @ngdoc overview
 * @name randomGroupsApp
 * @description
 * # randomGroupsApp
 *
 * Main module of the application.
 */
angular
  .module('randomGroupsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngMessages',
    //'ngRoute',
    'ngSanitize',
    //'ngTouch',
    'ngMaterial',
    'ui.router'
  ])

  // log ui-router errors
  .run(function ($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
  })

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // redirect to home for any unmached url
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        //controller: 'MainCtrl',
        //controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });

  }]);
