describe("ngpApp", function() {
  beforeEach(module("ngpApp"));

  beforeEach(inject(function($controller, $rootScope, $q, $httpBackend) {
    scope = $rootScope.$new();
    ctrl = $controller('formController', { $scope: scope });
    deferred = $q.defer();
    $httpBackend = $httpBackend;
  }));

  describe("formController", function() {
    it('should set initial tab as html', function() {

        scope.$digest();
        expect(ctrl.activeTab).toBe("html");


    });

    it('should query the backend when the username is checked',
    inject(function($rootScope, $httpBackend) {
        $httpBackend.expect('GET', 'http://localhost:3000/api?formId=7944614294361016320').respond({});
        var status = false;

        ctrl.submitForm("7944614294361016320");

        $rootScope.$digest();
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    }));

  });
});