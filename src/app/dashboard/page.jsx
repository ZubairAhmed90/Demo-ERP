import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Cards from '../../components/cards/dashboard/cards.jsx';
import Chart from 'chart.js/auto';
import { 
  FaFileInvoice, 
  FaShoppingCart, 
  FaUserPlus, 
  FaChartBar, 
  FaBoxes, 
  FaTruck, 
  FaUndo, 
  FaCreditCard,
  FaBuilding,
  FaUsers,
  FaCog,
  FaBell,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaUserTie,
  FaClock,
  FaCalendar,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaDollarSign,
  FaUniversity,
  FaExchangeAlt,
  FaBalanceScale
} from 'react-icons/fa';

export default function Page() {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor } = useColor();
  
  // Chart refs
  const revenueChartRef = useRef(null);
  const revenueChartInstance = useRef(null);

  // Sample revenue data for the chart
  const revenueData = [
    { month: 'Jan', revenue: 1800000, target: 1500000 },
    { month: 'Feb', revenue: 2100000, target: 1800000 },
    { month: 'Mar', revenue: 1950000, target: 2000000 },
    { month: 'Apr', revenue: 2400000, target: 2200000 },
    { month: 'May', revenue: 2800000, target: 2500000 },
    { month: 'Jun', revenue: 3200000, target: 2800000 }
  ];

  // Initialize revenue chart
  useEffect(() => {
    if (revenueChartRef.current && !revenueChartInstance.current) {
      const ctx = revenueChartRef.current.getContext('2d');
      
      revenueChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: revenueData.map(item => item.month),
          datasets: [
            {
              label: 'Revenue',
              data: revenueData.map(item => item.revenue),
              borderColor: primaryColor,
              backgroundColor: `${primaryColor}15`,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: primaryColor,
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Target',
              data: revenueData.map(item => item.target),
              borderColor: '#10B981',
              backgroundColor: '#10B98115',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              borderDash: [5, 5],
              pointBackgroundColor: '#10B981',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 15,
                font: {
                  size: 11,
                  weight: '600'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: primaryColor,
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  const label = context.dataset.label || '';
                  const value = context.parsed.y;
                  return `${label}: ${(value / 1000000).toFixed(1)}M SAR`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 11,
                  weight: '600'
                },
                color: '#6B7280'
              }
            },
            y: {
              grid: {
                color: '#E5E7EB',
                drawBorder: false
              },
              ticks: {
                font: {
                  size: 11,
                  weight: '600'
                },
                color: '#6B7280',
                callback: function(value) {
                  return (value / 1000000).toFixed(1) + 'M';
                }
              },
              beginAtZero: true
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });
    }

    return () => {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
        revenueChartInstance.current = null;
      }
    };
  }, [primaryColor]);

  // Quick action handlers
  const handleQuickAction = (action) => {
    switch (action) {
      case 'purchase-order':
        navigate('/purchase-order');
        break;
      case 'purchase-request':
        navigate('/purchase-request');
        break;
      case 'purchase-quotation':
        navigate('/purchase-quotation');
        break;
      case 'goods-receipt':
        navigate('/goods-receipts-po');
        break;
      case 'goods-return-request':
        navigate('/goods-return-request');
        break;
      case 'goods-return':
        navigate('/goods-return');
        break;
      case 'ap-invoice':
        navigate('/ap-invoice');
        break;
      case 'ap-credit-memo':
        navigate('/ap-credit-memo');
        break;
      case 'sales-order':
        navigate('/sales-order');
        break;
      case 'create-company':
        navigate('/create-company');
        break;
      case 'create-users':
        navigate('/create-users');
        break;
      case 'users':
        navigate('/users');
        break;
      case 'company':
        navigate('/company');
        break;
      case 'roles':
        navigate('/roles');
        break;
      case 'inventory':
        navigate('/inventory-req');
        break;
      case 'delivery':
        navigate('/delivery');
        break;
      case 'opportunity':
        navigate('/opportunity');
        break;
      case 'return':
        navigate('/return');
        break;
      case 'return-request':
        navigate('/return-request');
        break;
      // HR Actions
      case 'hr-employees':
        navigate('/hr/employees');
        break;
      case 'hr-create-employee':
        navigate('/hr/create-employee');
        break;
      case 'hr-attendance':
        navigate('/hr/attendance');
        break;
      case 'hr-leave-management':
        navigate('/hr/leave-management');
        break;
      case 'hr-performance-reviews':
        navigate('/hr/performance-reviews');
        break;
      // Payroll Actions
      case 'payroll-processing':
        navigate('/payroll/processing');
        break;
      case 'payroll-payslips':
        navigate('/payroll/payslips');
        break;
      case 'payroll-salary-structure':
        navigate('/payroll/salary-structure');
        break;
      // Banking Actions
      case 'banking-accounts':
        navigate('/banking/accounts');
        break;
      case 'banking-create-account':
        navigate('/banking/create-account');
        break;
      case 'banking-transactions':
        navigate('/banking/transactions');
        break;
      case 'banking-reconciliation':
        navigate('/banking/reconciliation');
        break;
      default:
        console.log('Action not implemented:', action);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        {/* Top Navigation Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: primaryColor }}
                />
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <FaCalendarAlt className="w-4 h-4" />
                <span>Last updated: Just now</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden lg:block">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search dashboard..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
                <FaBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Filter */}
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
                <FaFilter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="space-y-8">
          {/* Key Metrics Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Key Performance Indicators</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>View all metrics</span>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
            
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
          </div>

          {/* Secondary Metrics and Quick Actions Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Secondary Metrics */}
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Secondary Metrics</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>View detailed reports</span>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Quick Actions</h2>
                <div 
                  className="p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ backgroundColor: `${primaryColor}15` }}
                  onClick={() => handleQuickAction('company')}
                  title="View Companies"
                >
                  <FaBuilding className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[
                  { 
                    label: "Create Purchase Order", 
                    icon: <FaShoppingCart className="w-5 h-5" />, 
                    action: "purchase-order",
                    color: "blue",
                    description: "Create new purchase orders"
                  },
                  { 
                    label: "Create Purchase Request", 
                    icon: <FaBoxes className="w-5 h-5" />, 
                    action: "purchase-request",
                    color: "green",
                    description: "Submit purchase requests"
                  },
                  { 
                    label: "Create Purchase Quotation", 
                    icon: <FaFileInvoice className="w-5 h-5" />, 
                    action: "purchase-quotation",
                    color: "purple",
                    description: "Generate purchase quotations"
                  },
                  { 
                    label: "Goods Receipt PO", 
                    icon: <FaTruck className="w-5 h-5" />, 
                    action: "goods-receipt",
                    color: "orange",
                    description: "Process goods receipts"
                  },
                  { 
                    label: "Goods Return Request", 
                    icon: <FaUndo className="w-5 h-5" />, 
                    action: "goods-return-request",
                    color: "red",
                    description: "Submit return requests"
                  },
                  { 
                    label: "Goods Return", 
                    icon: <FaUndo className="w-5 h-5" />, 
                    action: "goods-return",
                    color: "pink",
                    description: "Process goods returns"
                  },
                  { 
                    label: "AP Invoice", 
                    icon: <FaFileInvoice className="w-5 h-5" />, 
                    action: "ap-invoice",
                    color: "indigo",
                    description: "Create AP invoices"
                  },
                  { 
                    label: "AP Credit Memo", 
                    icon: <FaCreditCard className="w-5 h-5" />, 
                    action: "ap-credit-memo",
                    color: "teal",
                    description: "Create credit memos"
                  },
                  { 
                    label: "Sales Order", 
                    icon: <FaShoppingCart className="w-5 h-5" />, 
                    action: "sales-order",
                    color: "emerald",
                    description: "Create sales orders"
                  },
                  { 
                    label: "Create Company", 
                    icon: <FaBuilding className="w-5 h-5" />, 
                    action: "create-company",
                    color: "blue",
                    description: "Add new company"
                  },
                  { 
                    label: "Create User", 
                    icon: <FaUserPlus className="w-5 h-5" />, 
                    action: "create-users",
                    color: "purple",
                    description: "Add new user"
                  },
                  { 
                    label: "Manage Users", 
                    icon: <FaUsers className="w-5 h-5" />, 
                    action: "users",
                    color: "gray",
                    description: "View all users"
                  },
                  { 
                    label: "Manage Roles", 
                    icon: <FaCog className="w-5 h-5" />, 
                    action: "roles",
                    color: "slate",
                    description: "Configure user roles"
                  },
                  { 
                    label: "Inventory Request", 
                    icon: <FaBoxes className="w-5 h-5" />, 
                    action: "inventory",
                    color: "amber",
                    description: "Submit inventory requests"
                  },
                  { 
                    label: "Delivery Management", 
                    icon: <FaTruck className="w-5 h-5" />, 
                    action: "delivery",
                    color: "cyan",
                    description: "Manage deliveries"
                  },
                  { 
                    label: "Opportunity Management", 
                    icon: <FaChartBar className="w-5 h-5" />, 
                    action: "opportunity",
                    color: "lime",
                    description: "Track opportunities"
                  },
                  // HR Quick Actions
                  { 
                    label: "Employee Management", 
                    icon: <FaUserTie className="w-5 h-5" />, 
                    action: "hr-employees",
                    color: "blue",
                    description: "Manage employees"
                  },
                  { 
                    label: "Create Employee", 
                    icon: <FaUserPlus className="w-5 h-5" />, 
                    action: "hr-create-employee",
                    color: "indigo",
                    description: "Add new employee"
                  },
                  { 
                    label: "Attendance", 
                    icon: <FaClock className="w-5 h-5" />, 
                    action: "hr-attendance",
                    color: "green",
                    description: "View attendance records"
                  },
                  { 
                    label: "Leave Management", 
                    icon: <FaCalendar className="w-5 h-5" />, 
                    action: "hr-leave-management",
                    color: "purple",
                    description: "Manage leave requests"
                  },
                  // Payroll Quick Actions
                  { 
                    label: "Payroll Processing", 
                    icon: <FaMoneyBillWave className="w-5 h-5" />, 
                    action: "payroll-processing",
                    color: "green",
                    description: "Process payroll"
                  },
                  { 
                    label: "Payslips", 
                    icon: <FaFileInvoiceDollar className="w-5 h-5" />, 
                    action: "payroll-payslips",
                    color: "blue",
                    description: "View payslips"
                  },
                  { 
                    label: "Salary Structure", 
                    icon: <FaDollarSign className="w-5 h-5" />, 
                    action: "payroll-salary-structure",
                    color: "yellow",
                    description: "Manage salary structures"
                  },
                  // Banking Quick Actions
                  { 
                    label: "Bank Accounts", 
                    icon: <FaUniversity className="w-5 h-5" />, 
                    action: "banking-accounts",
                    color: "blue",
                    description: "Manage bank accounts"
                  },
                  { 
                    label: "Create Bank Account", 
                    icon: <FaUniversity className="w-5 h-5" />, 
                    action: "banking-create-account",
                    color: "indigo",
                    description: "Add new bank account"
                  },
                  { 
                    label: "Bank Transactions", 
                    icon: <FaExchangeAlt className="w-5 h-5" />, 
                    action: "banking-transactions",
                    color: "green",
                    description: "View transactions"
                  },
                  { 
                    label: "Bank Reconciliation", 
                    icon: <FaBalanceScale className="w-5 h-5" />, 
                    action: "banking-reconciliation",
                    color: "purple",
                    description: "Reconcile bank statements"
                  }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="w-full flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 text-left group"
                    title={action.description}
                  >
                    <div 
                      className="p-2 rounded-lg transition-colors duration-200"
                      style={{ 
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor
                      }}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {action.label}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Analytics and Activities Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
                <select className="text-sm border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64 relative">
                <canvas ref={revenueChartRef} />
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>View all activities</span>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {[
                  { action: "New Purchase Order", company: "ABC Corp", time: "2 min ago", type: "purchase", status: "pending", route: "/purchase-order" },
                  { action: "Invoice Generated", company: "XYZ Ltd", time: "15 min ago", type: "invoice", status: "completed", route: "/ap-invoice" },
                  { action: "Goods Received", company: "DEF Inc", time: "1 hour ago", type: "inventory", status: "completed", route: "/goods-receipts-po" },
                  { action: "Sales Order Created", company: "GHI Co", time: "2 hours ago", type: "sales", status: "pending", route: "/sales-order" },
                  { action: "Payment Received", company: "JKL Corp", time: "3 hours ago", type: "payment", status: "completed", route: "/ap-invoice" }
                ].map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => handleQuickAction(activity.type === 'purchase' ? 'purchase-order' : 
                                                     activity.type === 'invoice' ? 'ap-invoice' : 
                                                     activity.type === 'inventory' ? 'goods-receipt' : 
                                                     activity.type === 'sales' ? 'sales-order' : 'ap-invoice')}
                    title={`Click to view ${activity.type} details`}
                  >
                    <div 
                      className="w-2 h-2 rounded-full transition-all duration-200 group-hover:scale-150"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{activity.action}</p>
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

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Company Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Company Overview</h2>
                <div 
                  className="p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ backgroundColor: `${primaryColor}15` }}
                  onClick={() => handleQuickAction('company')}
                  title="View Companies"
                >
                  <FaBuilding className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleQuickAction('company')}>
                  <span className="text-sm text-gray-600">Active Companies</span>
                  <span className="text-lg font-bold" style={{ color: primaryColor }}>15</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleQuickAction('users')}>
                  <span className="text-sm text-gray-600">Total Users</span>
                  <span className="text-lg font-bold" style={{ color: primaryColor }}>89</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <span className="text-sm text-gray-600">System Uptime</span>
                  <span className="text-lg font-bold" style={{ color: primaryColor }}>99.9%</span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">API Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">File Storage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-yellow-600 font-medium">Warning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Stats</h2>
              <div className="space-y-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">156</div>
                  <div className="text-sm text-blue-700">Total Documents</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                  <div className="text-2xl font-bold text-green-600 mb-1">89%</div>
                  <div className="text-sm text-green-700">Completion Rate</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                  <div className="text-sm text-purple-700">System Availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
