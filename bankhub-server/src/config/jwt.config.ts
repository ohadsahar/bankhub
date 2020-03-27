import passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt';
import {Container} from "typedi";
import {AuthService} from '../api/services/auth.service';
import getConfig from "./env.config";
import Logger from "./logger.config";
// import {AdminAuthService} from '../api/services/admin-auth.service';

const authService = Container.get(AuthService);
// const authAdminService = Container.get(AdminAuthService);
const config = getConfig();

export const initJWT = () => {
    Logger.info('Initiating jwt');
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
        secretOrKey: config.jwt.key,
        ignoreExpiration: config.jwt.ignoreExpiration
    };
    const strategy = new JwtStrategy(options, async (jwtPayload: { phoneNumber: string }, done) => {
        let user;
        if (jwtPayload.phoneNumber.includes('+')) {
            jwtPayload.phoneNumber = jwtPayload.phoneNumber.substr(4, jwtPayload.phoneNumber.length)
        }
        user = await authService.findByPhoneNumber(jwtPayload.phoneNumber);
        if (!user) {
            // user = await authAdminService.adminGet(jwtPayload.phoneNumber);
            if (!user) {
                return done(
                    new Error('No user with this phone Number' + jwtPayload.phoneNumber));
            } else {
                return done(null, {user});
            }
        } else {
            return done(null, {user});
        }
    });
    passport.use(strategy);
};
