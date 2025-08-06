import React, { useState } from 'react';
import { NotificationBar, type NotificationType } from './NotificationBar';

export const NotificationTest: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<NotificationType>('success');

  const handleShowNotification = (type: NotificationType) => {
    setNotificationType(type);
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    console.log('Notification closed manually!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Notification X Button Test</h1>
      <p>This test verifies that the X button is visible and functional.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => handleShowNotification('success')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#008000', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Test Success Notification
        </button>
        
        <button 
          onClick={() => handleShowNotification('error')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#d70022', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Test Error Notification
        </button>
        
        <button 
          onClick={() => handleShowNotification('warning')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#ff9400', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer'
          }}
        >
          Test Warning Notification
        </button>
      </div>

      <NotificationBar
        type={notificationType}
        message={`This is a ${notificationType} notification. Look for the X button in the top-right corner!`}
        isVisible={showNotification}
        onClose={handleCloseNotification}
      />

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e8f4fd', 
        border: '1px solid #0060df',
        borderRadius: '4px'
      }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Click any test button above</li>
          <li>Look for the notification that appears</li>
          <li>Find the X button in the top-right corner of the notification</li>
          <li>Click the X button to close the notification</li>
          <li>Check the browser console for confirmation</li>
        </ol>
        
        <p><strong>Note:</strong> The X button should be visible as a small icon in the top-right corner of each notification.</p>
      </div>
    </div>
  );
}; 