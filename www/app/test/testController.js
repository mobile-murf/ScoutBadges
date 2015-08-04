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
        vm.customfield = "some data";
        vm.customfield2 = "more data";

        //vm functions
        vm.deleteDB = function () {
            entityService.deleteDB();
        }
    }


}());