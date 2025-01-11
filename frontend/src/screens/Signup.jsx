import React, { useState } from 'react';
import "./screen.css";
import { Link } from "react-router-dom";

const signup_url = 'https://tasty-track-lyea.vercel.app/api/createUser';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", Geolocation: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isValid = () => {
        if (!credentials.name || credentials.name.length < 5) {
            alert('Name must be at least 5 characters long.');
            return false;
        }
        if (!credentials.email.includes('@')) {
            alert('Please enter a valid email address.');
            return false;
        }
        if (credentials.password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return false;
        }
        return true;
    };

    const HandleSubmit = async (x) => {
        x.preventDefault();
        if (!isValid()) return;

        setIsLoading(true);
        try {
            const response = await fetch(signup_url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const x1 = await response.json();
            console.log('Response Status:', response.status);
            console.log('Response Body:', x1);

            setIsLoading(false);

            if (response.ok && x1.success) {
                alert('Account created successfully!');
            } else {
                const errorMsg = x1.errors ? x1.errors.map(err => err.msg).join(', ') : 'Enter valid credentials';
                alert(errorMsg);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
            alert('Failed to fetch. Please check if the server is running.');
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className="container">
            <form onSubmit={HandleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
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
                        name="email"
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={onChange}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{ marginLeft: "15px" }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAddress1">Address</label>
                    <input
                        type="text"
                        name="Geolocation"
                        className="form-control"
                        placeholder="Residence"
                        value={credentials.Geolocation}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="m-3 btn btn-success" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
    );
}
