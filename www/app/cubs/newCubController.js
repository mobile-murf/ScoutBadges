(function () {
    "use strict";
    
    angular
        .module("starter.controllers")
        .controller("newCubController",
            newCubController
        );

    function newCubController($scope, close) {
        var newcub = {}

        // save cub handler for dialog
        this.NewCubSave = function () {
            //entityService.addEntity('cub', newcub).then(function (newentity) {
            //    entityService.save();
            //}).then(function () {
            //    newcub = {}; // reset the dialog for another cub
                close('success');
            //});
        }

        // cancel new cub handler for dialog
        this.NewCubCancel = function () {
            newcub = {}; // reset the dialog for another cub
            close('cancel');
        }

    }

}());