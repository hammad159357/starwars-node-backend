const axios = require('axios');
const { getImageUrl, getSpeciesColor } = require('../utils/functions');
const Character = require('../models/character');


async function getPeople(req, res) {
    const { page, size } = req.query
    let currentPage = page || 1
    let pageSize = size || 10
    const skip = (currentPage - 1) * pageSize;
    try {
        const response = await Character.find().skip(skip).limit(pageSize);;

        const characterDataPromises = response?.map(async (character) => {
            const { species } = character
            try {
                let imageUrl = await getImageUrl()
                // let specieColor = null
                // if(species?.length > 0){
                //     specieColor = await getSpeciesColor(species[0])
                // }
                return { ...character.toObject(), image: imageUrl };
            } catch (error) {
                console.error(error);
                return { ...character.toObject(), image: null };
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
        //If add new character in the end of an array
        // const newCharacter = await Character.create(req.body);

        //Add new Character in the start of an array
        const newCharacter = req.body;
        const existingCharacters = await Character.find();
        const updatedCharacters = [newCharacter, ...existingCharacters];

        await Character.deleteMany({});
        await Character.insertMany(updatedCharacters);

        res.status(201).json("New character added");
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function updatePeople(req, res) {
    try {
        await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({ message:"Character Details Updated Successfully"});
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

async function deletePeople(req, res) {
    const { id } = req.params
    try {
        await Character.findByIdAndDelete(id)
        res.status(200).json({ message: 'Character deleted successfully' });
    } catch (err) {
        console.log("Error deleting person: ", err)
        res.status(404).json({ message: 'Character not found' });
    }
}

module.exports = {
    getPeople,
    addPeople,
    updatePeople,
    deletePeople
}