const express = require('express')
const passport = require('passport')
const router = express.Router()
const {signup , login} = require('../controller/auth')
const {signUpValidationMiddleware,logInValidationMiddleware} = require('../validation/user.validation')


router.route('/signup').post(signUpValidationMiddleware,passport.authenticate('signUp',{session:false}),signup )
router.route('/login').post(logInValidationMiddleware,passport.authenticate('login',{session:false}),login)

module.exports = router