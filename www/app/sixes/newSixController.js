(function () {
    "use strict";

    angular
        .module("starter.controllers")
        .controller("newSixController",
            newSixController
        );

    function newSixController($scope, $rootScope, entityService) {
        var vm = this;

        vm.newentity = {}

        // save cub handler for dialog
        vm.Save = function () {
            entityService
                .addEntity('six', vm.newentity)
                .then(function (addedentity) {
                    entityService.save();
                })
                .then(function () {
                    $rootScope.$broadcast('entities-changed');
                    $scope.closeModal();
                });

        }

        // cancel new cub handler for dialog
        vm.Cancel = function () {
            $scope.closeModal();
        }

    }

}());