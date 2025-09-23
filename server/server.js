const express = require('express');
require('dotenv').config();
const connectDB = require('./db/mongodb');
const contactRoutes = require('./routes/contactRoute');
const userRoutes = require('./routes/userRoute')

const app = express()

app.use(express.json());

connectDB();

//Routes
app.use('/api/contact', contactRoutes);
app.use("/auth", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log('Server Start');
});



