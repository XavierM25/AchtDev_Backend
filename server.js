const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4321', // Tu URL de frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true // Importante
}));

app.use(cookieParser()); // Usa cookie-parser antes que tus rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la base de datos MongoDB'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/protected', authenticate, require('./routes/protectedRoutes.js'));

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});