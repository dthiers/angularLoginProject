// The start of our Angular App. Modules can be injected in the array (like ng-route)
var app = angular.module('app', [ 'ui.router', 'ngStorage'])

  // This removes the templateCaching. During development this might get you into trouble
  .run(function($rootScope, $templateCache, $state, $localStorage) {
    // Remove template cache
    // TODO: remove when out of development
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });

    // Check if a user is logged in if the state requires so
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // If the state requires a login
      var requireLogin = toState.data.requireLogin;

      //console.log($localStorage.user);

      // TODO: do this with localstorage
      //if(requireLogin && typeof $rootScope.currentUser === 'undefined') {
      if(requireLogin && ($localStorage.user === undefined || $localStorage.user === null)){
        console.log($localStorage.user);
        event.preventDefault();

        $state.go('login')

      }
    })

    $rootScope.$on('unauthorized', function(){
      $state.go('login');
    })
  })

  .constant('API', {
    user: 'http://localhost:3000/users',
    login: 'http://localhost:3000/login'
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    // This line is neccesary for ui.router to work
    $urlRouterProvider.otherwise('/home');
    // State provider
    $stateProvider
      .state('home' , {
        url: '/home',
        templateUrl: './partials/home.html',
        data: {
          requireLogin: false
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: './partials/login.html',
        controller: 'loginCtrl',
        data: {
          requireLogin: false
        }
      })
      // Abstract rootstate. Set login to true here.
      .state('admin', {
        abstract: true,
        url: '/admin',
        data: {
          requireLogin: true
        },
        template: '<div ui-view></div>',
      })
      .state('admin.dashboard', {
        url: '/dashboard',
        controller: 'dashboardCtrl',
        templateUrl: './partials/dashboard.html'
        // Child state here. Must be logged in to enter.
      })
      .state('admin.users', {
        url: '/users',
        controller: 'userCtrl',
        templateUrl: './partials/users.html'
      })
      .state('admin.addUser', {
        url: '/addUser',
        controller: 'addUserCtrl',
        templateUrl: './partials/add-user.html'
      })
      .state('admin.timekeepRecords', {
        url: '/timekeepRecords',
        controller: 'timekeepRecordCtrl',
        templateUrl: './partials/timekeep-record.html'
      })
      .state('admin.logout', {
        url: '/logout',
        controller: function($localStorage, $state){
          delete $localStorage.user;
          delete $localStorage.jwt;
          $state.go('admin.dashboard');
        }
      })

      $httpProvider.interceptors.push('apiInterceptor');
  })
