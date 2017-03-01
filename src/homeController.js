(function() {
    "use strict";

    angular
        .module("thermostat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["$http", "$stateParams", "$state", "HomeService", "homeResolve"];

    function HomeController($http, $stateParams, $state, HomeService, homeResolve) {
        var vm = this;
        vm.changeRoom = changeRoom;
        vm.submitRoom = submitRoom;
        vm.currentRoom;
        vm.home = homeResolve;
        vm.date = (new Date()).toDateString();
        vm.newRoomForm = {};

        //this function takes a roomId
        function changeRoom(id) {
            vm.home.rooms.filter(function roomFilter(room){
              if (room.roomId == id) {
                vm.currentRoom = room;
              }
            });
        }
        function submitRoom(isValid) {
          console.log(vm.newRoomForm);
          var defaultTemp = 55;
          var newRoom = vm.newRoomForm;
          var lastIndex = vm.home.rooms.length - 1;
          var newId = vm.home.rooms[lastIndex].roomId + 1;
          newRoom.thermostat =  defaultTemp;
          newRoom.roomId = newId;
          newRoom.curtains = false;
          newRoom.lights = true;
          newRoom.isActive = true;

          if(isValid) {
            HomeService.saveRoom(newRoom);
            vm.newRoomForm = {name: "", thermostat:""};
            $state.go("home.rooms.details", {id: newRoom.roomId});
          }
          vm.newRoomForm = {name: "", thermostat:""};
        }

    }
})();
