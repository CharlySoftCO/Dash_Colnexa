import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  show?: boolean;
}

const notificationStyles = {
  success: {
    background: '#f0fdf4',
    border: '#bbf7d0',
    color: '#166534',
    icon: CheckCircle
  },
  error: {
    background: '#fef2f2',
    border: '#fecaca',
    color: '#dc2626',
    icon: AlertCircle
  },
  warning: {
    background: '#fffbeb',
    border: '#fed7aa',
    color: '#d97706',
    icon: AlertTriangle
  },
  info: {
    background: '#eff6ff',
    border: '#bfdbfe',
    color: '#2563eb',
    icon: Info
  }
};

export default function Notification({ 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose,
  show = true 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(show);
  const [isExiting, setIsExiting] = useState(false);

  const style = notificationStyles[type];
  const IconComponent = style.icon;

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (duration > 0 && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        background: style.background,
        border: `1px solid ${style.border}`,
        borderRadius: 12,
        padding: '16px 20px',
        minWidth: 300,
        maxWidth: 400,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12
      }}
    >
      <IconComponent 
        size={20} 
        color={style.color}
        style={{ flexShrink: 0, marginTop: 2 }}
      />
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ 
          margin: '0 0 4px 0', 
          fontSize: 14, 
          fontWeight: 600, 
          color: style.color 
        }}>
          {title}
        </h4>
        {message && (
          <p style={{ 
            margin: 0, 
            fontSize: 13, 
            color: '#64748b',
            lineHeight: 1.4
          }}>
            {message}
          </p>
        )}
      </div>

      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          color: style.color,
          cursor: 'pointer',
          padding: 4,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>
    </div>
  );
}

// Hook para manejar notificaciones
export function useNotification() {
  const [notifications, setNotifications] = useState<Array<NotificationProps & { id: string }>>([]);

  const addNotification = (notification: Omit<NotificationProps, 'show'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id, show: true };
    
    setNotifications(prev => [...prev, newNotification]);
    
    return id;
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showSuccess = (title: string, message?: string) => 
    addNotification({ type: 'success', title, message });

  const showError = (title: string, message?: string) => 
    addNotification({ type: 'error', title, message });

  const showWarning = (title: string, message?: string) => 
    addNotification({ type: 'warning', title, message });

  const showInfo = (title: string, message?: string) => 
    addNotification({ type: 'info', title, message });

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}

// Componente contenedor de notificaciones
export function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  );
} 