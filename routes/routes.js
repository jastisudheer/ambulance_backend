const express = require('express');

const { postHome } = require('../controllers/homeController');
const {
    postAdmin
} = require('../controllers/adminController')

// const requireAuth = require('../middleware/requireAuth');

const { getHospital, postHospital } = require('../controllers/hospitalController');

const { getAmbulancedrive, postAmbulancedrive } = require('../controllers/ambulanceController');

const { getTraffic, postTraffic } = require('../controllers/trafficController');


const router = express.Router();

router.post('/user', postHome);
// router.get('/home', getHome);

router.post('/admin', postAdmin);
// router.get('/admin', getAdmin);

router.post('/hospital_post', postHospital);
router.get('/hospital_get', getHospital);

router.post('/traffic_post', postTraffic);
router.get('/traffic_get', getTraffic);

router.post('/ambulance_post', postAmbulancedrive);
router.get('/ambulance_get', getAmbulancedrive);



module.exports = router;