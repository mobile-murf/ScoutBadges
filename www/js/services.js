angular.module('starter.services', ['lokijs', 'ngCordova', 'ionic'])

.service("photoService", function ($cordovaCamera, $q) {

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


})

.service("entityService", function (Loki, $cordovaFile, $ionicPlatform) {
    var db, hasLoaded
    hasLoaded = false;

    function newid() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    function initDB() {
        // create the db for the first time
        
        db = {};
        db.entities = [];
        db.entities.push({ _id: newid(), _type: 'six', name: 'Red', color: 'Red' });
        db.entities.push({ _id: newid(), _type: 'cub', img: null, firstname: 'Grace', lastname: 'Stewart', dob: '2012-04-23', dateinvested: '2012-04-23' })

    }

    function loadDB() {
        // try to load the DB from the filesystem
        var data = localStorage.getItem("Database");

        if (!data)
            return;

        db = JSON.parse(data)

        if (db)
            hasLoaded = true;
    }

    function saveDB() {
        localStorage.setItem("Database", JSON.stringify(db));
    }

    function ensureInit() {
        if (hasLoaded)
            return;

        loadDB();

        if (!hasLoaded) {
            initDB();
            hasLoaded = true;
        }
    }

    this.getAllEntities = function (allEntries) {
        ensureInit();
        return db.entities;
    }

    this.getEntity = function (whichid) {
        ensureInit();

        var temp = db.entities.filter(function (obj) {
            return obj._id == whichid;
        });

        return temp[0];
    }

    this.getEntities = function (whichtype) {
        ensureInit();

        var temp = db.entities.filter(function (obj) {
            return obj._type == whichtype;
        });

        return temp;
    }

    this.addEntity = function (entitytype, theentity) {
        ensureInit();

        if (!entitytype)
            entitytype = typeof (theentity);

        if (!theentity.hasOwnProperty('_id') || theentity._id === null)
            theentity._id = newid();

        if (!theentity.hasOwnProperty('_type') || theentity._type === null)
            theentity._type = entitytype;

        db.entities.push(theentity);

        return theentity;
    }

    this.save = function () {
        if (hasLoaded)
            saveDB();
    }
});