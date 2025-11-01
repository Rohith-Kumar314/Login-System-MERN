import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { handleError, handleSuccess } from '../utils';
export default function Signup(){
    const [signUpInfo, setsignUpInfo] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;
        const copysignUpInfo = {...signUpInfo}
        copysignUpInfo[name] = value;
        setsignUpInfo(copysignUpInfo);
    }

    const handleSubmit = async (ev) =>{
        ev.preventDefault();

        const {name,email,password} = signUpInfo;

        if(!name || !email || !password){
            return handleError("Name, email, and password are required");
        }

        try{
            const url = "https://login-system-mern-hw04.onrender.com/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signUpInfo)
            });

            const result = await response.json();
            console.log(result);
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if (!success){
                handleError(message);
            }

        }catch(err){
            handleError(err);
        }
    }
    return (
        <div className="container">
            <h1>Sign UP</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter your name"
                        onChange={handleChange}
                        value={signUpInfo.name}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Enter your Mail Id"
                        onChange={handleChange}
                        value={signUpInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        value={signUpInfo.password}
                    />
                </div>

                <button>Sign Up</button>

                <span>Already Have an Account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}
