import { Router } from 'express';
import query from '../helpers/db.js';
import validateToken from '../helpers/validateToken.js';

const router = Router();

router.get("/", validateToken, async(req, res, next) => {
    try{
        const tasks = await query(`SELECT * from tasks where userid = '${req.userId}'`);
        if(!tasks){tasks = [];} 
        res.status(200).send(tasks);
    }
    catch(err){
        res.status(500);
        console.log(err.message);
    }
});

router.post("/", validateToken, async(req, res, next) => {
    try{
        await query(`INSERT INTO tasks (taskdescription,userid) VALUES('${req.body.taskdescription}', '${req.userId}')`);
        res.status(200).json({message:"Task added Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json("Error adding task");
    }
});

export default router;

