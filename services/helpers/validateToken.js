import e from 'express';
import jwt from 'jsonwebtoken';

function validateToken(req, res, next){
    var token = "";
    try{
        token = req.header('Authorization').split(' ')[1];
    }
    catch(error){
        res.status(500).json({error:"Please provide a valid token"});
    }
    if(!token){
        res.status(401).json({error:"Access denied"});
    }
    try{
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({error:"Invalid token"});
    }
};

export default validateToken;