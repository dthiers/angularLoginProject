app.controller('timekeepRecordCtrl', [
  '$scope',
  'timekeepService',
  function(sc, timekeepService) {



  // TODO: timekeeprecords ophalen
  sc.getAllTimekeepRecords = function(){
    sc.records = timekeepService.getAllTimekeepRecords();
  }
  sc.getAllTimekeepRecords();

}])
