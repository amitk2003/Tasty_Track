import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="modal-container">
        <div className="modal-header">
          <h3>My Cart</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
