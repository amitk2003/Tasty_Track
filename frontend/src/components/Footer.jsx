import React from "react";
import { Link } from "react-router-dom";
import instagram from "./instagram.png";
import LinkedIn from "./linkedin.png";
import email from "./email.png";
import github from "./github.png";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-3 w-100 position-absolute mt-3">
      <div className="container-fluid text-center">  {/* Use container-fluid instead of container */}
        <span>© {date} Tasty Track, All rights reserved</span>
        <div className="mt-2 d-flex justify-content-center">
          <Link to="https://www.instagram.com/amitkumar.6788/" className="mx-2">
            <img src={instagram} alt="Instagram" style={{ width: "40px", height: "40px" }} />
          </Link>
          <Link to="https://www.linkedin.com/in/amit-kumar-a5059624b/" className="mx-2">
            <img src={LinkedIn} alt="LinkedIn" style={{ width: "40px", height: "40px" }} />
          </Link>
          <Link to="mailto:amitk200703@gmail.com" className="mx-2">
            <img src={email} alt="Email" style={{ width: "40px", height: "40px" }} />
          </Link>
          <Link to="https://github.com/amitk2003" className="mx-2">
            <img src={github} alt="GitHub" style={{ width: "40px", height: "40px" }} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
