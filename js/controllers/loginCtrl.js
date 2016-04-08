app.controller('loginCtrl', [
  '$scope',
  'authService',
  '$localStorage',
  '$state',
  '$timeout',
  function(sc, authService, $localStorage, $state, $timeout) {

  sc.test = "Test";

  sc.login = function(username, password){
    if(authService.login({ username: username, password: password })){
      // TODO: set user to true;
      console.log('user is logged in');
    } else {
      console.log('login failed');
    }
  }

  // Sets the user and request JWT from API
  sc.loginServer = function(username, password){
    authService.loginServer({ username: username, password: password}, {
      onSuccess: function(result){
        // Check if user is Admin
        if(!result.data.user){
          console.log('JEMOEDER');
        }
        if(result.data.user.isAdmin){
          $localStorage.user = result.data.user;
          // Request JWT from API
          sc.requestJwt(result.data.user);
        }
        // If user is no Admin
        else {
          sc.setErr('Not an admin', 3000);
          $state.go('login');
        }
      },
      onError: function(err){
        console.log(err);
        // Sets an error message for 3 seconds
        sc.setErr(err.statusText, 3000);
      }
    })
  }

  // Requests the JWT for current adminUser
  sc.requestJwt = function(user){
    authService.requestJwt(user, {
      onSuccess: function(result){
        // Store JWT in localstorage
        $localStorage.jwt = result.data.jwt;
        $state.go('admin.dashboard');
      },
      onError: function(err){
        console.log(err);
        //delete $localstorage.user;
        $state.go('home');
      }
    });
  }

  // Shows an error for e certain amount of time
  sc.setErr = function(err, timeout){
    sc.err = err;
    $timeout(function(){
      sc.err = null;
    }, timeout);
  }

}]);
