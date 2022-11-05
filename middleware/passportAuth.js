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
        return done(null, token);
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
        async (req, email, password, done) => {
        try {
            const body = req.body
            body.email = body.email.toLowerCase()
            const user = await userModel.create({ ...body });
            const token = user.CreateJwt()
            return done(null, {user,token:token}, {message: 'account succesfully created'});
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
        async (email,password,done)=>{
            try {
              if(email) email = email.toLowerCase()
                const user = await userModel.findOne({email})
                if(!user){
                    const error = new UnAuthorisedError('user not found')
                    return done(error)
                }
                const isValid = await user.isPassword(password)
                if(!isValid){
                    const error = new UnAuthorisedError('password is incorrect')
                    return done(error)
                }
                
                const token = user.CreateJwt()
                return done(null , {user,token:token})

            } catch (error) {
                done(error)
            }
        }
    )
)