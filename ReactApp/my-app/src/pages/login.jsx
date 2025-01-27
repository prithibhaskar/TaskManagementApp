import s from "./login.module.css";
import logo from '../TaskManager.png';
import { useState } from "react";
import { Navigate } from "react-router-dom";


const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[formError, setFormError] = useState("");

    const handleLogin = () => {
        if(!email || !password){
            console.log("Error block");
            setFormError("Enter valid Email and Password");
        }
        else{
            console.log("Valid form");
            setIsLoggedIn(true);
        }
    };

    return (
        <div>
            <h2 className={s.h2}>Welcome to the Task Manager Application!</h2> 
            <img src={logo} className="App-logo" alt="logo" />
            {!isLoggedIn && (
                <div className={s.logincontainer}>
                    <p className={s.message}>Enter email:</p>
                    <input className={s.textbox} onChange={(e)=> setEmail(e.target.value)}/>
                    <p className={s.message}>Enter password:</p>
                    <input className={s.textbox} onChange={(e) => setPassword(e.target.value)}/>
                    <div></div>
                    <button className={s.fancybutton} onClick={handleLogin}>Login!</button>
                    <p className={s.errormessage}>{formError}</p>
                </div>
            )};
            {isLoggedIn && <Navigate to="/tasks" replace={true}/>}
        </div>
    );
};

export default Login;
