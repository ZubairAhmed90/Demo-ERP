import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Chart from 'chart.js/auto';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaDownload, 
  FaFilter, 
  FaCalendarAlt,
  FaDollarSign,
  FaShoppingCart,
  FaBoxes,
  FaUsers,
  FaBuilding,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaFileExport
} from 'react-icons/fa';

export default function Reports() {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor } = useColor();
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedChart, setSelectedChart] = useState('revenue');
  
  // Chart refs
  const revenueChartRef = useRef(null);
  const salesChartRef = useRef(null);
  const revenueChartInstance = useRef(null);
  const salesChartInstance = useRef(null);

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', value: 1200000, target: 1000000 },
    { month: 'Feb', value: 1350000, target: 1100000 },
    { month: 'Mar', value: 980000, target: 1200000 },
    { month: 'Apr', value: 1450000, target: 1300000 },
    { month: 'May', value: 1600000, target: 1400000 },
    { month: 'Jun', value: 1750000, target: 1500000 }
  ];

  const salesData = [
    { category: 'Electronics', value: 35, color: '#3B82F6' },
    { category: 'Clothing', value: 25, color: '#10B981' },
    { category: 'Home & Garden', value: 20, color: '#F59E0B' },
    { category: 'Sports', value: 15, color: '#EF4444' },
    { category: 'Books', value: 5, color: '#8B5CF6' }
  ];

  const performanceMetrics = [
    {
      title: "Total Revenue",
      value: "8.2M",
      currency: "SAR",
      change: "+12.5%",
      trend: "up",
      icon: <FaDollarSign className="w-6 h-6" />,
      color: "blue"
    },
    {
      title: "Sales Orders",
      value: "1,247",
      change: "+8.3%",
      trend: "up",
      icon: <FaShoppingCart className="w-6 h-6" />,
      color: "green"
    },
    {
      title: "Inventory Items",
      value: "2,156",
      change: "+5.7%",
      trend: "up",
      icon: <FaBoxes className="w-6 h-6" />,
      color: "purple"
    },
    {
      title: "Active Users",
      value: "89",
      change: "+2.1%",
      trend: "up",
      icon: <FaUsers className="w-6 h-6" />,
      color: "orange"
    }
  ];

  const recentReports = [
    { name: "Monthly Sales Report", type: "Sales", date: "2024-01-15", status: "Generated" },
    { name: "Inventory Analysis", type: "Inventory", date: "2024-01-14", status: "Generated" },
    { name: "Customer Insights", type: "Analytics", date: "2024-01-13", status: "Generated" },
    { name: "Financial Summary", type: "Finance", date: "2024-01-12", status: "Generated" }
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
              data: revenueData.map(item => item.value),
              borderColor: primaryColor,
              backgroundColor: `${primaryColor}20`,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: primaryColor,
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8
            },
            {
              label: 'Target',
              data: revenueData.map(item => item.target),
              borderColor: '#10B981',
              backgroundColor: '#10B98120',
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
                padding: 20,
                font: {
                  size: 12,
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
                  size: 12,
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
                  size: 12,
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

  // Initialize sales distribution chart
  useEffect(() => {
    if (salesChartRef.current && !salesChartInstance.current) {
      const ctx = salesChartRef.current.getContext('2d');
      
      salesChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: salesData.map(item => item.category),
          datasets: [{
            data: salesData.map(item => item.value),
            backgroundColor: salesData.map(item => item.color),
            borderColor: '#fff',
            borderWidth: 3,
            hoverBorderColor: '#fff',
            hoverBorderWidth: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                  weight: '600'
                },
                generateLabels: function(chart) {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    return data.labels.map((label, i) => {
                      const dataset = data.datasets[0];
                      const value = dataset.data[i];
                      const total = dataset.data.reduce((a, b) => a + b, 0);
                      const percentage = ((value / total) * 100).toFixed(1);
                      
                      return {
                        text: `${label} (${percentage}%)`,
                        fillStyle: dataset.backgroundColor[i],
                        strokeStyle: dataset.backgroundColor[i],
                        pointStyle: 'circle',
                        hidden: false,
                        index: i
                      };
                    });
                  }
                  return [];
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
              callbacks: {
                label: function(context) {
                  const label = context.label;
                  const value = context.parsed;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${percentage}%`;
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1000,
            easing: 'easeOutQuart'
          }
        }
      });
    }

    return () => {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
        salesChartInstance.current = null;
      }
    };
  }, [primaryColor]);

  // Update charts when period changes
  useEffect(() => {
    if (revenueChartInstance.current) {
      // Update chart data based on selected period
      // This is where you would fetch new data from API
      console.log('Period changed to:', selectedPeriod);
    }
  }, [selectedPeriod]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics & Reports</h1>
              <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <FaFilter className="w-4 h-4 text-gray-600" />
                <span>Filters</span>
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <FaDownload className="w-4 h-4 text-gray-600" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Period Selector */}
          <div className="mt-6 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Time Period:</label>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
        </div>

        {/* Performance Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${metric.color === 'blue' ? '#3B82F6' : metric.color === 'green' ? '#10B981' : metric.color === 'purple' ? '#8B5CF6' : '#F59E0B'}20` }}
                >
                  <div 
                    className="w-6 h-6"
                    style={{ color: metric.color === 'blue' ? '#3B82F6' : metric.color === 'green' ? '#10B981' : metric.color === 'purple' ? '#8B5CF6' : '#F59E0B' }}
                  >
                    {metric.icon}
                  </div>
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                {metric.currency && <span className="text-sm text-gray-500">{metric.currency}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Revenue Trend</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedChart('revenue')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedChart === 'revenue' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Revenue
                </button>
                <button 
                  onClick={() => setSelectedChart('target')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedChart === 'target' 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Target
                </button>
              </div>
            </div>
            <div className="h-80 relative">
              <canvas ref={revenueChartRef} />
            </div>
          </div>

          {/* Sales Distribution Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Sales Distribution</h2>
            <div className="h-80 relative">
              <canvas ref={salesChartRef} />
            </div>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <FaFileExport className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Report Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Generated Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-800">{report.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {report.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{report.date}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Report">
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Download">
                          <FaDownload className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
