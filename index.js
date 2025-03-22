require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const movieRoute = require('./routes/movie.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/movies', movieRoute);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});
