const passport = require("passport");
const passportJWT = require("passport-jwt");

const userService = require("../../modules/v1/user/userService");
const envConfig = require("../../config/environment/environment.config");

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;

/**
 * @description Ectract JWT token from request headers and verify
 */

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig.secretKey,
    },
    async (jwtPayload, cb) => {
      try {
        const userId = jwtPayload.data;
        let user = await userService.getUser(userId);
        if (user) {
          user._id = user._id.toString();
        }
        /**
         * pass user data
         */
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);
