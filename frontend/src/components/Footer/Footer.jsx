import React from "react";
import { Link } from "react-router-dom";
import instagram from "./instagram.png";
import LinkedIn from "./linkedin.png";
import email from "./email.png";
import github from "./github.png";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
   <footer className="text-white py-4 w-100 mt-3" style={{ background: 'linear-gradient(135deg, #343a40, #212529)' }}>
  <div className="container-fluid text-center">
    <span>© {new Date().getFullYear()} Tasty Track, All rights reserved</span>

    {/* Social Icons */}
    <div className="mt-2 d-flex justify-content-center">
      {[{src: instagram, alt: 'Instagram', link: 'https://www.instagram.com/amitkumar.6788/'},
        {src: LinkedIn, alt: 'LinkedIn', link: 'https://www.linkedin.com/in/amit-kumar-a5059624b/'},
        {src: email, alt: 'Email', link: 'mailto:amitk200703@gmail.com'},
        {src: github, alt: 'GitHub', link: 'https://github.com/amitk2003'}].map((icon, i) => (
          <a key={i} href={icon.link} target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={icon.src} alt={icon.alt} className="footer-icon" style={{ width: '40px', height: '40px' }} />
          </a>
        ))}
    </div>

    {/* Quick Links */}
    <div className="mt-3 d-flex justify-content-center gap-3 flex-wrap">
      <a href="/about" className="text-white text-decoration-none">About</a>
      <a href="/contact" className="text-white text-decoration-none">Contact</a>
      <a href="/faq" className="text-white text-decoration-none">FAQ</a>
      <a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a>
    </div>

    {/* Newsletter */}
    <div className="mt-3">
      <span>Subscribe to our newsletter:</span>
      <div className="d-flex justify-content-center mt-2 flex-wrap">
        <input type="email" placeholder="Enter your email" className="form-control w-50 me-2 mb-2" />
        <button className="btn btn-primary mb-2">Subscribe</button>
      </div>
    </div>
  </div>
</footer>

  );
}
