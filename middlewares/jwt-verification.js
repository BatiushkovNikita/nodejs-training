import jwt from 'jsonwebtoken';
import AuthError from "../controllers/auth-error";

const authCustom =  (req, res, next) => {
    if (req.headers !== undefined && req.headers.authorization !== undefined &&
        jwt.decode(req.headers.authorization.substring(7))) {
        next();
    } else {
        res.status(401).json(new AuthError(401, 'Unauthorized'));
    }
};

module.exports = {
    authCustom: authCustom
};
