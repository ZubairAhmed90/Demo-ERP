import React, { useState } from 'react';
import { FaBell, FaPlus, FaSearch, FaEdit, FaTrash, FaCheck, FaClock, FaCalendarAlt, FaExclamationCircle, FaRedo } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';

const reminders = [
  {
    id: 1,
    title: 'Approve Purchase Order PO-2024-001',
    description: 'Purchase order requires approval before processing',
    entityType: 'Purchase Order',
    entityId: 'PO-2024-001',
    reminderDate: '2024-01-23',
    reminderTime: '09:00 AM',
    dueDate: '2024-01-25',
    priority: 'High',
    status: 'Active',
    repeat: 'None',
    createdAt: '2024-01-22 10:00 AM',
    completedAt: null,
    tags: ['approval', 'urgent']
  },
  {
    id: 2,
    title: 'Follow up with Customer ABC',
    description: 'Follow up on sales quotation sent last week',
    entityType: 'Customer',
    entityId: 'CUST-001',
    reminderDate: '2024-01-24',
    reminderTime: '02:00 PM',
    dueDate: '2024-01-24',
    priority: 'Medium',
    status: 'Active',
    repeat: 'None',
    createdAt: '2024-01-21 03:00 PM',
    completedAt: null,
    tags: ['customer', 'follow-up']
  },
  {
    id: 3,
    title: 'Process Monthly Payroll',
    description: 'Calculate and process payroll for all employees',
    entityType: 'Payroll',
    entityId: 'PAY-2024-01',
    reminderDate: '2024-01-28',
    reminderTime: '09:00 AM',
    dueDate: '2024-01-28',
    priority: 'High',
    status: 'Active',
    repeat: 'Monthly',
    createdAt: '2024-01-20 09:00 AM',
    completedAt: null,
    tags: ['payroll', 'monthly']
  },
  {
    id: 4,
    title: 'Reconcile Bank Account',
    description: 'Reconcile bank account statements for December',
    entityType: 'Banking',
    entityId: 'BANK-001',
    reminderDate: '2024-01-24',
    reminderTime: '10:00 AM',
    dueDate: '2024-01-24',
    priority: 'Medium',
    status: 'Completed',
    repeat: 'None',
    createdAt: '2024-01-19 11:00 AM',
    completedAt: '2024-01-22 03:00 PM',
    tags: ['banking', 'reconciliation']
  },
  {
    id: 5,
    title: 'Team Meeting Reminder',
    description: 'Monthly team meeting to discuss progress',
    entityType: 'Calendar',
    entityId: 'EVENT-001',
    reminderDate: '2024-01-25',
    reminderTime: '09:30 AM',
    dueDate: '2024-01-25',
    priority: 'Low',
    status: 'Active',
    repeat: 'Monthly',
    createdAt: '2024-01-18 10:00 AM',
    completedAt: null,
    tags: ['meeting', 'team']
  },
  {
    id: 6,
    title: 'Submit Monthly Report',
    description: 'Submit monthly sales report to management',
    entityType: 'Report',
    entityId: 'RPT-2024-01',
    reminderDate: '2024-01-26',
    reminderTime: '05:00 PM',
    dueDate: '2024-01-26',
    priority: 'High',
    status: 'Active',
    repeat: 'Monthly',
    createdAt: '2024-01-17 09:00 AM',
    completedAt: null,
    tags: ['reporting', 'monthly']
  },
];

const statuses = ['All Status', 'Active', 'Completed', 'Cancelled'];
const priorities = ['All Priorities', 'High', 'Medium', 'Low'];
const repeatOptions = ['None', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
const entityTypes = ['All Types', 'Purchase Order', 'Sales Order', 'Customer', 'Vendor', 'Payroll', 'Banking', 'Calendar', 'Report', 'Task'];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedDate, setSelectedDate] = useState('');
  const [page, setPage] = useState(1);
  const [remindersList, setRemindersList] = useState(reminders);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const rowsPerPage = 10;

  const filteredReminders = remindersList.filter((reminder) => {
    const matchesSearch = 
      reminder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || reminder.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All Priorities' || reminder.priority === selectedPriority;
    const matchesDate = !selectedDate || reminder.reminderDate === selectedDate;
    return matchesSearch && matchesStatus && matchesPriority && matchesDate;
  });

  const paginatedReminders = filteredReminders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (reminder) => {
    if (reminder.status === 'Completed') return false;
    const today = new Date();
    const dueDate = new Date(reminder.dueDate);
    return dueDate < today;
  };

  const toggleReminderStatus = (id) => {
    setRemindersList(prev => prev.map(reminder => {
      if (reminder.id === id) {
        if (reminder.status === 'Completed') {
          return { ...reminder, status: 'Active', completedAt: null };
        } else {
          return { ...reminder, status: 'Completed', completedAt: new Date().toLocaleString() };
        }
      }
      return reminder;
    }));
  };

  const deleteReminder = (id) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      setRemindersList(prev => prev.filter(reminder => reminder.id !== id));
    }
  };

  const activeCount = remindersList.filter(r => r.status === 'Active').length;
  const completedCount = remindersList.filter(r => r.status === 'Completed').length;
  const overdueCount = remindersList.filter(r => isOverdue(r)).length;
  const todayCount = remindersList.filter(r => {
    const today = new Date().toISOString().split('T')[0];
    return r.reminderDate === today && r.status === 'Active';
  }).length;

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
                <h1 className="text-2xl font-bold text-gray-800">Reminders</h1>
                <p className="text-gray-600">Set and manage reminders for tasks and deadlines</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Create Reminder</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Reminders</p>
                <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
              </div>
              <FaBell className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Reminders</p>
                <p className="text-2xl font-bold text-green-600">{todayCount}</p>
              </div>
              <FaCalendarAlt className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
              </div>
              <FaExclamationCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
              </div>
              <FaCheck className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reminders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-40">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-40">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-48">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Filter by date"
              />
            </div>
          </div>
        </div>

        {/* Reminders List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reminder</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Entity</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reminder Date/Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Repeat</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedReminders.map((reminder) => (
                  <tr 
                    key={reminder.id} 
                    className={`hover:bg-gray-50 ${
                      isOverdue(reminder) ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">{reminder.title}</p>
                          {isOverdue(reminder) && (
                            <FaExclamationCircle className="w-4 h-4 text-red-600" title="Overdue" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{reminder.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {reminder.tags.map(tag => (
                            <span key={tag} className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-gray-900">{reminder.entityType}</p>
                        <p className="text-xs text-gray-500">{reminder.entityId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <FaClock className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">{reminder.reminderDate}</p>
                          <p className="text-xs text-gray-500">{reminder.reminderTime}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${
                          isOverdue(reminder) ? 'font-semibold text-red-600' : 'text-gray-900'
                        }`}>
                          {reminder.dueDate}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(reminder.priority)}`}>
                        {reminder.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {reminder.repeat !== 'None' && (
                          <FaRedo className="w-3 h-3 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-900">{reminder.repeat}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reminder.status)}`}>
                        {reminder.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleReminderStatus(reminder.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            reminder.status === 'Completed'
                              ? 'hover:bg-yellow-100 text-yellow-600'
                              : 'hover:bg-green-100 text-green-600'
                          }`}
                          title={reminder.status === 'Completed' ? 'Mark as Active' : 'Mark as Completed'}
                        >
                          <FaCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            // Edit reminder
                            alert('Edit reminder feature - to be implemented');
                          }}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredReminders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <FaBell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new reminder</p>
          </div>
        )}

        {filteredReminders.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredReminders.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}

        {/* Create Reminder Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Create New Reminder</h2>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reminder title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reminder description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {entityTypes.filter(t => t !== 'All Types').map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entity ID</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter entity ID"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Repeat</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {repeatOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., approval, urgent, customer"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Create reminder logic here
                    setIsCreateModalOpen(false);
                  }}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  Create Reminder
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;

