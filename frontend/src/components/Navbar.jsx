import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Tasty from "./tasty.png";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";
import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    setMenuOpen(false); // close menu on logout
  };

  const handleNavClick = () => {
    setMenuOpen(false); // close menu after clicking any nav link
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand fs-1 fst-bold" to="/">
            Tasty Track{" "}
            <img src={Tasty} alt="logo" style={{ width: "120px", height: "100px" }} />
          </Link>

          {/* Hamburger button */}
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNavAltMarkup"
            aria-expanded={menuOpen ? <GiHamburgerMenu />
 : <RxCross1 />}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible menu controlled by React */}
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                  onClick={handleNavClick}
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrderHistory"
                    onClick={handleNavClick}
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>

            {/* Right side buttons */}
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/login"
                  onClick={handleNavClick}
                >
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createUser"
                  onClick={handleNavClick}
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <>
                <div
                  className="btn bg-white text-success mx-3"
                  onClick={() => {
                    setCartView(true);
                    setMenuOpen(false);
                  }}
                >
                  My Cart{"  "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <div
                  className="btn bg-white text-danger mx-1"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
