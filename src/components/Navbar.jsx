import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
    let data=useCart();
    const [cartview,setCartView]=useState(false);
    const navigate=useNavigate();
    const HandleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
    }
return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-bold" to="/">
            Tasty Track
        </Link>
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
            </Link>
                </li>
            
            {(localStorage.getItem("authToken")) ?
            <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page" to="/myOrderHistory">
            My Orders
        </Link>
        </li>
        :""
            }
            </ul>
            {(!localStorage.getItem("authToken"))?
            <div className="d-flex" style={{right:'-100px'}}>
            <Link className="btn bg-white text-success mx-1" to="/login">
                Login
            </Link>
            <Link className="btn bg-white text-success mx-1" to="/createUser">
                SignUp
            </Link>
            </div>
            :<>
            <div className="btn bg-white text-success mx-3" onClick={()=>setCartView(true)}>My Cart{"  "}
                <Badge pill bg="danger">{data.length}</Badge>

            </div>
            {cartview ?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null }
            <div className="btn bg-white text-danger mx-1" onClick={HandleLogout} >Logout
            </div>
            </>   }
        </div>
        </div>
    </nav>
    </div>
);
}
