const axios = require('axios');
const { getImageUrl, getSpeciesColor } = require('../utils/functions');

let people = [];

async function getPeople(req, res) {
    const { page } = req.query
    let currentPage = page || 1

    try {
        const response = await axios.get(`https://swapi.dev/api/people?page=${currentPage}`);
        people = response.data.results;
        const characterDataPromises = people?.map(async (character) => {
            const { species } = character
            try {
                let imageUrl = await getImageUrl()
                // let specieColor = null
                // if(species?.length > 0){
                //     specieColor = await getSpeciesColor(species[0])
                // }
                return { ...character, image: imageUrl };
            } catch (error) {
                console.error(error);
                return { ...character, image: null };
            }
        });

        const characterData = await Promise.all(characterDataPromises);
        res.json(characterData);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function addPeople(req, res) {
    try {
        const newPerson = req.body;
        people.push(newPerson)
        res.status(201).json(newPerson);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function updatePeople(req, res) {
    try {
        const id = req.params.id
        const updatePerson = req.body
        people[id] = updatePerson
        res.json(updatePerson)
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function deletePeople(req, res) {
    const { id } = req.body
    try {
        const deletedPerson = people.splice(id, 1);
        people = people?.filter((item, index) => id !== index)
        res.json(deletedPerson);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getPeople,
    addPeople,
    updatePeople,
    deletePeople
}