import jwt from 'jsonwebtoken';
import { createUser } from '../services/usersService.mjs';
import User from '../models/User.mjs';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await createUser(name, email, password);

        // Generar un token de acceso
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Establecer el token en una cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hora
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Excluir la contraseña
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};