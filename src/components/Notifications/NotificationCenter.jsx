import React, { useState, useEffect } from 'react';
import { FaBell, FaCheck, FaTimes, FaEnvelope, FaExclamationCircle, FaInfoCircle, FaCheckCircle, FaClock, FaTrash } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';

const NotificationCenter = () => {
  const { primaryColor } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'approval',
      title: 'Purchase Order Approval Required',
      message: 'PO-2024-001 requires your approval',
      timestamp: '2024-01-22 10:30 AM',
      read: false,
      link: '/purchase-order',
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Leave Request',
      message: 'Ahmed Ali submitted a leave request for Jan 25-27',
      timestamp: '2024-01-22 09:15 AM',
      read: false,
      link: '/hr/leave-management',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of 15,000 SAR received from Customer ABC',
      timestamp: '2024-01-21 03:45 PM',
      read: true,
      link: '/ar-invoice',
      priority: 'low'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Item ITEM-001 is below minimum stock level',
      timestamp: '2024-01-21 02:20 PM',
      read: false,
      link: '/inventory/stock-levels',
      priority: 'high'
    },
    {
      id: 5,
      type: 'announcement',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on Jan 25, 2024 from 2 AM to 4 AM',
      timestamp: '2024-01-20 11:00 AM',
      read: true,
      link: null,
      priority: 'medium'
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'approval': return <FaExclamationCircle className="w-5 h-5 text-orange-500" />;
      case 'info': return <FaInfoCircle className="w-5 h-5 text-blue-500" />;
      case 'success': return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <FaExclamationCircle className="w-5 h-5 text-yellow-500" />;
      case 'announcement': return <FaBell className="w-5 h-5 text-purple-500" />;
      default: return <FaInfoCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'approval': return 'bg-orange-50 border-orange-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'announcement': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
        title="Notifications"
      >
        <FaBell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full"
            style={{ backgroundColor: primaryColor }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <FaBell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${
                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <FaClock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {notification.timestamp}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1 rounded hover:bg-gray-200"
                                  title="Mark as read"
                                >
                                  <FaCheck className="w-3 h-3 text-gray-500" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 rounded hover:bg-red-100"
                                title="Delete"
                              >
                                <FaTrash className="w-3 h-3 text-gray-500 hover:text-red-600" />
                              </button>
                            </div>
                          </div>
                          {notification.link && (
                            <button
                              onClick={() => {
                                markAsRead(notification.id);
                                window.location.href = notification.link;
                              }}
                              className="mt-2 text-xs font-medium transition-colors"
                              style={{ color: primaryColor }}
                            >
                              View Details →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/notifications';
                  }}
                  className="w-full text-sm font-medium text-center transition-colors"
                  style={{ color: primaryColor }}
                >
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;

