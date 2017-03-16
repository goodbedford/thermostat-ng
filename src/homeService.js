(function() {
  "use strict";


  angular
    .module("thermostat")
    .factory("HomeService", HomeService);

  HomeService.$inject = ["$http", "$stateParams"];

  function HomeService($http, $stateParams) {
    var currentHome;
    var baseUrl = "https://home-data.herokuapp.com/api/homes";
    var service = {
      init:init,
      getHome: getHome,
      getRooms: getRooms,
      getRoomById: getRoomById,
      increaseTemp: increaseTemp,
      decreaseTemp: decreaseTemp,
      roomUpdate: roomUpdate,
      createRoom: createRoom
    };

    return service;

    function init() {
      return $http.get(baseUrl)
          .then(function(homesData) {
            var homes = homesData.data;
            return homes;
          });
    }
    function getHome(homeId) {
      return $http.get(baseUrl + "/" + homeId)
          .then(function(home) {
            return home.data;
          });
    }
    function getRooms(homeId) {
      return $http.get(`${baseUrl}/${homeId}/rooms`)
        .then(function(rooms) {
          return rooms.data;
        });
    }
    function getRoomById(homeId, roomId) {
      return $http.get(`${baseUrl}/${homeId}/rooms/${roomId}`)
        .then(function(room) {
          return room.data;
        });
    }
    function increaseTemp(homeId,room) {
      // debugger;
      var num = room.thermostat + 1;
      if (num >= 130 ) {
        room.thermostat = 130;
      }
      else {
        room.thermostat += 1;
      }
      return updateRoom(homeId, room);
    }
    function decreaseTemp(homeId, room) {
      var num = room.thermostat - 1;
      if (num <= 0 ) {
        room.thermostat = 0;
      }
      else {
        room.thermostat -= 1;
      }
      return updateRoom(homeId, room);
    }
    function roomUpdate(homeId, room) {
      return updateRoom(homeId, room)
    }
    function createRoom(room) {
      var homeId = $stateParams.homeId;
      return $http
        .post(`${baseUrl}/${homeId}/rooms`, room)
        .then(function(newRoom) {
          return newRoom.data;
        })
        .catch(function(error) {
          console.error(error);
        })
    }
    function updateRoom(homeId, room) {
      return $http
        .put(`${baseUrl}/${homeId}/rooms/${room._id}`, room)
        .then(function(updatedRoom) {
          return updatedRoom.data;
        })
        .catch(function(error) {
          console.dir(error);
        });
    }
  }

})();
