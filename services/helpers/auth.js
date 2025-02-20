import jwt from jsonwebtoken;

function validateToken(req, res, next){
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({error: 'Access denied. Please login'});
    try{
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        res.status(401).json({error: 'Invalid token'});
    }
};

export default validateToken;