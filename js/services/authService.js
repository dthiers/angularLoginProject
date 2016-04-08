app.factory('authService', [
  '$http',
  'API',
  function($http, API) {
  // TODO: login chips

  var authService = {};

  return {
    login: function(credentials){
      return (credentials.username === 'admin' && credentials.password === 'admin');
    },
    loginServer: function(credentials, options){
      // $http.post('http://localhost:3000/login?format=json', credentials).then(
      //   options.onSuccess, options.onError
      // );
      $http.post(API.login, credentials).then(
        options.onSuccess, options.onError
      );
    },
    requestJwt: function(user, options){
      var user = {
        username: user.username,
        password: user.password
      }
      $http.post('http://localhost:3000/jwt?format=json', user).then(
        options.onSuccess, options.onError
      )
    }
  }
}])
