import React, { useState } from 'react';
import "./screen.css";
import { Link } from "react-router-dom";
const signup_url = process.env.REACT_APP_SIGNUP;
export default function Signup() {
    let [credentials, setCredentials] = useState({ name: "", email: "", password: "", Geolocation: "" });
    const [showPassword, setShowPassword] = useState(false); // Moved state outside

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const HandleSubmit = async (x) => {
        x.preventDefault();
        try {
            const response = await fetch(signup_url, {
                method: 'POST',
                headers: {  // <-- 'headers' should be plural
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    Geolocation: credentials.Geolocation
                })
            });
    
            const x1 = await response.json();
            console.log(x1);
    
            if (!x1.success) {
                alert('Enter valid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch. Please check if the server is running.');
        }
    };
    

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <>
            <div className="container">
                <form onSubmit={HandleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name" // <-- Added name attribute
                            className="form-control"
                            placeholder="Enter your UserName"
                            value={credentials.name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            name="email" // <-- Added name attribute
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={credentials.email}
                            onChange={onChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <div style={{display:'flex',alignItems:'center'}}>
                        <input
                            type={showPassword ?"text":"password"}
                            name="password" // <-- Added name attribute
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={onChange}
                        />
                        <button
                        type='button' onClick={togglePasswordVisibility} style={{marginLeft:"15px"}}
                        >
                            {showPassword ?"Hide":"Show"}
                            
                        </button>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputAddress1">Address</label>
                        <input
                            type="text"
                            name="Geolocation" // <-- Added name attribute
                            className="form-control"
                            placeholder="Residence"
                            value={credentials.Geolocation}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
                </form>
            </div>
        </>
    );
}
