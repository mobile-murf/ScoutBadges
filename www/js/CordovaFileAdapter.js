function CordovaFileAdapter(ionicPlatform, cordovaFile) {
    this.ionicPlatform = ionicPlatform;
    this.cordovaFile = cordovaFile;
}

CordovaFileAdapter.prototype.deleteDatabase = function (name, callback) {
    console.log('start of delete database')
    this.ionicPlatform.ready(function () {
        if (cordova == null || cordova.file == null) {
            // we do not seem to be running on a device, or it has not loaded, so lets try to save to persistant storage
            localStorage.removeItem(name);
            callback();
        }
        else {
            this.cordovaFile.removeFile(cordova.file.dataDirectory, name).then(function (result) {
                // Success!
                callback();
            }, function (err) {
                // An error occured. Show a message to the user
                console.log('Error Deleting Database: ' + err);
                callback();
            })
        }
    });
}

CordovaFileAdapter.prototype.saveDatabase = function (name, data, callback) {
    // insert code to save the DB to the cordova file system
    console.log('start of save database')
    this.ionicPlatform.ready(function () {
        if (cordova == null || cordova.file == null) {
            // we do not seem to be running on a device, or it has not loaded, so lets try to save to persistant storage
            localStorage.setItem(name, data);
        }
        else {
            this.cordovaFile.writeFile(cordova.file.dataDirectory, name, data, { 'append': false }).then(function (result) {
                // Success!
                console.log('Save Database Complete');
                callback(result);
            }, function (err) {
                // An error occured. Show a message to the user
                console.log('Error Saving Database: ' + err);
                callback(err);
            })
        }
    });
};

CordovaFileAdapter.prototype.loadDatabase = function (name, callback) {
    // insert code to load 
    console.log('start of load database');


    this.ionicPlatform.ready(function () {
        if (cordova == null || cordova.file == null) {
            // we do not seem to be running on a device, or it has not loaded, so lets try to save to persistant storage
            console.log('loading data from local storage...')

            var data = localStorage.getItem(name);

            console.log('>>>' + data)

            callback(data);
        }
        else {
            this.cordovaFile.readAsText(cordova.file.dataDirectory, name).then(function (result) {
                // Success!
                console.log('have loaded from cordova file system OK');
                callback(result);
            }, function (err) {
                // An error occured. Show a message to the user
                console.log('Error Loading Database: ' + err);
                callback({ result: false });
            })
        }
    })
}