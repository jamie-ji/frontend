import React from 'react';
import '../css/Notification.css'
const Notification = ({ isProcessing }) => {
  if (!isProcessing) return null;

  return (
    <div className="notification">
      Processing.....
    </div>
  );
};

export default Notification;