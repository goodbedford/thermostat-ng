(function() {
  "use strict";

  angular
    .module("thermostat")
    .factory("HomeService", HomeService);

    HomeService.$inject = ["$http"];

    function HomeService($http) {
      var currentHome;
      var service = {
        init:init,
        getHome: getHome,
        getRoomById: getRoomById,
        increaseTemp: increaseTemp,
        decreaseTemp: decreaseTemp,
        saveRoom: saveRoom

      }
      return service;

      function init() {
        return $http.get("./src/home.json")
          .then(function(home) {
            currentHome = home.data;
            return currentHome;
          });
      }
      function getHome() {
        if (currentHome) {
          return currentHome;
        }
        else {
          return $http.get("./src/home.json")
            .then(function(home) {
              currentHome = home.data;
              return currentHome;
            });
        }
      }
      function getRoomById(id) {
        var currentRoom = currentHome.rooms.filter(function(room) {
             return room.roomId == id;
           })[0];
           return currentRoom;
      }
      function increaseTemp(room) {
        var num = room.thermostat + 1;
        if (num >= 130 ) {
          room.thermostat = 130;
        }
        else {
          room.thermostat += 1;
        }
        currentHome.rooms.forEach(function(roomItem) {
             if(roomItem.roomId == room.roomId) {
               roomItem = room;
             }
        });
      }
      function decreaseTemp(room) {
        var num = room.thermostat - 1;
        if (num <= 0 ) {
          room.thermostat = 0;
        }
        else {
          room.thermostat -= 1;
        }
        currentHome.rooms.forEach(function(roomItem) {
             if(roomItem.roomId == room.roomId) {
               roomItem = room;
             }
        });
      }

      function saveRoom(room) {
        currentHome.rooms.push(room);
      }
    }

})();
