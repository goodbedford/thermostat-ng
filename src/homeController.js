(function() {
  "use strict";

  angular
      .module("thermostat")
      .controller("HomeController", HomeController);

  HomeController.$inject = ["$http", "$stateParams", "$state", "HomeService", "homesResolve"];

  function HomeController($http, $stateParams, $state, HomeService, homesResolve ) {
    var vm = this;
    vm.submitRoom = submitRoom;
    vm.currentRoomId = $state.params.id;
    vm.homes = homesResolve;
    vm.date = (new Date()).toDateString();
    vm.newRoomForm = {};


    function submitRoom(isValid) {
      console.log(vm.newRoomForm);
      var defaultTemp = 55;
      var newRoom = vm.newRoomForm;
      newRoom.thermostat =  defaultTemp;
      newRoom.curtains = false;
      newRoom.lights = true;

      if(isValid) {
        HomeService.createRoom(newRoom)
          .then(function(savedRoom) {
            vm.newRoomForm = {name: "", thermostat:""};
            $state.go("homes.homesDetails.rooms.roomDetails", {homeId: $state.params.homeId, id: savedRoom._id},{reload: true});
          });
      }
      vm.newRoomForm = {name: "", thermostat:""};
    }
  }
})();
