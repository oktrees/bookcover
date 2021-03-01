import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { verifyToken } from './middlewares';
import User from '../models/user';
 
const router = express.Router();


router.get('/', async (req, res) => {
    let data = await User.findAll({ attributes: ['contact'], where: { id: 1 } })
    res.send(data[0]); 
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (userError, user, info) => {
        if (userError) {
            console.error(userError);
            return next(userError);
        }
        if (!user) {
            return res.send({ result: false, message: info.message });
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            const token = jwt.sign({
                name: user.name,
            }, process.env.JWT_SECRET!, {
                expiresIn: '365d',
                issuer: 'oktree',
            });

            return res.json({
                code: 200,
                message: '토큰이 발급되었습니다.',
                token,
            });
        });
    })(req, res, next);
});

router.patch('/', verifyToken, async (req, res) => {
    let data = await User.findAll({ attributes: ['contact'], where: { id: 1 } })
    await User.update(req.body,{ where: { id: 1 } });
    res.send(true);
});

export default router;