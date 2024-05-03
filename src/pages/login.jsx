  import React, { useState } from "react";
  import "../assets/css/main.scss";
  import { Link, useNavigate } from "react-router-dom";
  import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


  const Login=()=>{

    const [err, setErr]= useState(false);
    const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    

  try{
        await signInWithEmailAndPassword(auth, email,password)
        navigate("/")
        setTimeout(() => {
          alert('Login successfull !!');
        }, 500);
        
  }  
  catch(err){
  
  console.error("Registration Error:", err.message);
  setErr(true)
  } 
  }

      return(
            <>
            <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat App</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <input required type="email" placeholder="Email" name="email"/>
            <input required type="password" placeholder="Password" name="pass" />
            <button>Login</button>
            {err && <span>something wrong</span>}
            </form>
            <p>
            Don't have an account? <Link to ='/register'>Register</Link> 
          </p>
            </div>
            </div>
            </>
      )
  }

    export default Login;