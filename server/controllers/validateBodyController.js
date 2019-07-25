const validator = require('express-validator');
const { validationResult } = require('express-validator');

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
];

exports.signUpValidationBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        const nameError = errorsObj.name && errorsObj.name.msg;
        return res.status(400).json({
            error: {
                msg: emailError || nameError,
                reportedAt: new Date().getTime(),
            },
        });
    }
    return next();
};

/* Email - Verification Token */
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
        .withMessage('No valid verification token.')
        .matches(/^[0-9]+$/)
        .withMessage('Verification token must be a 6-digit number.')
        .isLength({ min: 6, max: 6 })
        .withMessage('Verification token must be 6 characters long.'),
];

exports.emailVerificationBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        const tokenError = errorsObj.verificationToken && errorsObj.verificationToken.msg;
        return res.status(400).json({
            error: {
                msg: emailError || tokenError,
                reportedAt: new Date().getTime(),
            },
        });
    }
    return next();
};

exports.finalizeAccountValidationCriterias = [
    validator
        .body('email')
        .exists()
        .withMessage('No email address found.')
        .isEmail()
        .withMessage('Invalid email address.')
        .trim()
        .normalizeEmail(),
    validator
        .body('userId')
        .exists()
        .withMessage('No valid userId.'),
    validator
        .body('salt')
        .exists()
        .withMessage('No valid salt.'),
    validator
        .body('verifier')
        .exists()
        .withMessage('No valid verifier.'),
    validator
        .body('encryptionKeys')
        .exists()
        .withMessage('No valid encryption keys.'),
];

exports.finalizeAccountValidationBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        const userIdError = errorsObj.userId && errorsObj.userId.msg;
        const saltError = errorsObj.salt && errorsObj.salt.msg;
        const verifierError = errorsObj.verifier && errorsObj.verifier.msg;
        const encryptionKeysError = errorsObj.encryptionKeys && errorsObj.encryptionKeys.msg;
        return res.status(400).json({
            error: {
                msg: emailError || userIdError || saltError || verifierError || encryptionKeysError,
                reportedAt: new Date().getTime(),
            },
        });
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
        .body('stage')
        .exists()
        .withMessage('No srp stage is specified.'),
];

exports.loginValidationBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const emailError = errorsObj.email && errorsObj.email.msg;
        const stageError = errorsObj.stage && errorsObj.stage.msg;
        return res.status(400).json({
            error: {
                msg: emailError || stageError,
                reportedAt: new Date().getTime(),
            },
        });
    }
    return next();
};

/* Login Form */
exports.addOrUpdateItemCriterias = [
    validator
        .body('encDetails')
        .exists()
        .withMessage('Missing Encrypted Details.'),
    validator
        .body('encOverview')
        .exists()
        .withMessage('Missing Encrypted Overview.'),
    validator
        .body('itemId')
        .exists()
        .withMessage('Missing item id.'),
    validator
        .body('modifiedAt')
        .exists()
        .withMessage('Missing last modified time.'),
];

exports.addOrUpdateItemBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const encDetailsError = errorsObj.encDetails && errorsObj.encDetails.msg;
        const encOverviewError = errorsObj.encOverview && errorsObj.encOverview.msg;
        const itemIdError = errorsObj.itemId && errorsObj.itemId.msg;
        const modifiedAtError = errorsObj.modifiedAt && errorsObj.modifiedAt.msg;
        return res.status(400).json({
            error: {
                msg: encDetailsError || encOverviewError || itemIdError || modifiedAtError,
                reportedAt: new Date().getTime(),
            },
        });
    }
    return next();
};

/* Delete item */
exports.deleteItemCriterias = [
    validator
        .body('itemId')
        .exists()
        .withMessage('Missing item id.'),
];

exports.deleteItemBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorsObj = errors.mapped();
        const itemIdError = errorsObj.itemId && errorsObj.itemId.msg;
        return res.status(400).json({
            error: {
                msg: itemIdError,
                reportedAt: new Date().getTime(),
            },
        });
    }
    return next();
};

/* ------------------------------------------------------------- */
/*                 // ToDo: REFACTOR Later
/* ------------------------------------------------------------- */

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
        return res.status(400).json({
            error: {
                msg: emailError,
                reportedAt: new Date().getTime(),
            },
        });
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
        return res.status(400).json({
            error: {
                msg: emailError || tokenError,
                reportedAt: new Date().getTime(),
            },
        });
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
        return res.status(400).json({
            error: {
                msg: passwordError,
                reportedAt: new Date().getTime(),
            },
        });
    }
    return next();
};
