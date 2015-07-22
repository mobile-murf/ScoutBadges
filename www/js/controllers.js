angular.module('starter.controllers', ['ionic','starter.services'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
  
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
  
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('TestCtrl', function ($scope, entityService, photoService) {

    $scope.test = function () {
        alert('canTakePhoto: ' + photoService.canTakePhoto().toString());
    }
})

.controller('CubsCtrl', function ($scope, entityService, photoService) {

    // get the cub from the entity service?
    $scope.cubs = entityService.getEntities('cub');
    //$scope.$apply;
    
    $scope.GetPhotoSrc = function (data) {
        return photoService.FormatPhotoSrc(data);
    }

    $scope.DisplayAge = function (dateOfBirth) {
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


})

.controller('CubCtrl', function ($scope, $stateParams, entityService, photoService) {
    var whichcub = $stateParams.cubid;

    // load the cub from the entity service?
    $scope.cub = entityService.getEntity(whichcub);
    //$scope.$apply;
    
    $scope.sixes = entityService.getEntities('six')
    //$scope.apply;

    $scope.save = function () {
        //var cubToSave = $scope.cub;
        //entityService.addUpdateEntity(cubToSave);
        entityService.save();
    }

    $scope.takePhoto = function () {
        photoService.takePhoto().then(function (photo) {
            if (photo)
                $scope.cub.img = photo;
        })
    }

    $scope.GetPhotoSrc = function (data) {
        return photoService.FormatPhotoSrc(data);
    }

    
});


