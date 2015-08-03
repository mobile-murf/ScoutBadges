(function () {
    "use strict";
    
    angular
        .module("starter.controllers")
        .controller("cubsController",
            cubsController
        );

    function cubsController($scope, $ionicModal, entityService, photoService, modalService) {
        var vm = this;
        

        // new cub button click handler
        vm.AddNewCub = function () {
            modalService
                .init('app/cubs/cub-new.html', $scope)
                .then(function (modal) {
                    modal.show();
                })
        }

        // refresh cubs handler
        vm.Refresh = function () {
            // make the call to populate the cubs list    
            entityService.getEntities('cub').then(function (result) {
                vm.cubs = result;
            });

            // load the packs list
            entityService.getEntities('pack').then(function (result) {
                vm.packs = result;
            })

            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.$on('entities-changed', function (event, args) {
            vm.Refresh();
        });

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

        // on init we should refresh the data
        vm.Refresh();
        
    }

}());