var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    placeName: { type: String, required: true },
    placeDescription: { type: String, required: true },
    placeVotes: { type: String, required: true, default: 0 }
});

module.exports = mongoose.model('Place', PlaceSchema, 'Place');