import React from 'react';
import ReactDOM from 'react-dom'; // Correct capitalization

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-30%, -80%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  padding: '20px',
  borderRadius: '10px',
  color: '#fff',
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 100,
};

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button
          className="btn bg-danger fs-4"
          style={{ float: 'right' }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
