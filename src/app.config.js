(function () {
	"use strict";

	angular
		.module("gb")
		.config(config);

	config.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];

	function config($locationProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider
			.state("home", {
				url: "/home",
        views: {
          "header@home":{
            templateUrl: "src/layout/header.tpl.html",
          },
          "home":{
            templateUrl: "src/layout/home.tpl.html",
            controller: "HomeController",
            controllerAs: "home",
          },
          "homeSection@home":{
            templateUrl: "src/layout/homeSection.tpl.html",
            controller: "HomeController",
            controllerAs: "home",
          }
        }
			})
      .state("lost", {
        url: "/lost",
        template: "<div><span ui-sref='home'>Go Back Home</span></div>"
      });

		$urlRouterProvider.otherwise("/home");



		//remove hash in urls
		$locationProvider.html5Mode({
			enabled: false,
			requireBase: false
		});
	}

})();
