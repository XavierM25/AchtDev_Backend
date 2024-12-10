const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/authMiddleware');

router.get('/dashboard', authenticate, async (req, res) => {
    try {
        const usuario = await User.findById(req.user.id, '-password');
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;