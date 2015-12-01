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
            }).then(function(response) {
                vm.formFields = response.data;
            });
        }

        vm.reset = function() {
            vm.formFields = false;
        }


    }

}());