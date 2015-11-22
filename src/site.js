(function() {
    'use strict';

    angular.module('ngpApp', [])
        .controller('formController', formController);

    formController.$inject = ['$http'];
    function formController($http) {
        var vm = this;

        function getFormId(url) {


        }
        
        vm.activeTab = 'html';

        vm.submitForm = function(url) {
            var formId = url.match(/-?[0-9]{10,}/g);

            vm.formId = formId[0];


            $http({
                url: 'http://localhost:3000/api',
                method: 'GET',
                params: {
                    formId: formId
                }
            }).then(function(response) {
                console.log(response.data);
                vm.formFields = response.data;
            });
        }


    }

}());