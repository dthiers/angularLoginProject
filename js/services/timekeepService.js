app.factory('timekeepService', ['$http', function($http) {

  var timekeepService = {};

  return {
    getAllTimekeepRecords: function(options){
      return "timekeeprecords";
    }
  }
}])
