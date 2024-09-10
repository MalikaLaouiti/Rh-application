<<<<<<< HEAD
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
=======
<<<<<<< HEAD
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
=======
<<<<<<< HEAD
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
=======
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
>>>>>>> 2b5d48454d962a6476a7748a906c41946472996b
>>>>>>> cd6acd6fb7d767633ef9e8e287873c4788be9055
>>>>>>> 8c26baf2ff1d0b59f026b491899cb614717985dd
