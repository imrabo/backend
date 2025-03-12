import { check, validationResult } from "express-validator";

const validateEmailLogin = [
    check("email").isEmail().withMessage("Invalid email format."),
];

const validateEmailSignUp = [
    check("name").notEmpty().withMessage("Name is required."),
    check("email").isEmail().withMessage("Invalid email format."),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                status: 400,
                msg: "Validation failed",
                errors: errors.array(),
            });
        }
        next();
    },
];

const validateEmailVerification = [
    check("email").isEmail().withMessage("Invalid email format."),
    check("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                status: 400,
                msg: "Validation failed",
                errors: errors.array(),
            });
        }
        next();
    },
];


export { validateEmailLogin, validateEmailSignUp, validateEmailVerification };


