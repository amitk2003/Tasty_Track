import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const login_url = process.env.REACT_APP_LOGIN || 'http://localhost:5000/api/LoginUser';
export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // Moved state outside

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // handlesubmit function used for link to be active
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(login_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                })
            });

            const result = await response.json();
            console.log(result);

            if (!result.success) {
                alert('Enter valid credentials');
            }
            if (result.success) {
                // save token on localstorage
                localStorage.setItem("UserEmail",credentials.email);
                console.log(localStorage.getItem("UserEmail"));
                localStorage.setItem("authToken",result.authToken)
                console.log(localStorage.getItem("authToken"));
                navigate("/");
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
        <div className="container">
            <form onSubmit={handleSubmit}>
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
                            style={{ marginLeft: '10px' }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button type="submit" className="m-3 btn btn-success">Submit</button>
                {/* link help to redirect user to link creatuser */}
                <Link to='/createUser' className='m-3 btn btn-danger'>I'm a new user</Link>
            </form>
        </div>
    );
}
