import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../models/user';

export default () => {
    passport.use('local', new Strategy({
        usernameField: 'name',
        passwordField: 'password',
    }, async (name, password, done) => {
        try {
            console.log(User);
            const exUser = await User.findOne({ where: { name } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            }else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};