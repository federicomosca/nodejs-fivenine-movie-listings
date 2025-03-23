const express = require('express')
const Movie = require('../models/movie.model')
const { getMovies, getMovie, createMovie, updateMovie, deleteMovie, searchMovies } = require('../controllers/movie.controller')
const router = express.Router()

router.get('/search', searchMovies);

router.get('/', getMovies)
router.get('/:id', getMovie)

router.post('/', createMovie)
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)

module.exports = router