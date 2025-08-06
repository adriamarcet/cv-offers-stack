import React, { useState } from 'react';
import { NotificationBar, type NotificationType } from './NotificationBar';

export const NotificationDemo: React.FC = () => {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
    isVisible: boolean;
  }>({
    type: 'info',
    message: '',
    isVisible: false
  });

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({
      type,
      message,
      isVisible: true
    });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Mozilla Protocol Notification Bar Demo</h1>
      <p>Click the buttons below to see different notification types:</p>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button 
          onClick={() => showNotification('success', 'Data synced successfully!')}
          style={{ padding: '10px 20px', backgroundColor: '#008000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Success Notification
        </button>
        
        <button 
          onClick={() => showNotification('error', 'Sync failed - data saved locally')}
          style={{ padding: '10px 20px', backgroundColor: '#d70022', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Error Notification
        </button>
        
        <button 
          onClick={() => showNotification('warning', 'Update failed - changes saved locally')}
          style={{ padding: '10px 20px', backgroundColor: '#ff9400', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Warning Notification
        </button>
        
        <button 
          onClick={() => showNotification('info', 'Information message')}
          style={{ padding: '10px 20px', backgroundColor: '#0060df', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Info Notification
        </button>
      </div>

      <NotificationBar
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={handleCloseNotification}
      />

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9fa', borderRadius: '8px' }}>
        <h2>Notification Variants</h2>
        <ul>
          <li><strong>Success:</strong> Green background with checkmark icon - for successful operations</li>
          <li><strong>Error:</strong> Red background with X icon - for error states</li>
          <li><strong>Warning:</strong> Orange background with warning icon - for warnings</li>
          <li><strong>Info:</strong> Blue background with info icon - for informational messages</li>
        </ul>
        
        <h3>Features:</h3>
        <ul>
          <li>Auto-dismiss after 3-5 seconds</li>
          <li><strong>Manual close button (X) - Click the X button to close notifications</strong></li>
          <li>Accessible with proper ARIA labels</li>
          <li>Responsive design</li>
          <li>Mozilla Protocol styling</li>
        </ul>
        
        <h3>Testing Instructions:</h3>
        <ol>
          <li>Click any notification button above</li>
          <li>Look for the X button in the top-right corner of the notification</li>
          <li>Click the X button to manually close the notification</li>
          <li>Or wait for the auto-dismiss (3 seconds)</li>
        </ol>
      </div>
    </div>
  );
}; 