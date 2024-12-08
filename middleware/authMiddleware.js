const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token de acceso' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token de acceso inválido' });
    }
};

module.exports = authenticate;