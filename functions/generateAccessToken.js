import {sign} from 'jsonwebtoken';
const generateAccessToken = (user) => {
    const payload = {sub:user._id , img:user.img , username:user.username , role:user.role};
    const jwt = sign(payload,process.env.JWT_SECRET,{expiresIn: '1d'})
    return jwt;
};
export default generateAccessToken;