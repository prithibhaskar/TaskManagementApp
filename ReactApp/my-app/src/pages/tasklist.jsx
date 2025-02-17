import { useState, useEffect } from "react";
import s from "./tasklist.module.css";
import Cookies from 'js-cookie';

const Tasklist = () => {
    const [taskdescription, setTask] = useState(""); 
    const [tasksdict, setTasksdict] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => async function fetchTasks() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${Cookies.get('token')}`
            }
        };
        console.log("Request",requestOptions);
        const response = await fetch('http://127.0.0.1:3000/tasks/', requestOptions);
        if(response.status === 200){
            const resJson = await response.json();
            const tasksdata = {};
            resJson.tasks.forEach(element => {
                tasksdata[element.taskid] = element.taskdescription;
            });
            setTasksdict(tasksdata);
            //setTasks(resJson.tasks);
        }
        else{
            console.log("Error fetching tasks for user");
        }
    }, []); 

    const addTask = async() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify({taskdescription})
        };
        console.log("Request",requestOptions);
        const response = await fetch('http://127.0.0.1:3000/tasks/', requestOptions);
        if(response.status === 200){
            const resJson = await response.json();
            console.log(resJson.taskId);
            console.log(taskdescription);
            setTasksdict(prevdict => ({...prevdict, [resJson.taskId]: taskdescription}));
            console.log(tasksdict);
            //setTasks(tasks => [...tasks, taskdescription]);
        }
    };

    return (
        <div>
            <h1 className={s.h1}>Start adding tasks!</h1> 
            <div style={{ display: 'flex', alignContent:'center'}}>
            <input className={s.textbox} onChange={(e) => setTask(e.target.value)}/>
            <button className={s.addtaskbtn} onClick={addTask}>Add</button>
            </div>

            <div className={s.tasklist}>
                <div className={s.h2}>Your list of tasks</div>
                <div>
                    {Object.keys(tasksdict).length > 0 ? (
                        <ul>
                            {Object.entries(tasksdict).map(([key, value]) => (
                                <li key={key} className={s.taskitem}>
                                    {value}
                                </li>
                            ))}
                        </ul>
                    ): (
                        <p> Loading data ... </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tasklist;