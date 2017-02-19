(function() {
    "use strict";

    angular
        .module("thermostat")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["$http", "$stateParams", "HomeService", "homeResolve"];

    function HomeController($http, $stateParams, HomeService, homeResolve) {
        var vm = this;
        vm.changeRoom = changeRoom;
        vm.currentRoom;
        vm.home = homeResolve;
        vm.date = (new Date()).toDateString();

        function getCurrent() {
          getRoomById(vm.stateId);
        }
        function changeRoom(id) {
              vm.currentRoom = HomeService.getRoomById(id);
        }

    }
})();
