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

    $scope.DeleteDB = function () {
        // hard core, we want to delete the database!
        entityService.deleteDB(function () {
            alert('Database has been deleted from this device.');
        });
    }
})

.controller('CubsCtrl', function ($scope, $ionicModal, entityService, photoService) {
    // set up the new cub dialog
    $scope.newcub = {}; // variable to hold the new cub in.

    // make the call to populate the cubs list    
    entityService.getEntities('cub').then(function (result) {
        $scope.cubs = result;
    });
    

    // create the modal bits for new cub dialog
    $ionicModal.fromTemplateUrl('templates/cub-new.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.newcubdialog = modal;
    });

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.newcubdialog.remove();
    });
    
    // new cub button click handler
    $scope.AddNewCub = function () {
        $scope.newcubdialog.show();
    }

    // save cub handler for dialog
    $scope.NewCubSave = function () {
        var newcub = $scope.newcub;

        entityService.addEntity('cub', newcub).then(function (newentity) {
            entityService.save();
            $scope.newcub = {}; // reset the dialog for another cub
            $scope.newcubdialog.hide();
        }).then(function () {
            entityService.getEntities('cub').then(function (result) {
                $scope.cubs = result;
            });
        });
    }

    // cancel new cub handler for dialog
    $scope.NewCubCancel = function () {
        $scope.newcub = {}; // reset the dialog for another cub
        $scope.newcubdialog.hide();
    }

    // helper function to display cub photos
    $scope.GetPhotoSrc = function (data) {
        return photoService.FormatPhotoSrc(data);
    }

    // helper function to display cub age based on DOB
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
    entityService.getEntity(whichcub).then(function (result) {
        $scope.cub = result;
    });

    entityService.getEntities('six').then(function (result) {
        $scope.sixes = result;
    });
    
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


