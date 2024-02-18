const router = require('express').Router();
const StarWarsController = require('../controllers/starWarsController')

//get starwars Data
router.get('/people', StarWarsController.getPeople)

//add new people
router.post('/people', StarWarsController.addPeople)

//update people data
router.put('/people/:id', StarWarsController.updatePeople)

//delete people data
router.delete('/people/:id', StarWarsController.deletePeople)


module.exports = router;
