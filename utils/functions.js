const axios = require('axios');

//get picsum photos
async function getImageUrl() {
    try {
        const response = await axios.get('https://picsum.photos/200');
        return response.request.res.responseUrl;
    } catch (error) {
        console.error('Error fetching image URL:', error.message);
        return null;
    }
}

//get specie colors
async function getSpeciesColor(url) {
    try {
        const response = await axios.get(url);
        return response.data?.skin_colors.split(",")[0]

    } catch (error) {
        console.error('Error fetching species:', error.message);
        return null;
    }
}


module.exports = {
    getImageUrl,
    getSpeciesColor
}