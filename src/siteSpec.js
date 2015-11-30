describe("ngpApp", function() {
  beforeEach(module("ngpApp"));

  describe("/ route", function() {
    it('should load the template',
    inject(function($location, $rootScope, $httpBackend, $route, candidatesService) {
      $httpBackend.expectGET('http://stuartdotson.com/sunlightapi/candidates_json.php').respond({});

      /*$rootScope.$apply(function() {
          $location.path('/');
      });*/
      expect($route.current.controller).toBe("formController");

    }));
  });
});