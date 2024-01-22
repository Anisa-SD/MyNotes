import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const[credentials,setCredentials]=useState({name:"",email:"",password:"",confirmpassword:""})
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      //Save the authtoken and redirect
      localStorage.setItem("token",json.authToken);
      navigate("/");
      props.showAlert("user created Successfully!","success");
    }
    else{
      props.showAlert("Invalid Details","danger");
    }
  }
  const onchange=(e)=>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container mt-2'> 
    <h2>Signup to use MyNotes</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Username</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="Username"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onchange}  aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={5} required />
  </div>
  <div className="mb-3">
    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="confirmpassword" name='confirmpassword' onChange={onchange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link className='link mx-1' to="/login">Already a User?</Link>
</form>
    </div>
  )
}

export default Signup
