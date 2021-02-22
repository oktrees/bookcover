import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/?loginError=로그인이 필요합니다.');
    }
};

const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};
 
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {

        jwt.verify(req.headers.authorization!, process.env.JWT_SECRET!);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다. 다시 로그인을 해주세요',
            });
        }
        return res.status(401).json({
            code: 401,
            messgae: '유효하지 않은 토큰입니다.',
        })
    }
}

export { isLoggedIn, isNotLoggedIn, verifyToken };