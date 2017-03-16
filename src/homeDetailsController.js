(function() {
  "use strict";

  angular
    .module("thermostat")
    .controller("HomeDetailsController", HomeDetailsController);

  HomeDetailsController.$inject = ["$http", "$stateParams", "$state", "HomeService", "homeDetailsResolved"];

  function HomeDetailsController($http, $stateParams, $state, HomeService, homeDetailsResolved ) {
    var vm = this;
    vm.rooms = homeDetailsResolved;
    vm.homeId = $stateParams.homeId;
  }

})();
