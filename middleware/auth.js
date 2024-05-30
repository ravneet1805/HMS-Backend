const jwt = require('jsonwebtoken');


exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

exports.isAdmin = (req, res, next) => {

}

exports.isDoctor = (req, res, next) => {
    
}

exports.isPatient = (req, res, next) => {
    
}