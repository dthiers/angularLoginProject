app.factory('testService', function testService() {

  var testService = [
    {name: "Jeff"},
    {name: "Dion"}
  ];

  return {
    getTest: function(){
      return testService;
    }
  }

})
