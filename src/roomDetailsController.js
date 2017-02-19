(function() {
    "use strict";

    angular
        .module("thermostat")
        .controller("RoomDetailsController", RoomDetailsController);

    RoomDetailsController.$inject = ["$http", "$stateParams", "HomeService", "roomResolve"];

    function RoomDetailsController($http, $stateParams, HomeService, roomResolve) {
        var vm = this;
        vm.currentRoom  = roomResolve;
        vm.increaseTemp = increaseTemp;
        vm.decreaseTemp = decreaseTemp;
        vm.toggleDevice = toggleDevice;

        function increaseTemp(room) {
          HomeService.increaseTemp(room);
        }
        function decreaseTemp(room) {
          HomeService.decreaseTemp(room);
        }
        function toggleDevice(type, room) {
          room[type] =  ! room[type];
        }
    }
})();
