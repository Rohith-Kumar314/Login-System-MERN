import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { handleError, handleSuccess } from '../utils';


export default function Login() {
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const { email, password } = LoginInfo;

    if (!email || !password) {
      return handleError("email, and password are required");
    }

    try {
      const url = "https://login-system-mern-hw04.onrender.com/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
      });

      const result = await response.json();
      console.log(result);
      const { success, message,jwtToken,name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
       

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your Mail Id"
            onChange={handleChange}
            value={LoginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={LoginInfo.password}
          />
        </div>

        <button>Log in</button>

        <span>
          Don't Have an Account ?<Link to="/signup">Sign Up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
