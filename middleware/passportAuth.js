const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const localStrategy = require('passport-local').Strategy


passport.use( 
        new JwtStrategy(
            {
                secretOrKey: process.env.JWT_SECRET || 'something_secret',
                // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken() // Use this if you are using Bearer token
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
            }
        )
)
