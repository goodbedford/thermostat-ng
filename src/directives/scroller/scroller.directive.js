(function() {
  "use strict";

  angular
  .module("thermostat")
  .directive("scroller", scroller);

  scroller.$inject = [];

  function scroller() {
    return {
      restrict: "A",
      scope: {
        direction: "@"
      },
      link: link
    }
  }
  function link(scope, element, attrs) {

    element.on("click", function() {
      var block = document.querySelector(".home__section-rooms");
      var scrollStart = 201;
      console.log("1scrollHeight:", block.scrollHeight)
      console.log("1clientlHeight:", block.clientHeight)

      if(scope.direction.toLowerCase() === "up") {
        if(block.scrollHeight > scrollStart ) {
          block.scrollTop -= 50;
          console.log("2clientlHeight:", block.clientHeight)
          console.log("2scrollHeight:", block.scrollHeight)
        }
      }
      else if(scope.direction.toLowerCase() === "down") {
        if(block.scrollHeight > scrollStart ) {
          block.scrollTop += 50;
          console.log("2clientlHeight:", block.clientHeight)
          console.log("2scrollHeight:", block.scrollHeight)
        }
      }


    });
  }

})();
