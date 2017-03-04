(function() {
  "use strict";

  angular
  .module("thermostat")
  .directive("roomSelector", roomSelector);

  roomSelector.$inject = [];

  function roomSelector() {
    return {
      restrict: "A",
      controller: roomSelectorController,
      scope: {
        direction: "@",
        rooms: "=rooms"
      },
      link: link
    }
  }
  function link(scope, element, attrs, roomSelectorController) {

    element.on("click", function() {
      var direction = scope.direction;
      var state = roomSelectorController.state;
      var currentRoomId = parseInt(state.params.id);
      var nextRoomId;
      var rooms = scope.rooms;
      if(currentRoomId >= 0) {
        if(direction.toLowerCase() === "down") {
          nextRoomId = getNext(rooms, currentRoomId);
          if(nextRoomId !== currentRoomId) {
            state.go("home.rooms.details", {id: nextRoomId});
          }
        }
        else if(direction.toLowerCase() === "up") {
          nextRoomId = getPrev(rooms, currentRoomId);
          if(nextRoomId !== currentRoomId) {
            state.go("home.rooms.details", {id: nextRoomId});
          }
        }
      }
    });
  }

  function roomSelectorController($stateParams, $state) {
    var vm = this;
    vm.roomId = parseInt($stateParams.id);
    vm.state = $state;
  }
  function getNext(rooms, currentRoomId) {
    var nextRoom;

    for( var i = 0; i < rooms.length; i++) {
      if(rooms[i].roomId === currentRoomId) {
        i++;
        nextRoom = i;
        if(rooms[nextRoom]) {
          return rooms[nextRoom].roomId;
        }
      }
    }
    return currentRoomId;
    console.log("Error missing roomId");
  }
  function getPrev(rooms, currentRoomId) {
    var prevRoom;

    for( var i = 0; i < rooms.length; i++) {
      if(rooms[i].roomId === currentRoomId) {
        i--;
        prevRoom = i;
        if(rooms[prevRoom]) {
          return rooms[prevRoom].roomId;
        }
        else {
          return currentRoomId;
        }
      }
    }
    return currentRoomId;
    console.log("Error missing roomId");
  }
})();
