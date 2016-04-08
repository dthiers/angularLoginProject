app.service('apiInterceptor', [
  '$rootScope',
  '$localStorage',
  '$q',
  function($rootScope, $localStorage, $q){
  var service = this;

  service.request = function(config){
    console.log(config.headers);
    // Check if localStorage.jwt is set.
    var access_token = $localStorage.jwt;
    // Set the token on the header on authorization
    if(access_token){
      config.headers.authorization = access_token;
    }
    return config;
  };

  service.responseError = function(response){
    if(response.status === 401){
      $rootScope.$broadcast('unauthorized');
    }
    return $q.reject(response);
  }
}]);
