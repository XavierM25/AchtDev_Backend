import express from 'express';
import mongoose from 'mongoose';
import usersRoutes from './routes/usersRoutes.mjs';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);

// Middleware para manejar JSON
app.use(express.json());
app.use(cookieParser());

// Rutas de usuarios
app.use('/api/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});