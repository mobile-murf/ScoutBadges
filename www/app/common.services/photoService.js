(function () {
    "use strict";

    angular
        .module("starter.services")
        .service("photoService",
            photoService
        );

    function photoService($cordovaCamera, $q) {

        this.FormatPhotoSrc = function (data) {
            if (typeof (data) == 'undefined' || data == null || data.length < 1)
                return 'img/no_photo.png';

            return 'data:image/jpg;base64,' + data;
        }

        this.canTakePhoto = function () {
            return typeof (navigator.camera) != 'undefined';
        }

        this.takePhoto = function () {
            var result = $q.defer();

            if (this.canTakePhoto()) {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };


                $cordovaCamera.getPicture(options).then(function (imageData) {
                    console.log('got picture data: ' + imageData)
                    result.resolve(imageData);
                }, function (err) {
                    // An error occured. Show a message to the user
                    console.log('error taking picture: ' + err);
                    result.reject(err);
                });

                return result.promise;

            } else {
                alert('You cannot take a photograph because the camera cannot be found, or the camera plugin cannot find it on your device.');
            }
        }

    }
}());