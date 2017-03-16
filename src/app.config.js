(function () {
  "use strict";

  angular
		.module("thermostat")
		.config(config);

  config.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];

  function config($locationProvider, $stateProvider, $urlRouterProvider) {


    var homeState = {
      // abstract: true,
      name: "homes",
      url: "/homes",
      views: {
        "homes": {
          templateUrl: "src/layout/homes.tpl.html",
          controller: "HomeController",
          controllerAs: "homeCtrl",
          resolve: {
            homesResolve: function (HomeService) {
              // debugger;
              return HomeService.init();
            },
          }
        },
        "header@homes": {
          templateUrl: "src/layout/header.tpl.html"
        },
        "homeSection@homes": {
          templateUrl: "src/layout/homeSection.tpl.html"
        },
      }
    };
    var homesList = {
      name: "homes.homesList",
      parent: "homes",
      url: "/homes-list",
      views: {
        "panelItems@homes": {
          templateUrl: "src/layout/homesItem.tpl.html"
        },
        "controls@homes": {
          templateUrl: "src/layout/homeControls.tpl.html",
        },
      }
    };
    var homeDetailsState = {
      abstract: true,
      name: "homes.homesDetails",
      parent: "homes",
      url: "/:homeId",
    };
    var roomsState = {
      name: "homes.homesDetails.rooms",
      parent: "homes.homesDetails",
      url: "/rooms",
      views: {
        "controls@homes": {
          templateUrl: "src/layout/roomControls.tpl.html",
        },
        "panelItems@homes": {
          templateUrl: "src/layout/rooms.tpl.html",
          controller: "HomeDetailsController",
          controllerAs: "homeDetailsCtrl",
          resolve: {
            homeDetailsResolved: function($stateParams, HomeService) {
              return HomeService.getRooms($stateParams.homeId);
            }
          },
        },
      }
    };
    var newHomeForm = {
      name: "homes.newHomeForm",
      parent: "homes",
      url: "/newRoom",
      views: {
        "roomDetails@homes": {
          templateUrl: "src/layout/newHomeForm.tpl.html"
        },
        "error@homes.newRoomForm": {
          templateUrl: "src/layout/error.tpl.html"
        }
      }
    };
    var roomDetailsState = {
      name: "homes.homesDetails.rooms.roomDetails",
      parent: "homes.homesDetails.rooms",
      url: "/:id",
      views: {
        "roomDetails@homes": {
          templateUrl: "src/layout/roomDetails.tpl.html",
          controller: "RoomDetailsController",
          controllerAs: "roomDetailsCtrl",
          resolve: {
            roomResolve: function($stateParams, $state, HomeService) {
              if($state.params.id === "" ) {
                $state.go("homes.homesList");
              }
              return HomeService.getRoomById($stateParams.homeId, $stateParams.id);
            },
          }
        },
        "roomsControlsBtns@homes": {
          templateUrl: "src/layout/roomsControlsBtns.tpl.html",
        }
      }
    };
    var newRoomForm = {
      name: "homes.homesDetails.rooms.newRoomForm",
      parent: "homes.homesDetails.rooms",
      url: "/newRoom",
      views: {
        "roomDetails@homes": {
          templateUrl: "src/layout/newRoomForm.tpl.html"
        },
        "error@homes.homesDetails.rooms.newRoomForm": {
          templateUrl: "src/layout/error.tpl.html"
        }
      }
    };
    $stateProvider.state(homeState);
    $stateProvider.state(homesList);
    $stateProvider.state(homeDetailsState);
    $stateProvider.state(newHomeForm);
    $stateProvider.state(roomsState);
    $stateProvider.state(newRoomForm);
    $stateProvider.state(roomDetailsState);

    $urlRouterProvider.otherwise("/homes/homes-list");



  //remove hash in urls
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
  }

})();
