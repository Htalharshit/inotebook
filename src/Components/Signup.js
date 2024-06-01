import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';

export default function Signup() {

    const context = useContext(alertContext);
    const {showAlert} = context;


    let navigate= useNavigate();
    const [credentials,setCredentials]= useState({name:"",email:"",password:"",cpassword:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password }),
        });
        const json = await response.json();
        console.log(json.authToken)
        localStorage.setItem('token',json.authToken);
        navigate("/");
        showAlert("Account Created Successfully","success");
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div>
                <h2 className='text-center my-3'>SignUp</h2>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name}  onChange={onChange} id="name" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"value={credentials.email}  onChange={onChange}  id="email" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} autoComplete='on' onChange={onChange} id="password" name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control"value={credentials.cpassword} autoComplete='on' onChange={onChange}  id="cpassword" name="cpassword" />
                </div>
                <button type="submit" className="btn btn-secondary">Create Account</button>
            </form>
        </div>
    )
}
