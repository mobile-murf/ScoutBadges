(function () {
    "use strict";

    angular
        .module("starter.controllers")
        .controller("cubController",
            cubController
        );

    function cubController($state, $scope, $stateParams, entityService, photoService) {
        var vm = this;

        //module variables
        var whichcub = $stateParams.cubid;

        //vm functions
        vm.save = function () {
            entityService.save();
            $state.go('app.cubs');
        }

        vm.takePhoto = function () {
            photoService.takePhoto().then(function (photo) {
                if (photo)
                    vm.cub.img = photo;
            })
        }

        vm.GetPhotoSrc = function (data) {
            return photoService.FormatPhotoSrc(data);
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
        entityService.getEntity(whichcub).then(function (result) {
            vm.cub = result;
        });

        
    }


}());