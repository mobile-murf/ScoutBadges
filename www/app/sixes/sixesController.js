(function () {
    "use strict";
    
    angular
        .module("starter.controllers")
        .controller("sixesController",
            sixesController
        );

    function sixesController($ionicModal, entityService, photoService) {
        var vm = this;

        // set up the new cub dialog
        vm.newentity = {}; // variable to hold the new cub in.

        // make the call to populate the cubs list    
        entityService.getEntities('six').then(function (result) {
            vm.sixes = result;
        });

        //// create the modal bits for new cub dialog
        //$ionicModal.fromTemplateUrl('/app/sixes/six-new.html', {
        //    scope: vm,
        //    animation: 'slide-in-up'
        //}).then(function (modal) {
        //    vm.newentitydialog = modal;
        //});

        ////Cleanup the modal when we're done with it!
        //vm.$on('$destroy', function () {
        //    vm.newentitydialog.remove();
        //});

        //// new cub button click handler
        //vm.AddNewEntity = function () {
        //    vm.newentitydialog.show();
        //}

        //// save cub handler for dialog
        //vm.NewEntitySave = function () {
        //    var newentity = vm.newentity;

        //    entityService.addEntity('six', newentity).then(function (newentity) {
        //        entityService.save();
        //        vm.newentity = {}; // reset the dialog for another cub
        //        vm.newentitydialog.hide();
        //    }).then(function () {
        //        entityService.getEntities('six').then(function (result) {
        //            vm.sixes = result;
        //        });
        //    });
        //}

        //// cancel new cub handler for dialog
        //vm.NewEntityCancel = function () {
        //    vm.newentity = {}; // reset the dialog for another cub
        //    vm.newentitydialog.hide();
        //}

    }

}());