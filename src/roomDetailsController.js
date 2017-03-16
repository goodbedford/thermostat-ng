(function() {
  "use strict";

  angular
      .module("thermostat")
      .controller("RoomDetailsController", RoomDetailsController);

  RoomDetailsController.$inject = ["$http", "$state", "$stateParams", "HomeService", "roomResolve"];

  function RoomDetailsController($http, $state, $stateParams, HomeService, roomResolve) {
    var vm = this;
    vm.currentRoom  = roomResolve;
    vm.increaseTemp = increaseTemp;
    vm.decreaseTemp = decreaseTemp;
    vm.toggleDevice = toggleDevice;

    function increaseTemp(room) {
      HomeService.increaseTemp($stateParams.homeId, room)
        .then(function(room) {
          vm.currentRoom = room;
          // $state.go("homes.homesDetails.rooms.roomDetails",{homeId: $stateParams.homeId, id: $stateParams.id}, {reload: true});
        });
    }
    function decreaseTemp(room) {
      HomeService.decreaseTemp($stateParams.homeId, room)
        .then(function(room) {
          vm.currentRoom = room;
          // $state.go("homes.homesDetails.rooms.roomDetails",{homeId: $stateParams.homeId, id: $stateParams.id}, {reload: true});
        });
    }
    function toggleDevice(type, room) {
      room[type] =  ! room[type];
      HomeService.roomUpdate($stateParams.homeId, room)
        .then(function(updated) {
          vm.currentRoom = updated;
          // $state.go("homes.homesDetails.rooms.roomDetails",{homeId: $stateParams.homeId, id: $stateParams.id}, {reload: true});
        });
    }
  }
})();
