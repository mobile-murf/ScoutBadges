(function () {
    "use strict";

    angular
        .module("starter.controllers")
        .controller("sixController",
            sixController
        );

    function sixController($state, $scope, $stateParams, entityService, photoService) {
        var vm = this;

        //module variables
        var id = $stateParams.sixid;

        //vm functions
        vm.save = function () {
            entityService.save();
            $state.go('app.sixes');
        }

        // initalization routines

        // load the packs list
        entityService.getEntities('pack').then(function (result) {
            vm.packs = result;
        })
        entityService.getEntities('six').then(function (result) {
            vm.sixes = result;
        });

        // load the cub from the entity service
        entityService.getEntity(id).then(function (result) {
            vm.entity = result;
        });

        
    }


}());