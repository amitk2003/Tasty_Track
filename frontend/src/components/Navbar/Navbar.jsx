import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import "./Navbar.css";
import Tasty from "./tasty.png";
import Modal from "../../Modal";
import Cart from "../../pages/Cart";
import { useCart } from "../context/ContextReducer";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="tt-navbar">
        <div className="tt-container">
          {/* Brand */}
          <Link to="/" className="tt-brand">
            <img src={Tasty} alt="logo" />
            <span>Tasty Track</span>
          </Link>

          {/* Desktop Menu */}
          <div className="tt-links">
            <Link to="/">Home</Link>
            {isAuth && <Link to="/myOrderHistory">My Orders</Link>}
          </div>

          {/* Right Actions */}
          <div className="tt-actions">
            {!isAuth ? (
              <>
                <Link to="/login" className="btn-outline">Login</Link>
                <Link to="/createUser" className="btn-primary">Sign Up</Link>
              </>
            ) : (
              <>
                <button
                  className="btn-outline"
                  onClick={() => setCartView(true)}
                >
                  Cart <Badge bg="danger">{data.length}</Badge>
                </button>
                <button className="btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="tt-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <RxCross1 /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="tt-mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          {isAuth && (
            <Link to="/myOrderHistory" onClick={() => setMenuOpen(false)}>
              My Orders
            </Link>
          )}

          {!isAuth ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/createUser" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <>
              <button onClick={() => { setCartView(true); setMenuOpen(false); }}>
                Cart ({data.length})
              </button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      )}

      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
    </>
  );
}
