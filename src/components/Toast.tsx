import React from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  return (
    <div
      className={`toast ${visible ? 'show' : ''}`}
      id="toast"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};
