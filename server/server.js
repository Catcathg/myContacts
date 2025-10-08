require('dotenv').config();
console.log("Loaded ENV:", process.env);

const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require("./swagger");
const connectDB = require('./db/mongodb');
const contactRoutes = require('./routes/contactRoute');
const userRoutes = require('./routes/userRoute');

const app = express();

const allowedOrigins = [
    "https://mycontacts-a3hi.onrender.com",
    "http://localhost:5173"
];
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

app.use('/api/contacts', contactRoutes);
app.use('/auth', userRoutes);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log('Server Start');
    });
}

module.exports = app;
