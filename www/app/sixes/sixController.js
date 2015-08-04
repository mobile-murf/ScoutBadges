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

        // helper function to display cub photos
        vm.GetPhotoSrc = function (data) {
            return photoService.FormatPhotoSrc(data);
        }

        // helper function to display cub age based on DOB
        vm.DisplayAge = function (dateOfBirth) {
            if (dateOfBirth instanceof Date) {
                var ageDifMs = Date.now() - dateOfBirth.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                var result = (ageDate.getUTCFullYear() - 1970);
                return result.toFixed(1);
            }
            else {
                return '';
            }
        }

        // initalization routines

        // load the cubs list for this six only
        var query = { '$and': [{ '_type': 'cub' }, { 'sixid': id }] };
        
        entityService.queryEntities(query).then(function (result) {
            vm.cubs = result;
        })
        
        // load the entity from the entity service
        entityService.getEntity(id).then(function (result) {
            vm.entity = result;
        });

        
    }


}());