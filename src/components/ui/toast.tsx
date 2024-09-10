import React from 'react';

interface ToastProps {
  title: string;
  description: string;
<<<<<<< HEAD
  variant?: 'default' | 'destructive'; // Add variant to the props
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, description, variant = 'default', onClose }) => {
  // Apply styles conditionally based on the variant
  const containerStyle = variant === 'destructive' ? styles.destructiveContainer : styles.container;

  return (
    <div style={containerStyle}>
=======
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, description, onClose }) => {
  return (
    <div style={styles.container}>
>>>>>>> 2b5d48454d962a6476a7748a906c41946472996b
      <div style={styles.header}>
        <strong>{title}</strong>
        {onClose && (
          <button
            onClick={onClose}
            style={styles.closeButton}
            aria-label="Close toast"
          >
            ✕
          </button>
        )}
      </div>
      <div style={styles.description}>{description}</div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed' as 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 24px',
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    maxWidth: '320px',
  },
<<<<<<< HEAD
  destructiveContainer: {
    position: 'fixed' as 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 24px',
    backgroundColor: '#d9534f', // Red background for destructive variant
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    maxWidth: '320px',
  },
=======
>>>>>>> 2b5d48454d962a6476a7748a906c41946472996b
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.5',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export { Toast };
