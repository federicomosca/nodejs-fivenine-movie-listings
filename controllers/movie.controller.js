const Movie = require('../models/movie.model')
const tmdb = require('../services/tmdb.service');

const searchMovies = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query mancante' });
  }

  try {
    const response = await tmdb.get('/search/movie', {
      params: { query }
    });

    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: 'Errore durante la ricerca', error: err.message });
  }
};

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        res.status(200).json({ movies })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getMovie = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await Movie.findById(id)
        res.status(200).json({ movie })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body)
        res.status(201).json({ movie })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await Movie
            .findByIdAndUpdate(id, req.body)

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        const updatedMovie = await Movie.findById(id)
        res.status(200).json({ movie: updatedMovie })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await Movie.findByIdAndDelete(id)

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' })
        }


        res.status(200).json({ message: 'Movie deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovies
}

