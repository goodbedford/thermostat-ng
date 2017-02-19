(function () {
	"use strict";

	angular
		.module("thermostat")
		.config(config);

	config.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];

	function config($locationProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider
			.state("home", {
        abstract: true,
				url: "/home",
        views: {
          "header@home":{
            templateUrl: "src/layout/header.tpl.html",
          },
          "home":{
            templateUrl: "src/layout/home.tpl.html",
            controller: "HomeController",
            controllerAs: "homeCtrl",
          }
        }
			})
      // .state("home.room", {
      //   url: "/room",
      //   views: {
      //     "roomId@home" : {
      //       templateUrl: "src/layout/roomId.tpl.html",
      //       controller: "HomeController",
      //       controllerAs: "homeCtrl",
      //     }
      //   }
      // })
      .state("home.rooms", {
        url: "/rooms",
        views: {
          "homeSection@home":{
            templateUrl: "src/layout/homeSection.tpl.html",
            controller: "HomeController",
            controllerAs: "homeCtrl",
          "rooms@home.rooms" : {
              templateUrl: "src/layout/rooms.tpl.html"
            }
          }
        }
      })
      // .state("home.rooms.detail", {
      //   url: "/:id",
      //   views: {
      //
      //     }
      // })
      // "rooms@home" : {
      //   templateUrl: "src/layout/rooms.tpl.html",
      //   controller: "HomeController",
      //   controllerAs: "homeCtrl",
      // },
      // "roomId@home" : {
      //   templateUrl: "src/layout/roomId.tpl.html",
      //   controller: "HomeController",
      //   controllerAs: "homeCtrl",
      // }
		$urlRouterProvider.otherwise("/home/rooms");



		//remove hash in urls
		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});
	}

})();
