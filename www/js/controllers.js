angular.module('starter.controllers', [])

.service("entityService", function ($q)
{
    var db = new PouchDB('cubs'); //, { adapter: 'websql' });

    db.info().then(function (result) {
        if (result.doc_count < 1)
            initNewDatabase(db);

    }).catch(function (err) {
        console.log(err);
    });

    db.changes().on('change', function () {
        console.log('Ch-Ch-Changes');
    });

    //var entities = [
    //  { name: 'Grace Stewart', id: 1, type: 'cub' },
    //  { name: 'Jacob Grinter', id: 2, type: 'cub' },
    //  { name: 'Tyler Murphy', id: 3, type: 'cub' },
    //  { name: 'Steve Murphy', id: 4, type: 'leader' }
    //];


    function initNewDatabase(db)
    {
        db.put({ "_id": '1', "name": 'Grace Stewart', "type": 'cub' }, function (err, result)
        {
            if (!err) {
                alert('insert ok -> id:' + result.id);
            }
            else
                alert(err);
        }
        );
            //db.put({ "_id": '2', "name": 'Jacob Grinter', "type": 'cub' }),
            //db.put({ "_id": '3', "name": 'Tyler Murphy', "type": 'cub' }),
            //db.put({ "_id": "4", "name": 'Steve Murphy', "type": 'leader' })
            //);
    }


    this.getAllEntities = function (allEntries)
    {
        //return entities;

        var result = $q.defer();
        var temp = [];

        db.allDocs({
            include_docs: true,
            attachments: false
        }).then(function (results) {
            results.rows.forEach(function (row) {
                temp.push(row.doc)
            }).then(function () {
                result.resolve(temp)
            })
        });

        return result.promise;
    }

    this.getEntity = function (whichid)
    {
        //var result = entities.filter(function (obj) {
        //    return obj.id == whichid;
        //});

        //if (result.length > 0)
        //    return result[0];
        //else
        //    return null;

        var result = $q.defer();

        db.get(whichid).then(function (results) {
            result.resolve(results);
        });

        return result.promise;
    }

    this.getEntities = function (whichtype) {

        //var result = entities.filter(function (obj) {
        //    return obj.type == whichtype;
        //});

        //if (result.length > 0)
        //    return result;
        //else
        //    return null;

        var result = $q.defer();

        temp = [];
        db.allDocs({
            include_docs: true,
            attachments: false
        }).then(function (results) {
            results.rows.forEach(function (row) {
                if (row.doc.type == whichtype)
                {
                    temp.push(row.doc);
                }
            })
            result.resolve(temp);
        });

        return result.promise;

        

    }


})

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

.controller('CubsCtrl', function ($scope, entityService) {
    // get the cub from the entity service?
    var query = entityService.getEntities('cub');
    query.then(function (result) {
        $scope.cubs = result;
        //$scope.$apply;
    })
    
})

.controller('CubCtrl', function ($scope, $stateParams, entityService) {
    var whichcub = $stateParams.cubid;

    // load the cub from the entity service?
    var query = entityService.getEntity(whichcub);
    query.then(function (result) {
        $scope.cub = result;
        //$scope.$apply;
    })
    
});


