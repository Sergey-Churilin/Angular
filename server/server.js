//Set up mongoose connection
var mongoose = require('mongoose');
// var mongoDB = 'mongodb://wunderlist:wunderlist@ds029735.mlab.com:29735/wunderlist';
var mongoDB = 'mongodb://wunderlistapp:wunderlistapp@ds119380.mlab.com:19380/wunderlistapp';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var userModel = require('./database.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../')));


app.post('/addtodo', function (req, res) {
    var data = req.body;

    userModel.findOne({userLogin: data.user.login}, function (err, user) {
        if (err) {
            console.log('no id')
        }
        if (user) {
            user.userTodos.push(data.todo)
            user.save(function (err, newUser) {
                if (err) {
                    console.log('error saving');
                } else {
                    console.log('success saving');
                    res.send('User successfully created')
                }
            });
        } else {
            console.log('error to create new todo')
        }
    });
});

app.post('/adduser', function (req, res) {
    var data = req.body;
    userModel.findOne({userLogin: data.login}, function (err, user) {
        if (err) {
            console.log('no id')
        }
        if (user) {
            res.status(403).send('User with this login already exist');
        } else {
            var newUser = new userModel({'userLogin': data.login, 'userPassword': data.pass});
            newUser.save(function (err, newUser) {
                if (err) {
                    console.log('error saving');
                } else {
                    console.log('success saving');
                    res.send('User successfully created')
                }
            });
        }
    });
});

app.post('/loginuser', function (req, res) {
    var data = req.body;
    userModel.findOne({userLogin: data.login}, function (err, user) {
        if (err) {
            console.log('no id')
        }
        if (user) {
            if (data.pass === user.userPassword) {
                res.send(user.userTodos)
            } else {
                res.status(403).send('Incorrect password');
            }

        } else {
            res.status(403).send('User with this login does not exist');
        }
    });
});

app.post('/updatetodo', function (req, res) {
    var data = req.body;
    userModel.findOne({userLogin: data.user.login}, function (err, user) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
            console.log('no user')
        } else {
            if(user){
                const currentTodo = data.todo;
                const todoToUpdate = user.userTodos.find( (todo) => {return todo.id === currentTodo.id})
                if(todoToUpdate){
                    todoToUpdate.title = currentTodo.title || todoToUpdate.title;
                    todoToUpdate.description = currentTodo.description || todoToUpdate.description;
                    todoToUpdate.isUrgent = currentTodo.isUrgent;
                    todoToUpdate.status = currentTodo.status || todoToUpdate.status;
                    todoToUpdate.statusId = currentTodo.statusId;
                    todoToUpdate.deadline = currentTodo.deadline;

                    // Save the updated document back to the database
                    // console.log('todoToUpdate.statusId = '+todoToUpdate.statusId);
                    user.markModified('userTodos');
                    user.save(function (err, user) {
                        if (err) {
                            console.log('save error');
                            res.status(500).send(err)
                        }
                        console.log("updated successfully")
                        res.send(todoToUpdate);
                    });
                }
            }
        }
    });
});

app.post('/getdata', function (req, res) {
    var data = req.body;
    userModel.findOne({userLogin: data.login}, function (err, user) {
        if (err) {
            console.log('no id')
        }
        if (user) {
            // console.log('user = ' + user);
            res.send(user.userTodos);
        } else {
            res.status(403).send('User with this login does not exist');
        }
    });
});

app.post('/deletedata', function (req, res) {
    var data = req.body;
    userModel.findOne({userLogin: data.user.login}, function (err, user) {
        if (err) {
            console.log('no id')
        }
        if (user) {

            const currentTodo = data.todo;
            const todoToDelete = user.userTodos.find( (todo) => {
               return todo.id === currentTodo.id
            });
            const indexOfTodo = user.userTodos.indexOf(todoToDelete);
            if(indexOfTodo >=0){
                user.userTodos.splice(indexOfTodo,1);
                user.save(function (err, user) {
                    if (err) {
                        console.log('save error');
                        res.status(500).send(err)
                    }
                    console.log("deleted successfully")
                    res.send("deleted successfully");
                });
            }


        } else {
            console.log("can not deletedata");
            res.status(403).send('User with this login does not exist');
        }
    });
});

app.listen(8080);