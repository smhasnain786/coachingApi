const jwt = require('jsonwebtoken');

const authMiddleware = {
    optional: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
            } catch (error) {
                console.warn('Invalid token provided');
            }
        }
        next();
    },
    required: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Login First' });
        }
    }
};

module.exports = authMiddleware;