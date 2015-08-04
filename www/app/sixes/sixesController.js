(function () {
    "use strict";
    
    angular
        .module("starter.controllers")
        .controller("sixesController",
            sixesController
        );

    function sixesController($scope, $ionicModal, entityService, modalService) {
        var vm = this;

        // new cub button click handler
        vm.AddNew = function () {
            modalService
                .init('app/sixes/six-new.html', $scope)
                .then(function (modal) {
                    modal.show();
                })
        }

        // refresh cubs handler
        vm.Refresh = function () {
            // make the call to populate the cubs list    
            entityService.getEntities('six').then(function (result) {
                vm.entities = result;
            });

            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.$on('entities-changed', function (event, args) {
            vm.Refresh();
        });

        vm.Refresh();
    }

}());