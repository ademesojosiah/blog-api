const express = require('express')
const passport = require('passport')
const router = express.Router()
const {signup} = require('../controller/auth')


router.route('/signup').post(passport.authenticate('signUp',{session:false}),signup )

module.exports = router