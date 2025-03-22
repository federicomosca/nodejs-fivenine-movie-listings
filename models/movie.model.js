const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter movie name'],
    },
    releaseDate: {
        type: Date,
        required: [false, 'Please enter movie release date'],
    },
    genre: {
        type: String,
        required: [false, 'Please enter movie genre'],
    },
    rating: {
        type: Number,
        required: [false, 'Please enter movie rating'],
    },
    duration: {
        type: Number,
        required: [false, 'Please enter movie duration'],
    },
    director: {
        type: String,
        required: [false, 'Please enter movie director'],
    },
    cast: {
        type: String,
        required: [false, 'Please enter movie cast'],
    },
    description: {
        type: String,
        required: [false, 'Please enter movie description'],
    },
    image: {
        type: String,
        required: [false, 'Please enter movie image'],
    },
},
    {
        timestamps: true,
    }
)

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie