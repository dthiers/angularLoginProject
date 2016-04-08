app.controller('addUserCtrl', [
  '$scope',
  '$localStorage',
  'userService',
  function(sc, $localStorage, userService) {
    
  sc.addUser = function(user){
    jwt = $localStorage.jwt;
    userService.addUser(user, jwt, {
      onSuccess: function(result){
        console.log(result.data);
      },
      onError: function(err){
        console.log(err.statusText);
      }
    })
  }
}])
