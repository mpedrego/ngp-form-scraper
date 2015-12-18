describe("ngpApp", function() {
  beforeEach(module("ngpApp"));

  beforeEach(inject(function($controller, $rootScope, $q, $httpBackend) {
    scope = $rootScope.$new();
    ctrl = $controller('formController', { $scope: scope });
    deferred = $q.defer();
    $httpBackend = $httpBackend;

    jasmine.getJSONFixtures().fixturesPath = 'base/mocks';

    $httpBackend.whenGET('http://localhost:3000/api?formId=7944614294361016320')
      .respond(
        getJSONFixture('form.json')
      );
  }));


  describe("formController", function() {
    it('should set initial tab as html', function() {
        scope.$digest();
        expect(ctrl.activeTab).toBe("html");
    });

    it('should return form object if form exists',
    inject(function($rootScope, $httpBackend) {
        $httpBackend.expect('GET', 'http://localhost:3000/api?formId=7944614294361016320');

        ctrl.submitForm("7944614294361016320");
        $httpBackend.flush();
        expect(ctrl.formFields.length).toBe(16);
        expect(ctrl.submitted).toBe(true);
        expect(ctrl.formNotFound).toBe(undefined);


        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('should return error if the form does not exist',
    inject(function($rootScope, $httpBackend) {
        $httpBackend.expect('GET', 'http://localhost:3000/api?formId=606060606060606').respond({ error: 'NGP form not found.' });

        ctrl.submitForm("606060606060606");
        $httpBackend.flush();
        expect(ctrl.formFields.error).toBeDefined();
        expect(ctrl.submitted).toBe(true);

        $httpBackend.verifyNoOutstandingRequest();
    }));

  });
});