const { body, validationResult } = require('express-validator');

exports.validateSignup = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('phoneNumber').matches(/^\d{10}$/).withMessage('Phone number must be 10 digits'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('accountType').isIn(['patient', 'admin', 'doctor', 'laboratory']).withMessage('Invalid account type'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

exports.validateSignin = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
