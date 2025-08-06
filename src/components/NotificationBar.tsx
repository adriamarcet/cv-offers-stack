import React, { useState, useEffect } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationBarProps {
  type: NotificationType;
  message: string;
  onClose?: () => void;
  isVisible: boolean;
}

export const NotificationBar: React.FC<NotificationBarProps> = ({
  type,
  message,
  onClose,
  isVisible
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible]);

  if (!isVisible && !isAnimating) return null;

  const getNotificationClasses = () => {
    const baseClass = 'mzp-c-notification-bar';
    const typeClass = `mzp-t-${type}`;
    return `${baseClass} ${typeClass}`;
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  const handleClose = () => {
    if (onClose) {
      // Start exit animation
      setIsAnimating(true);
      // Call onClose after animation
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  return (
    <aside 
      className={getNotificationClasses()} 
      role="status" 
      aria-live="polite"
      style={{
        animation: isVisible 
          ? 'notification-slide-in 0.3s ease-out forwards'
          : 'notification-slide-out 0.3s ease-out forwards'
      }}
    >
      <button 
        className="mzp-c-notification-bar-button" 
        type="button"
        onClick={handleClose}
        aria-label="Close notification"
        style={{
          position: 'absolute',
          right: '0',
          top: '0',
          width: '20px',
          height: '20px',
          background: 'url("/img/icons/close.svg") 50% / 20px 20px no-repeat',
          border: 'none',
          cursor: 'pointer',
          textIndent: '-9999px',
          overflow: 'hidden',
          padding: '0',
          margin: '8px'
        }}
      >
        Close notification
      </button>
      <p>
        <span style={{ marginRight: '8px' }}>{getIcon()}</span>
        {message}
      </p>
    </aside>
  );
}; 