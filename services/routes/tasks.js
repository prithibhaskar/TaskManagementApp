import { Router } from 'express';
import query from '../helpers/db.js';
import validateToken from '../helpers/validateToken.js';

const router = Router();

router.get("/", validateToken, async(req, res, next) => {
    try{
        const tasks = await query(`SELECT * from tasks where userid = '${req.userId}'`);
        if(!tasks){tasks = [];} 
        res.status(200).json({tasks:tasks});
    }
    catch(err){
        res.status(500);
        console.log(err.message);
    }
});

router.post("/", validateToken, async(req, res, next) => {
    try{
        const results = await query(`INSERT INTO tasks (taskdescription,userid) VALUES('${req.body.taskdescription}', '${req.userId}')`);
        const data = {taskId: results.insertId, message:"Task added Successfully"};
        res.status(200);
        res.end(JSON.stringify(data));
    }
    catch(err){
        console.log(err);
        res.status(500).json("Error adding task");
    }
});

router.delete("/", validateToken, async(req, res, next) => {
    try{
        await query(`DELETE FROM tasks where taskid = '${req.body.taskid}' && userid = '${req.userId}'`);
        res.status(200).json({message:"Task deleted Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json("Error deleting task");
    }
});

export default router;

