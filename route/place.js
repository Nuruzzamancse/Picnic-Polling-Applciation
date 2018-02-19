var express = require('express'),
    router = express.Router(),
    place = require('../model/place'),
    placeController = require('../controller/place'),
    adminAuthController = require('../controller/adminAuth'),
    studentAuthController = require('../controller/studentAuth');

router.post('/', adminAuthController.adminAuthenticate, placeController.createPlace);
router.get('/', placeController.getAllPlaces);
router.get('/:id', placeController.getPlace);
router.patch('/:id', studentAuthController.studentAuthenticate, placeController.updatePlace);
router.delete('/:id', adminAuthController.adminAuthenticate, placeController.deletePlace);

module.exports = router;