import React from 'react';
import '../styles/CustomPopup.css'; // Add your CSS file for the popup styling

const CustomPopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-popup-overlay">
      <div className="custom-popup">
        {children}
      </div>
    </div>
  );
};

export default CustomPopup;
