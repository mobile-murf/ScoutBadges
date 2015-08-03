(function () {
    "use strict";
    
    angular
        .module("starter.controllers")
        .controller("cubsController",
            cubsController
        );

    function cubsController($scope, $ionicModal, entityService, photoService, ModalService) {
        var vm = this;

        // set up the new cub dialog
        vm.newcub = {}; // variable to hold the new cub in.

        // make the call to populate the cubs list    
        entityService.getEntities('cub').then(function (result) {
            vm.cubs = result;
        });

        // load the packs list
        entityService.getEntities('pack').then(function (result) {
            vm.packs = result;
        })

        //// create the modal bits for new cub dialog
        //$ionicModal.fromTemplateUrl('/app/cubs/cub-new.html', {
        //    scope: $scope,
        //    animation: 'slide-in-up'
        //}).then(function (modal) {
        //    vm.newcubdialog = modal;
        //});

        ////Cleanup the modal when we're done with it!
        //$scope.$on('$destroy', function () {
        //    vm.newcubdialog.remove();
        //});

        // new cub button click handler
        vm.AddNewCub = function () {
            ModalService.showModal({
                templateUrl: "app/cubs/cub-new.html",
                controller: "newCubController",
                controllerAs: "vm"
            }).then(function (modal) {
                modal.close.then(function (result) {
                    alert('closed');
                });
            });
        }

        //// save cub handler for dialog
        //vm.NewCubSave = function () {
        //    var newcub = vm.newcub;

        //    entityService.addEntity('cub', newcub).then(function (newentity) {
        //        entityService.save();
        //        vm.newcub = {}; // reset the dialog for another cub
        //        vm.newcubdialog.hide();
        //    }).then(function () {
        //        entityService.getEntities('cub').then(function (result) {
        //            vm.cubs = result;
        //        });
        //    });
        //}

        //// cancel new cub handler for dialog
        //vm.NewCubCancel = function () {
        //    vm.newcub = {}; // reset the dialog for another cub
        //    vm.newcubdialog.hide();
        //}

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
        
    }

}());