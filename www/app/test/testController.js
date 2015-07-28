(function () {
    "use strict";

    angular
        .module("starter.controllers")
        .controller("testController",
            testController
        );

    function testController(entityService, photoService) {
        var vm = this;

        //module variables
        
        //vm functions
        vm.deleteDB = function () {
            entityService.deleteDB();
        }
    }


}());