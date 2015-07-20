angular.module('starter.services', [])

.service("photoService", function () {

    this.FormatPhotoSrc = function(data)
    {
        if (typeof (data) == 'undefined' || data == null || data.length < 1)
            return 'img/no_photo.png';

        return 'data:image/jpg;base64,' + data;
    }
})

.service("entityService", function ($q) {
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

    var entities = [
      { name: 'Grace Stewart', _id: 1, type: 'cub', img: null, firstname: 'Grace', lastname: 'Stewart', dob: '2012-04-23', dateinvested: '2012-04-23' },
      { name: 'Jacob Grinter', _id: 2, type: 'cub', firstname: 'Jacob', lastname: 'Grinter' },
      { name: 'Tyler Murphy', _id: 3, type: 'cub', firstname: 'Tyler', lastname: 'Murphy' },
      { name: 'Steve Murphy', _id: 4, type: 'leader', firstname: 'Steve', lastname: 'Murphy' }
    ];

    function initNewDatabase(db) {
        /*db.put({ "_id": '1', "name": 'Grace Stewart', "type": 'cub' }, function (err, result) {
            if (!err) {
                alert('insert ok -> id:' + result.id);
            }
            else
                alert(err);
            }
            );
       */
        //db.put({ "_id": '2', "name": 'Jacob Grinter', "type": 'cub' }),
        //db.put({ "_id": '3', "name": 'Tyler Murphy', "type": 'cub' }),
        //db.put({ "_id": "4", "name": 'Steve Murphy', "type": 'leader' })
        //);
    }


    this.getAllEntities = function (allEntries) {

        var result = $q.defer();

        result.resolve(entities);

        return result.promise;

        /*
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
        */
    }

    this.getEntity = function (whichid) {
        var result = $q.defer();

        var temp = entities.filter(function (obj) {
            return obj._id == whichid;
        });

        if (temp.length > 0)
            result.resolve(temp[0]);
        else
            result.resolve(null);

        return result.promise;
        /*
                
        
                db.get(whichid).then(function (results) {
                    result.resolve(results);
                });
        
                return result.promise;
                */
    }

    this.getEntities = function (whichtype) {

        var prom = $q.defer();

        var result = entities.filter(function (obj) {
            return obj.type == whichtype;
        });

        if (result.length > 0)
            prom.resolve(result);
        else
            prom.resolve(null);

        return prom.promise;

        /*
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
        
          */

    }

    this.saveEntity = function (entity) {
        if (entity._id === undefined) {
            // its a new entity to save
            var newid = entities.length;
            entity._id = newid;
            entities.push(entity);
        }
        else {
            // its an existing entity to update
            // dont think we need to do anything here, 
            // as its all passed by reference, should be
            // editing the entity in the array in place. 
        }
    }


});