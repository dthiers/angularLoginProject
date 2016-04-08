app.controller('dashboardCtrl',
  ['$scope',
  '$localStorage',
  'authService',
  function(sc, $localStorage, authService) {

  if($localStorage.jwt){
    sc.jwt = $localStorage.jwt;
  } 

  sc.requestJwt = function(){
    if($localStorage.user){
      authService.requestJwt($localStorage.user, {
        onSuccess: function(result){
          $localStorage.jwt = result.data.jwt;
          sc.jwt = result.data.jwt;
        },
        onError: function(err){
          console.log(err.statusText);
        }
      })
    }
  }

  sc.requestJwt();
}])
