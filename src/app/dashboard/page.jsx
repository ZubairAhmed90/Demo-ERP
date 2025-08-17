import React from 'react';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Cards from '../../components/cards/dashboard/cards.jsx';

export default function Page() {
  const { primaryColor, secondaryColor } = useColor();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Dashboard Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium text-gray-700">Just now</p>
              </div>
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: primaryColor }}
              />
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Cards 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
            label="Open AP Invoices" 
            count="38" 
            value="150M" 
            currency="SAR"
            type="invoice"
            trend="up"
            trendValue="8.2%"
          />
          <Cards 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
            label="Open Goods Receipt PO" 
            count="42" 
            value="180M" 
            currency="SAR"
            type="purchase"
            trend="up"
            trendValue="12.5%"
          />
          <Cards 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
            label="Open Purchase Orders" 
            count="25" 
            value="95M" 
            currency="SAR"
            type="purchase"
            trend="down"
            trendValue="3.1%"
          />
          <Cards 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
            label="Total Account Payables" 
            count="156" 
            value="425M" 
            currency="SAR"
            type="credit"
            trend="up"
            trendValue="15.7%"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <Cards 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
            label="Open Sales Orders" 
            count="67" 
            value="320M" 
            currency="SAR"
            type="sales"
            trend="up"
            trendValue="22.3%"
          />
          <Cards 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
            label="Inventory Items" 
            count="1,234" 
            value="890M" 
            currency="SAR"
            type="inventory"
            trend="up"
            trendValue="5.8%"
          />
          <Cards 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
            label="Active Users" 
            count="89" 
            value="-" 
            currency=""
            type="users"
            trend="up"
            trendValue="2.1%"
          />
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-8 border-gray-100 flex items-center justify-center mb-4" style={{ borderColor: `${primaryColor}20` }}>
                  <div className="w-16 h-16 rounded-full" style={{ backgroundColor: primaryColor }} />
                </div>
                <p className="text-sm text-gray-500">Chart visualization</p>
                <p className="text-lg font-semibold text-gray-700 mt-2">Revenue: 2.4M SAR</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-green-500 text-sm">↗ +18.5%</span>
                  <span className="text-gray-400 text-xs">vs last month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {[
                { action: "New Purchase Order", company: "ABC Corp", time: "2 min ago", type: "purchase", status: "pending" },
                { action: "Invoice Generated", company: "XYZ Ltd", time: "15 min ago", type: "invoice", status: "completed" },
                { action: "Goods Received", company: "DEF Inc", time: "1 hour ago", type: "inventory", status: "completed" },
                { action: "Sales Order Created", company: "GHI Co", time: "2 hours ago", type: "sales", status: "pending" },
                { action: "Payment Received", company: "JKL Corp", time: "3 hours ago", type: "payment", status: "completed" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.company} • {activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}>
                      {activity.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      activity.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Overview and Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Company Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Company Overview</h2>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Active Companies</span>
                <span className="text-lg font-bold" style={{ color: primaryColor }}>15</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Total Users</span>
                <span className="text-lg font-bold" style={{ color: primaryColor }}>89</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-lg font-bold" style={{ color: primaryColor }}>99.9%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: "Create Purchase Order", icon: "📋", color: "blue" },
                { label: "Generate Invoice", icon: "🧾", color: "green" },
                { label: "Add New User", icon: "👤", color: "purple" },
                { label: "View Reports", icon: "📊", color: "orange" }
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-left"
                >
                  <span className="text-lg">{action.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">System Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">File Storage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Service</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-yellow-600 font-medium">Warning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
