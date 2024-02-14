const router = require('express').Router();
const StarWarsController = require('../controllers/starWarsController')

//get starwars Data
router.get('/people', StarWarsController.getPeople)

//add new people
router.post('/people', StarWarsController.addPeople)

//update people dataS
router.put('/people/:id', StarWarsController.updatePeople)

//delete people data
router.delete('/people/delete', StarWarsController.deletePeople)



module.exports = router;
