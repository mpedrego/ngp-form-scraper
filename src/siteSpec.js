describe("ngpApp", function() {
  beforeEach(module("ngpApp"));

  describe("formController", function() {
    it('should load controller',
    inject(function($location, $rootScope, $httpBackend, $route) {
      $httpBackend.expectGET('http://localhost:3000/api').respond({});

      $rootScope.$digest();
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingRequest();

    }));
  });
});