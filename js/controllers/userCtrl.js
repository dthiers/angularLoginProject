app.controller('userCtrl', [
  '$scope',
  '$localStorage',
  'userService',
  function(sc, $localStorage, userService) {

  userService.getAllUsers($localStorage.jwt, {
    onSuccess: function(result){
      console.log(result);
      sc.users = result;
    },
    onError: function(err){
      console.log(err);
    }
  })
}])
