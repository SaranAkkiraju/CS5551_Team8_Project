/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

const nodemailer = require ('nodemailer');
const xoauth2 =  require ('xoauth2') ;
// var url = 'mongodb://root:secure@ds161483.mlab.com:61483/asefall17';
var url = 'mongodb://appstest:appstest123@ds137003.mlab.com:37003/apps';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/enroll', function (req, res) {
    MongoClient.connect(url, function(err, client) {
        if(err)
        {
            res.write("Failed, Error while cosnnecting to Database");
            res.end();
        }
        var db= client.db();
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});
app.get('/getData', function (req, res) {
    var searchKeywords = req.query.keywords;
    console.log("Param are "+searchKeywords);
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while cosnnecting to Database");
            res.end();
        }
        if (err) throw err;
        var dbo = db.db("apps");
        var query = { username: searchKeywords };
        dbo.collection("aseproj").find(query).toArray(function(err, result) {
            if (err) throw err;
            // console.log(result[0].major);
            db.close();
            res.json(result);
        });
    });
});
var insertDocument = function(db, data, callback) {
    db.collection('aseproj').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the asedemo collection.");
        callback();
    });
};


var server = app.listen(8081,function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

app.get('/getDataEmail', function (req, res) {

    console.log('helllooooooooooooooo' );
    var searchKeywords = req.query.searchkey;
    var searchKeywords1 = req.query.searchkey1;
    var searchKeywords2 = req.query.searchkey2;

    console.log("Param are "+searchKeywords);
    console.log("Param mes are "+searchKeywords1);
    console.log("Param mes are "+searchKeywords2);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 's.pallavidesai@gmail.com',
            clientId: '319573095737-2c98cnr7fhjnurbi5es3h907klpd0hpb.apps.googleusercontent.com',
            clientSecret: 'KZ1frHthVQ76hInQK9tjU3Gw',
            refreshToken: '1/ygt_aw7FxteuAfblxMSFrm0wPDRYZT-DNqnnfJLCLwM',
            accessToken: 'ya29.GltFBjWUTyAiDH7USeXj3duqUCq_Opy9N0l2onl-JTmj-Mi1_dN79sb5TVaPSiEjHASA80xoqtJd4DJ79o4JZqPsyW6HiVPmW_DIdVO9ISQlqVqMWPGkfbVR3dZf',
        },
    });
    var mailoption = {
        from : searchKeywords,
        to : 'Pallavi <s.pallavidesai@gmail.com>',
        subject : searchKeywords2,
        text : searchKeywords1
    }
    transporter.sendMail(mailoption, function (err , res) {
        if(err)
        {
            console.log('error' );
        }
        else
        {
            console.log('mail sent' );
        }
    })
});