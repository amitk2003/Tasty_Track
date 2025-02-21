import React from "react";
import { Link } from "react-router-dom";
import instagram from "./instagram.png";
import LinkedIn from "./linkedin.png";
import email from "./email.png";
import github from "./github.png";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <div className="d-flex flex-column min-vh-100 align-items-center">
      <footer className="mt-auto py-3 border-top bg-light w-100">
        <div className="container text-center" style={{ Width: "4000px", margin: "0 auto" }}>
          <span className="text-muted">© {date} Tasty Track, All rights reserved</span>
          <div className="mt-2">
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
    </div>
  );
}
