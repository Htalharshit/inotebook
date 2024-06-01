import React, {  useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import alertContext from '../context/alert/alertContext';


export default function Login() {

    const context = useContext(alertContext);
    const {showAlert} = context;


    let navigate= useNavigate();
    const [credentials,setCredentials]= useState({email:"",password:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({ email:credentials.email, password:credentials.password }),
        });
        const json = await response.json();
        console.log(json.authToken)
        localStorage.setItem('token',json.authToken);
        showAlert("Logged in Successfully","success");
        navigate("/");
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <div>
                    <h2 className='text-center my-3'>Login</h2>
                </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} autoComplete='on' className="form-control" id="password" name="password" required/>
                </div>
                <button type="submit" className="btn btn-secondary">Login</button>
            </form>
        </div>
    )
}
