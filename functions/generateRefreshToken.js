import {sign} from 'jsonwebtoken';
const generateRefreshToken = (user) => {
    const payload = {sub:user._id , role:user.role};
    const jwt = sign(payload,process.env.JWT_SECRET_R,{expiresIn: '1h'})
    return jwt;
};
export default generateRefreshToken;