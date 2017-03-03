//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://wunderlist:wunderlist@ds029735.mlab.com:29735/wunderlist';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var wunderlistModel = require('./database.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../')));


app.post('/addtodo', function (req, res) {
    var data = req.body;
    var newToto = new wunderlistModel(data);
    newToto.save(function (err, newToto) {
        if (err){
            console.log('error saving');
        } else {
            console.log('success saving');
            res.send('Hello World')
        }
    });
});

app.post('/updatetodo', function (req, res) {
    var data = req.body;
    wunderlistModel.findOne({id: data.id}, function (err, todo) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
            console.log('no id')
        } else {
            todo.title = data.title || todo.title;
            todo.description = data.description || todo.description;
            todo.isUrgent = data.isUrgent;
            todo.status = data.status || todo.status;
            todo.statusId = data.statusId;

            // Save the updated document back to the database
            todo.save(function (err, todo) {
                if (err) {
                    console.log('save error');
                    res.status(500).send(err)
                }
                res.send(todo);
            });
        }
    });
});

app.get('/getdata', function (req, res) {
    wunderlistModel.find({}, function(err, todos) {
        res.send(todos);
    });
});

app.delete('/deletedata/:id', function (req, res) {
    wunderlistModel.find({id: req.params.id}).remove(function(err,todo) {
        if (err) {
            console.log("Error while deleting " + err.message);
            res.send(item);
        } else {
            res.send(todo);
        }
    });
});

app.listen(3000);