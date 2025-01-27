import { use, useState } from "react";
import s from "./tasklist.module.css";

const Tasklist = () => {
    const [task, setTask] = useState(""); 
    const [tasks, setTasks] = useState([]);
    const newTask = (t) => {
        setTask(t);
    };
    const addTask = () => {
        setTasks(tasks => [...tasks, task]);
    };

    return (
        <div>
            <h1 className={s.h1}>Start adding tasks!</h1> 
            <div style={{ display: 'flex', alignContent:'center'}}>
            <input className={s.textbox} onChange={(e) => newTask(e.target.value)}/>
            <button className={s.addtaskbtn} onClick={addTask}>Add</button>
            </div>

            <div className={s.tasklist}>
                <div className={s.h2}>Your list of tasks</div>
                <div className={s.tasklist}>
                    {
                        tasks.map((item,index) => (
                            <li key={index} className={s.taskitem}>{item}</li>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Tasklist;