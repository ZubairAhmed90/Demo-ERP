import React, { useState } from 'react';
import { FaBell, FaSave, FaEnvelope, FaSms, FaCheckCircle } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const notificationTypes = [
  {
    id: 'approvals',
    name: 'Approval Requests',
    description: 'Notifications for documents requiring your approval',
    email: true,
    sms: false,
    inApp: true
  },
  {
    id: 'payments',
    name: 'Payments',
    description: 'Payment received, payment due, invoice overdue',
    email: true,
    sms: true,
    inApp: true
  },
  {
    id: 'inventory',
    name: 'Inventory Alerts',
    description: 'Low stock, stock movements, inventory updates',
    email: false,
    sms: false,
    inApp: true
  },
  {
    id: 'hr',
    name: 'HR Updates',
    description: 'Leave requests, attendance, payroll updates',
    email: true,
    sms: false,
    inApp: true
  },
  {
    id: 'sales',
    name: 'Sales Updates',
    description: 'New orders, order status changes, customer updates',
    email: true,
    sms: false,
    inApp: true
  },
  {
    id: 'purchase',
    name: 'Purchase Updates',
    description: 'Purchase orders, vendor updates, delivery status',
    email: false,
    sms: false,
    inApp: true
  },
  {
    id: 'system',
    name: 'System Notifications',
    description: 'System maintenance, updates, announcements',
    email: true,
    sms: false,
    inApp: true
  },
  {
    id: 'workflow',
    name: 'Workflow Updates',
    description: 'Workflow status, task assignments, completions',
    email: false,
    sms: false,
    inApp: true
  },
];

const Page = () => {
  const { primaryColor } = useColor();
  const [preferences, setPreferences] = useState(notificationTypes);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (id, type) => {
    setPreferences(prev => prev.map(pref => 
      pref.id === id ? { ...pref, [type]: !pref[type] } : pref
    ));
    setHasChanges(true);
    setIsSaved(false);
  };

  const handleSave = () => {
    // In real app, save to API
    console.log('Saving preferences:', preferences);
    setHasChanges(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setPreferences(notificationTypes);
    setHasChanges(false);
  };

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
                <h1 className="text-2xl font-bold text-gray-800">Notification Preferences</h1>
                <p className="text-gray-600">Configure how you receive notifications</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: primaryColor }}
              >
                <FaSave className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
          {isSaved && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <FaCheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Preferences saved successfully!</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Notification Channels</h2>
            <p className="text-sm text-gray-600">
              Choose how you want to receive notifications for each category
            </p>
          </div>

          <div className="space-y-4">
            {preferences.map((pref) => (
              <div
                key={pref.id}
                className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {pref.name}
                    </h3>
                    <p className="text-sm text-gray-600">{pref.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* In-App Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FaBell className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">In-App</p>
                        <p className="text-xs text-gray-500">Notification center</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.inApp}
                        onChange={() => handleToggle(pref.id, 'inApp')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Email Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <p className="text-xs text-gray-500">Email alerts</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.email}
                        onChange={() => handleToggle(pref.id, 'email')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* SMS Notifications */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FaSms className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">SMS</p>
                        <p className="text-xs text-gray-500">Text messages</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref.sms}
                        onChange={() => handleToggle(pref.id, 'sms')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Quiet Hours</p>
                <p className="text-xs text-gray-500">Disable notifications during specific hours</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Desktop Notifications</p>
                <p className="text-xs text-gray-500">Show browser notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;


