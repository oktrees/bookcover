const express= require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const { verifyToken  } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.use(cors({
    credentials: true,
    // origin: 주소를 써주면 해당 주소만허용, 기본값 *
}))

router.get('/', async (req, res) => {
    let data = await User.findAll({ attributes: ['contact'] }, { where: { id: 1 } })
    res.send(data[0]);
});

router.post('/', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
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
            }, process.env.JWT_SECRET, {
                expiresIn: '180m',
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
    let data = await User.findAll({ attributes: ['contact'] }, { where: { id: 1 } })
    await User.update(req.body,{ where: { id: 1 } });
    res.send(true);
});

module.exports = router;