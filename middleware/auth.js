const jwt = require('jsonwebtoken');
const userModel = require("../model/user");


exports.authenticate = (req, res, next) => {
    console.log(req.header('Authorization'))

    const token = req.header('Authorization')?.split(' ')[1];
    console.log("dofu    "+token)
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log(process.env.SECRET_KEY)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        req.user = decoded;
        console.log(req.user)
        console.log("User Authenticated")
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (user.accountType !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }

}

exports.isDoctor = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (user.accountType !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.isPatient = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (user.accountType !== 'patient') {
            return res.status(403).json({ message: 'Access denied: Patients only' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server Error(patient)' });
    }
};

exports.isLaboratory = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (user.accountType !== 'laboratory') {
            next();
        }
        
    } catch (err) {
        res.status(500).json({ message: 'Server Error(lab)' });
    }

}