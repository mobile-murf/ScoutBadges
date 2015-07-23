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

.service("entityService", function (Loki, $cordovaFile, $ionicPlatform, $q) {
    var db, hasLoaded, entities, relationships
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

    function saveDB() {
        db.save();
    }

    function initDB() {
        // create the db for the first time
        if (!db) {
            db = new Loki('database.json', {
                autoload: true,
                autoloadCallback: loadHandler,
                adapter: new CordovaFileAdapter()
            });
        }

        entities = db.addCollection('entities', { indices: ['_id', '_type'] });
        relationships = db.addCollection('relationships', { indices: ['_id', '_type'] });

        var six1 = entities.insert({ _id: newid(), _type: 'six', name: 'Red', color: 'Red' });
        var cub1 = entities.insert({ _id: newid(), _type: 'cub', img: null, firstname: 'Grace', lastname: 'Stewart', dob: Date.parse('2005-01-01'), dateinvested: Date.parse('2012-04-23') })
        var cub2 = entities.insert({ _id: newid(), _type: 'cub', img: null, firstname: 'Tyler', lastname: 'Murphy', dob: Date.parse('2006-12-17'), dateinvested: Date.parse('2012-04-23') })

        relationships.add({ _id: newid(), _type: 'cubsix', fromid: six1._id, toid: cub1._id });

        db.save();

    }

    function loadHandler() {
        if (db && db.collections && db.collections.length > 0) {
            entities = db.getCollection('entities');
            relationships = db.getCollection('relationships');
            hasLoaded = true;
        }
        else
        {
            initDB();
        }
    }

    function loadDB() {
        // dont try to load if already loaded/
        if (hasLoaded)
            return;

        console.log('loadDB starting');

        // try to load the DB from the filesystem
        db = new Loki('database.json', {
            autoload: true,
            autoloadCallback: loadHandler,
            adapter: new CordovaFileAdapter($ionicPlatform, $cordovaFile)
        });

    }

    function hasDBLoadedYet() {
        return hasLoaded;
    }

    function waitForInit() {
        var deferred = $q.defer();

        if (hasLoaded)
        {
            deferred.resolve();
            return deferred.promise;
        }
            

        loadDB();

        waitfor(hasDBLoadedYet, true, 50, 0, '', function () {
            console.log('database is ready');
            deferred.resolve();
        });

        return deferred.promise;
    }

    this.getEntity = function (whichid) {
        var deferred = $q.defer();

        waitForInit().then(function () {
            deferred.resolve(entities.findOne({ '_id': whichid }));
        });

        return deferred.promise;
    }

    this.getEntities = function (whichtype) {
        var deferred = $q.defer();

        waitForInit().then(function () {
            deferred.resolve(entities.find({ '_type': whichtype }));
        });

        return deferred.promise;
    }

    this.addEntity = function (entitytype, theentity) {
        var deferred = $q.defer();

        waitForInit().then(function () {
            if (!entitytype)
                entitytype = typeof (theentity);

            if (!theentity.hasOwnProperty('_id') || theentity._id === null)
                theentity._id = newid();

            if (!theentity.hasOwnProperty('_type') || theentity._type === null)
                theentity._type = entitytype;

            entities.insert(theentity)

            deferred.resolve(theentity);
        });

        return deferred.promise;
    }

    this.save = function () {
        if (hasLoaded)
            saveDB();
    }
});