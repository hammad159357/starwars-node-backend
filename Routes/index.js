const router = require('express').Router();
const starRoutes = require('./StarRoutes');


router.use('/starWars', starRoutes);


module.exports = router