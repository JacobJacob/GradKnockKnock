var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/test';





router.post('/contact', function (req, res, next) {

    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        findDocuments( 
                        db,
                        "gradkkemail",
                        {email: "1@1.com"},
                        findDocCb
                    );
    });

    res.set('Content-Type', 'application/json');

    res.send({"command": "subscribe", result: "ding yue cheng gong!"});
});



var findDocuments = function(db, collect, doc, cb) {
    var collection = db.collection(collect);
    collection.find(doc).toArray(function(err, docs) {
        assert.equal(err, null);
        cb(db, docs);
    });
}

var findDocCb = function(db, docs) {
    if (docs.length > 0) {
        // console.dir(docs);
    }
    db.close();
}




module.exports = router;
