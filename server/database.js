var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WunderlistSchema = new Schema(
    {
        title: {type: String},
        description: {type: String},
        status: { type: String },
        statusId: { type: Number },
        isUrgent: { type: Boolean },
        id: { type: Number }
    }
);

var WunderlistModel = mongoose.model('Wunderlist', WunderlistSchema);

module.exports = WunderlistModel;