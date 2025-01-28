import s from "./login.module.css";
import logo from '../TaskManager.png';
import { useState } from "react";

const Register = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const[userName, setName] = useState("");
    const[userEmail, setEmail] = useState("");
    const[userPassword, setPassword] = useState("");
    const[formError, setFormError] = useState("");

    const handleRegister = async () => {
        if(!userName || !userEmail || !userPassword){
            console.log("Error block");
            setFormError("Enter all required fields");
        }
        else{
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userName, userEmail, userPassword})
            };
            console.log("Request",requestOptions);
            const response = await fetch('http://127.0.0.1:3000/users/register', requestOptions);
            if(response.status === 200){
                setIsRegistered(true);
            }
            else if(response.status === 409){
                setFormError("User already exists. Please login!");
            }
            else{
                setFormError("An error occured. Please try again!")
            }
        }
    };

    return (
        <div>
            <h2 className={s.h2}>Welcome to the Task Manager Application!</h2> 
            <img src={logo} className="App-logo" alt="logo" />
                <div className={s.logincontainer}>
                    <p className={s.message}>Register as new user!</p>
                    <p className={s.message}>Enter Fullname:</p>
                    <input className={s.textbox} onChange={(e)=> setName(e.target.value)}/>
                    <p className={s.message}>Enter email:</p>
                    <input className={s.textbox} onChange={(e)=> setEmail(e.target.value)}/>
                    <p className={s.message}>Enter password:</p>
                    <input className={s.textbox} onChange={(e) => setPassword(e.target.value)}/>
                    <div></div>
                    <button className={s.fancybutton} onClick={handleRegister}>Register!</button>
                    <p className={s.errormessage}>{formError}</p>
                    {isRegistered && <div className={s.message}>
                        User Registered Successfully!
                        <a href="/" className={s.message}> Please login and start adding tasks! </a>
                    </div>}
                </div>
        </div>
    );
};

export default Register;

