import React from 'react';
const Notification = ({ showNotification }) => {
    return (
        <div className={`notification-container ${showNotification ? 'show' : ''}`} style={{ display: showNotification ? 'block' : 'none' }}>
            <p>Du har redan angivit bokstaven</p>
        </div>
    );
};
export default Notification;
