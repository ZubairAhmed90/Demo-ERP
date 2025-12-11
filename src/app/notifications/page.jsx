import React, { useState } from 'react';
import { FaBell, FaFilter, FaCheck, FaTrash, FaEnvelope, FaExclamationCircle, FaInfoCircle, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';

const notifications = [
  {
    id: 1,
    type: 'approval',
    title: 'Purchase Order Approval Required',
    message: 'PO-2024-001 requires your approval. Amount: 50,000 SAR',
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
    message: 'Item ITEM-001 is below minimum stock level (Current: 5, Min: 10)',
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
  {
    id: 6,
    type: 'approval',
    title: 'Sales Order Approval Required',
    message: 'SO-2024-015 requires your approval',
    timestamp: '2024-01-20 09:30 AM',
    read: true,
    link: '/sales-order',
    priority: 'high'
  },
  {
    id: 7,
    type: 'info',
    title: 'New Employee Onboarded',
    message: 'Fatima Hassan has been added to the system',
    timestamp: '2024-01-19 04:15 PM',
    read: true,
    link: '/hr/employees',
    priority: 'low'
  },
  {
    id: 8,
    type: 'warning',
    title: 'Invoice Overdue',
    message: 'Invoice INV-2024-008 is overdue by 5 days',
    timestamp: '2024-01-19 10:00 AM',
    read: false,
    link: '/ar-invoice',
    priority: 'high'
  },
];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [notificationsList, setNotificationsList] = useState(notifications);

  const rowsPerPage = 10;

  const filteredNotifications = notificationsList.filter((notification) => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'read' && notification.read) ||
      (selectedStatus === 'unread' && !notification.read);
    return matchesSearch && matchesType && matchesStatus;
  });

  const paginatedNotifications = filteredNotifications.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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

  const markAsRead = (id) => {
    setNotificationsList(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;
  const totalCount = notificationsList.length;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaBell className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                <p className="text-gray-600">Manage and view all your notifications</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaCheck className="w-4 h-4" />
                <span>Mark All as Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
              </div>
              <FaBell className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
              </div>
              <FaEnvelope className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-2xl font-bold text-green-600">{totalCount - unreadCount}</p>
              </div>
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approvals Pending</p>
                <p className="text-2xl font-bold text-red-600">
                  {notificationsList.filter(n => n.type === 'approval' && !n.read).length}
                </p>
              </div>
              <FaExclamationCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="approval">Approval</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {paginatedNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <FaBell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {paginatedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className={`text-base font-semibold ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <FaClock className="w-3 h-3" />
                              <span>{notification.timestamp}</span>
                            </div>
                            {notification.priority && (
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                                notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {notification.priority} priority
                              </span>
                            )}
                          </div>
                          {notification.link && (
                            <button
                              onClick={() => {
                                markAsRead(notification.id);
                                window.location.href = notification.link;
                              }}
                              className="mt-3 text-sm font-medium transition-colors"
                              style={{ color: primaryColor }}
                            >
                              View Details →
                            </button>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                              title="Mark as read"
                            >
                              <FaCheck className="w-4 h-4 text-gray-500" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4 text-gray-500 hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredNotifications.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredNotifications.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;


