app.factory('userService', [
  '$http',
  'API',
  function($http, API) {

  var userService = {};

  return {
    addUser: function(user, options){
      $http.post(API.user, user).then(
        options.onSuccess, options.onError
      )
    },
    getAllUsers: function(options){
      $http.get(API.user).then(
        options.onSuccess, options.onError
      )
    }
  }
}])
