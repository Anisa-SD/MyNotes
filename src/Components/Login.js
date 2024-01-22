import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';

const Login = (props) => {
  const[credentials,setCredentials]=useState({email:"",password:""})
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({email:credentials.email, password:credentials.password})
    });
    const json = await response.json();

    if(json.success){
      //Save the authtoken and redirect
      localStorage.setItem('token',json.authToken);
      navigate("/");
      props.showAlert("Loggedin successfully","success");
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  }
  const onchange=(e)=>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container mt-2'>
      <h2>Login to continue to MyNotes</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp" />
          </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className='link mx-2' to="/signup">Create a New Account</Link>
      </form>
    </div>
  )
}

export default Login
