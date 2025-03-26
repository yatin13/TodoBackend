const express = require('express');
const { UserController } = require('../../controller/user');
const router = express.Router();
const validator = require("express-joi-validation").createValidator({ passError: true });
const validationSchema = require('../../controller/user/auth/auth.validations');
const { headerSchema } = require("../../utilities/common")

router.post('/login', validator.headers(headerSchema), validator.body(validationSchema.LoginUser), UserController.login);
router.post('/signup', validator.headers(headerSchema), validator.body(validationSchema.SignUpUser), UserController.signup);
module.exports = router;