(function() {
    'use strict';

    angular.module('ngpApp', [])
        .controller('formController', formController);

    formController.$inject = ['$http'];
    function formController($http) {
        var vm = this;

        vm.activeTab = 'html';

        vm.submitForm = function(formId) {
            $http({
                url: 'http://localhost:3000/api',
                method: 'GET',
                params: {
                    formId: formId
                }
            }).then(successCallback, errorCallback);
        }

        function successCallback(response) {
            vm.submitted = true;
            vm.formFields = response.data;
        }

        function errorCallback(response) {
            vm.submitted = true;
            vm.formNotFound = true;
        }

        vm.reset = function() {
            vm.formNotFound = false;
            vm.submitted = false;
            vm.formId = '';
            vm.mainForm.$setPristine();
        }


    }

}());