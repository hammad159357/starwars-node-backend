const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    birth_year: String,
    eye_color: String,
    films: [{
        type: String,
    }],
    gender: String,
    hair_color: String,
    height: String,
    homeworld: {
        type: String,
    },
    mass: String,
    name: String,
    skin_color: String,
    climate: String,
    residents: String,
    characterFilms: String,
    terrain: String,
    created: {
        type: String,
    },
    edited: {
        type: String,
    },
    species: [{
        type: String,
    }],
    starships: [{
        type: String,
    }],
    url: String,
    vehicles: [{
        type: String,
    }]
});

module.exports =  mongoose.model('Character', peopleSchema);
