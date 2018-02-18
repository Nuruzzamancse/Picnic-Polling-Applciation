var Place = require('../model/place');

var createPlace = (req, res, next) => {

    var placeName = req.body.placeName,
        placeDescription = req.body.placeDescription,
        placeVotes = 0;

    if (!placeName || !placeDescription) {
        return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    } else {
        Place.findOne({placeName: placeName}, (err, place) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            if (place) return res.status(201).json({ success: false, message: 'Place already exists.', data: place });
            var newPlace = new Place({ placeName: placeName, placeDescription: placeDescription, placeVotes: placeVotes });
            newPlace.save((err, place) => {
                if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
                return res.status(201).json({ success: true, data: place });
            });
        });
    }
};

var getAllPlaces = (req, res, next) => {
  Place.find((err, places) => {
      if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
      return res.status(201).json({ success: true, data: places });
  })
};

var getPlace = (req, res, next) => {
    var placeId = req.params.id;
    if (!placeId) {
        return res.status(201).json({success: false, message: 'Incomplete or invalid information or parameter.'});
    } else {
        Place.findById(placeId, (err, place) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            if (!place) return res.status(400).json({ success: false, message: 'No place found.' });
            return res.status(201).json({ success: true, data: place });
        });
    }
};

var updatePlace = (req, res, next) => {
    var placeName = req.body.placeName,
        placeDescription = req.body.placeDescription
        placeId = req.params.id;

    if (!placeName || !placeDescription || !placeId) {
        return res.status(201).json({success: false, message: 'Incomplete or invalid information.'});
    } else {
        Place.findById(placeId, (err, place) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });

            place.placeName = placeName || place.placeName;
            place.placeDescription = placeDescription || place.placeDescription;
            place.placeVotes = req.body.placeVotes || place.placeVotes;

            place.save((err, place) => {
                if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
                return res.status(201).json({ success: true, data: place });
            });
        });
    }
};

var deletePlace = (req, res, next) => {
    var placeId = req.params.id;
    if (!placeId) {
        return res.status(201).json({success: false, message: 'Incomplete or invalid information or parameter.'});
    } else {
        Place.findByIdAndRemove(placeId, (err, place) => {
            if (err) return res.status(400).json({ success: false, message: 'Fatal server error: ' + err });
            return res.status(201).json({ success: true, message: 'Removed the place.' });
        });
    }
};

module.exports = {
  createPlace,
  getAllPlaces,
  getPlace,
  updatePlace,
  deletePlace
};