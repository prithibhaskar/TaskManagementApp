import { Router } from 'express';
import bcrypt from 'bcryptjs';
import query from '../helpers/db.js';
import validateUserData from '../helpers/validateData.js';

const router = Router();

router.get("/", async(req, res, next) => {
    try{
        const users = await query(`SELECT * from users`);
        if(!users){users = [];} 
        res.status(200).send(users);
    }
    catch(err){
        res.status(500);
        console.log(err.message);
    }
});

router.post("/register", validateUserData, async(req, res, next) => {
    try{
        const user = await query(`SELECT * from users WHERE email='${req.body.userEmail}'`);
        if(user.length===0){
            const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
            await query(`INSERT INTO users (name,email,password) VALUES('${req.body.userName}', '${req.body.userEmail}', '${hashedPassword}')`);
            res.status(200).json({message:"User created successfully"});
        }
        else{
            res.status(409).json({message:"User is already registered. Please login"});
        }
    }
    catch(err){
        console.error("Error creating new User", err);
        res.status(500);
    }
});

export default router;