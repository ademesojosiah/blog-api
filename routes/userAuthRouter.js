const express = require('express')
const passport = require('passport')
const router = express.Router()
const {signup , login} = require('../controller/auth')


router.route('/signup').post(passport.authenticate('signUp',{session:false}),signup )
router.route('/login').post(passport.authenticate('login',{session:false}),login)

module.exports = router