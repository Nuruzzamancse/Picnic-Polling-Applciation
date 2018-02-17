var express = require('express'),
    router = express.Router(),
    place = require('../model/place'),
    placeController = require('../controller/place');

router.post('/', placeController.createPlace);
router.get('/', placeController.getAllPlaces);
router.get('/:id', placeController.getPlace);
router.patch('/:id', placeController.updatePlace);
router.delete('/:id', placeController.deletePlace);

module.exports = router;