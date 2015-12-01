describe("ngpApp", function() {
  beforeEach(module("ngpApp"));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('formController', { $scope: scope });
  }));

  describe("formController", function() {
    it('should fetch form details', function() {
        scope.name = "Frederik";

        console.log(ctrl);
        console.log(ctrl.activeTab);

        scope.$digest();
        expect(ctrl.activeTab).toBe("html");
    });
  });
});