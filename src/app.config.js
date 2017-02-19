(function () {
	"use strict";

	angular
		.module("thermostat")
		.config(config);

	config.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];

	function config($locationProvider, $stateProvider, $urlRouterProvider) {

    var homeState = {
      abstract: true,
      name: "home",
      url: "/home",
      views: {
        "header@home": {
          templateUrl: "src/layout/header.tpl.html"
        },
        "home": {
          templateUrl: "src/layout/home.tpl.html",
          controller: "HomeController",
          controllerAs: "homeCtrl",
          resolve: {
            homeResolve: function (HomeService) {
              return HomeService.init();
            }
          }
        }
      }
    }
    var roomsState = {
      name: "home.rooms",
      url: "/rooms",
      views: {
        "homeSection@home": {
          templateUrl: "src/layout/homeSection.tpl.html",
        },
        "rooms@home.rooms": {
          templateUrl: "src/layout/rooms.tpl.html",
        }
      }
    }
    var roomDetailsState = {
      name: "home.rooms.details",
      url: "/:id",
      views: {
        "roomDetails@home.rooms": {
          templateUrl: "src/layout/roomDetails.tpl.html",
          controller: "RoomDetailsController",
          controllerAs: "roomDetailsCtrl",
          resolve: {
            roomResolve: function($stateParams, HomeService) {
              // debugger;
              return HomeService.getRoomById($stateParams.id);
            }
          }
        }
      }
    }
    $stateProvider.state(homeState);
    $stateProvider.state(roomsState);
    $stateProvider.state(roomDetailsState);

		$urlRouterProvider.otherwise("/home/rooms");



		//remove hash in urls
		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});
	}

})();
