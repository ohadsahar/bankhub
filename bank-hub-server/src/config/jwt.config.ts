import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Container } from "typedi";
import { AuthService } from '../api/services/auth.service';
import getConfig from "./env.config";
import Logger from "./logger.config";

const authService = Container.get(AuthService);

const config = getConfig();

export const initJWT = () => {
    Logger.info('Initiating jwt');
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.key,
        ignoreExpiration: config.jwt.ignoreExpiration
    };
    const strategy = new JwtStrategy(options, function (jwt_payload, done) {
        authService
            .findByPhoneNumber(jwt_payload.phoneNumber) // also attach organization to user
            .then((user) => {
                if (!user) {
                    return done(
                        new Error('No user with this phone Number' + jwt_payload.phoneNumber));
                }
                return done(null, { user });
            })
            .catch((error) => {
                return done(error);
            });
    });
    passport.use(strategy);
};
