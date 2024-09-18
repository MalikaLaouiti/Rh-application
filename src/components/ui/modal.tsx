"use client"
import React from 'react';
import "./../../app/globals.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="text-right mb-4">
          <div onClick={onClose} className="cursor-pointer">
            ✖
          </div>
        </div>
        {children}
      </div>
    </div>

  );
};

export default Modal;
