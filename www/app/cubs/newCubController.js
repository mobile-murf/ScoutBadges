(function () {
    "use strict";
    
    angular
        .module("starter.controllers")
        .controller("newCubController",
            newCubController
        );

    function newCubController($scope, $rootScope, entityService) {
        var vm = this;

        vm.newcub = {}

        // save cub handler for dialog
        vm.NewCubSave = function () {
            entityService
                .addEntity('cub', vm.newcub)
                .then(function (newentity) {
                    entityService.save();
                })
                .then(function () {
                    $rootScope.$broadcast('entities-changed');
                    $scope.closeModal();
                });
                
        }

        // cancel new cub handler for dialog
        vm.NewCubCancel = function () {
            $scope.closeModal();
        }

    }

}());