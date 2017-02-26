(function() {
    "use strict";

    angular
        .module("thermostat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["$http", "$stateParams", "HomeService", "homeResolve"];

    function HomeController($http, $stateParams, HomeService, homeResolve) {
        var vm = this;
        vm.changeRoom = changeRoom;
        vm.submitRoom = submitRoom;
        vm.currentRoom;
        vm.home = homeResolve;
        vm.date = (new Date()).toDateString();
        vm.form = {};

        //this function takes a roomId
        function changeRoom(id) {
            vm.home.rooms.filter(function roomFilter(room){
              if (room.roomId == id) {
                vm.currentRoom = room;
              }
            });
        }
        function submitRoom() {

          console.log(vm.form);
          var newRoom = vm.form;
          var lastIndex = vm.home.rooms.length - 1;
          var newId = vm.home.rooms[lastIndex].roomId + 1;
          newRoom.thermostat = parseInt(newRoom.thermostat);
          newRoom.roomId = newId;
          newRoom.curtains = false;
          newRoom.lights = true;
          newRoom.isActive = true;


          HomeService.saveRoom(newRoom);
          vm.form = {};

        }

    }
})();
