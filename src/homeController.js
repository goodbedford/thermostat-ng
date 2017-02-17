(function() {
    "use strict";

    angular
        .module("gb")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["$http"];

    function HomeController($http) {
        var home = this;
        home.name = "frankie";
        home.cake = "cake";
        home.job = "ad ops";

        $http.get("./src/home.json")
          .then(function(resp) {
            home.home = resp.data;
          });
    }
})();
