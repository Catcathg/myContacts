const express = require('express');
require('dotenv').config();
const connectDB = require('./db/mongodb');
const contactRoutes = require('./routeurs/contactRoutes');

const app = express()

app.use(express.json());

connectDB();

app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log('Server Start');
});



