import {Router} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import query from '../helpers/db.js';

const router = Router();

router.post('/', async(req, res)=> {
    try{
        console.log("In login handler");
        const {email, password} = req.body;
        const user = await query(`SELECT * from users WHERE email='${email}'`);
        if(!user.length > 0){
            res.status(401).json({error: 'Authentication failed'});
        }
        const passwordMatch = await bcrypt.compare(String(password), String(user[0].password));
        if(!passwordMatch){
            res.status(401).json({error: 'Authentication failed. Invalid credentials'});
        }
        else{
            const token = await jwt.sign({userId: user[0].userid}, 'your-secret-key', {
                expiresIn: '1h',
            });
            const data = {message: 'Login Successful', token:token};
            res.status(200);
            res.end(JSON.stringify(data));
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Server Error"});
    }
});

export default router;