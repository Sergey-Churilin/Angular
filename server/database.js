var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*var WunderlistSchema = new Schema(
    {
        title: {type: String},
        description: {type: String},
        status: { type: String },
        statusId: { type: Number },
        isUrgent: { type: Boolean },
        id: { type: Number }
    }
);*/

var UserSchema = new Schema(
    {
        userLogin: {type: String,dropDups: true},
        userPassword: {type: String},
        userTodos : {type:Array}
    }
);

// var WunderlistModel = mongoose.model('Wunderlist', WunderlistSchema);
var UserModel = mongoose.model('Wunderlist', UserSchema);

// module.exports = WunderlistModel;
module.exports = UserModel;