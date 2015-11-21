(function() {
    'use strict';

    angular.module('ngpApp', [])
        .controller('formController', formController);

    formController.$inject = ['$http'];
    function formController($http) {
        var vm = this;

        function getFormId(url) {


        }

        vm.submitForm = function(url) {
            var formId = url.match(/-?[0-9]{10,}/g);

            $http({
                url: 'http://localhost:3000/api',
                method: 'GET',
                params: {
                    formId: formId
                }
            }).then(function(response) {
                console.log(response.data);
                vm.response = response.data;
            });
        }


    }

}());