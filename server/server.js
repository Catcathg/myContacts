require('dotenv').config();
console.log("Loaded ENV:", process.env); 
const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require("./swagger");
const connectDB = require('./db/mongodb');
const contactRoutes = require('./routes/contactRoute');
const userRoutes = require('./routes/userRoute')

const app = express()

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();

//Routes
app.use('/api/contacts', contactRoutes);
app.use("/auth", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log('Server Start');
});



