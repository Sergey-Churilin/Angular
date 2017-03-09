const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        userLogin: {type: String,dropDups: true},
        userPassword: {type: String},
        userTodos : {type:Array}
    }
);

const UserModel = mongoose.model('Wunderlist', UserSchema);

module.exports = UserModel;