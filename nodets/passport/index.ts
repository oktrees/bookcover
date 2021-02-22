import passport from 'passport';
import local from './local';
import User from '../models/user';

export default () => {
    passport.serializeUser((user: any, done) => { // 로그인 시 실행
        done(null, user.id);
    });

    passport.deserializeUser(async (id: any, done) => { // 매번 실행
        try {
            const user = await User.findOne({
                where: { id },
            });
            if (!user) {
                return done(new Error('no user'));
            }
            return done(null, user); // req.user
        } catch (err) {
            console.error(err);
            return done(err);
        }
    });

    local();
}