const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local").Strategy;
const { UnAuthorisedError } = require("../errors");
const { userModel } = require("../model");

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET || "something_secret",
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Use this if you are using Bearer token
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);


passport.use(
    "signUp",
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
        try {
            const body = req.body
            const user = await userModel.create({ ...body });
            user.token = user.CreateJwt()
            return done(null, user, {message: 'account succesfully created'});
        } catch (error) {
            done(error);
        }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
           usernameField: 'email',
           passwordField: 'password'
        },
        async (username,password,done)=>{
            try {
                const user = await userModel.findOne({username})
                if(!user){
                    const error = new UnAuthorisedError('user not found')
                    return done(error)
                }
                const isValid = user.isPasssword(password)
                if(!isValid){
                    const error = new UnAuthorisedError('password is incorrect')
                    return done(error)
                }
                
                return done(null , user)

            } catch (error) {
                done(error)
            }
        }
    )
)