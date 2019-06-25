const validator = require('express-validator/check');
const { validationResult } = require('express-validator/check');

/* SignUp Form */
exports.signUpValidationCriterias = [
    validator
        .body('email')
        .exists()
        .withMessage('You must provide a valid email address.')
        .isEmail()
        .withMessage('Email address you entered is not valid.')
        .trim()
        .normalizeEmail(),
    validator
        .body('name')
        .exists()
        .withMessage('You must provide your name.'),
    // validator
    //   .body('password', 'Master Password must be at least 8 chars long.')
    //   .exists()
    //   .withMessage('You must supply a secure Master Password.')
    //   .isLength({ min: 8 }),
    // validator
    //   .body('confirmPassword', 'Passwords do not match')
    //   .exists()
    //   .withMessage('You must confirm the Master Password')
    //   .custom((value, { req }) => (value === req.body.password)),
];

exports.signUpValidationBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        const nameError = errorsObj.name && errorsObj.name.msg;
        // const passwordError = errorsObj.password && errorsObj.password.msg;
        // const confirmPasswordError = errorsObj.confirmPassword && errorsObj.confirmPassword.msg;
        return res.status(400).json({ error: emailError || nameError });
    }
    return next();
};

/* Email - Verification Link */
exports.emailVerificationCriterias = [
    validator
        .body('email')
        .exists()
        .withMessage('No email address found.')
        .isEmail()
        .withMessage('Invalid email address.')
        .trim()
        .normalizeEmail(),
    validator
        .body('verificationToken')
        .exists()
        .withMessage('No valid verification token.'),
];

exports.emailVerificationBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        const tokenError = errorsObj.verificationToken && errorsObj.verificationToken.msg;
        return res.status(400).json({ error: emailError || tokenError });
    }
    return next();
};

/* Forget Password Form */
exports.resetPasswordFormCriterias = [
    validator
        .body('email')
        .exists()
        .withMessage('You must provide a valid email address.')
        .isEmail()
        .withMessage('Email address you entered is not valid.')
        .trim()
        .normalizeEmail(),
];

exports.resetPasswordFormBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        return res.status(400).json({ error: emailError });
    }
    return next();
};

/* Email - Password Reset Link */
exports.emailPasswordResetCriterias = [
    validator
        .query('email')
        .exists()
        .withMessage("Link doesn't contain an email address.")
        .isEmail()
        .withMessage("Link doesn't contain a valid email address.")
        .trim()
        .normalizeEmail(),
    validator
        .query('passwordResetToken')
        .exists()
        .withMessage("Link doesn't contain a valid password reset token."),
];

exports.emailPasswordResetBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        const tokenError = errorsObj.passwordResetToken && errorsObj.passwordResetToken.msg;
        return res.status(400).json({ error: emailError || tokenError });
    }
    return next();
};

/* Login Form */
exports.loginValidationCriterias = [
    validator
        .body('email')
        .exists()
        .withMessage('You must provide a valid email address.')
        .isEmail()
        .withMessage('Email address you entered is not valid.')
        .trim()
        .normalizeEmail(),
    validator
        .body('password', 'Master Password is at least 8 chars long.')
        .exists()
        .withMessage('You must supply your OnePass Master Password.')
        .isLength({ min: 8 }),
];

exports.loginValidationBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        const passwordError = errorsObj.password && errorsObj.password.msg;
        return res.status(400).json({ error: emailError || passwordError });
    }
    return next();
};

exports.changePasswordCriterias = [
    validator
        .body('password', 'New Master Password should be at least 8 chars long.')
        .exists()
        .withMessage('You must supply a new OnePass Master Password.')
        .isLength({ min: 8 }),
];

exports.changePasswordBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const passwordError = errorsObj.password && errorsObj.password.msg;
        return res.status(400).json({ error: passwordError });
    }
    return next();
};

exports.createPasswordEntryCriterias = [
    validator
        .body('sitename', 'Sitename should be less than 1024 character')
        .exists()
        .withMessage('A sitename is required for the entry.')
        .isLength({ max: 1024 }),
];

exports.createPasswordEntryBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const sitenameError = errorsObj.sitename && errorsObj.sitename.msg;
        return res.status(400).json({ error: sitenameError });
    }
    return next();
};
