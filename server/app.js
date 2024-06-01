const express = require('express');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());


app.use('/categories', productRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
