import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartArea, FaSearch, FaDownload, FaFilter, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Chart from 'chart.js/auto';

const forecastData = [
  { itemCode: 'ITEM-001', itemName: 'Laptop Computer', currentStock: 150, forecastedDemand: 200, reorderPoint: 50, suggestedOrder: 100, period: 'Next Month' },
  { itemCode: 'ITEM-002', itemName: 'Office Chair', currentStock: 75, forecastedDemand: 120, reorderPoint: 30, suggestedOrder: 75, period: 'Next Month' },
  { itemCode: 'ITEM-003', itemName: 'Printer Paper A4', currentStock: 200, forecastedDemand: 250, reorderPoint: 100, suggestedOrder: 150, period: 'Next Month' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('next-month');
  const forecastChartRef = useRef(null);
  const forecastChartInstance = useRef(null);

  useEffect(() => {
    if (forecastChartRef.current && !forecastChartInstance.current) {
      const ctx = forecastChartRef.current.getContext('2d');
      
      forecastChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [
            {
              label: 'Historical Demand',
              data: [120, 135, 150, 140, 160, 175, 165, 180],
              borderColor: primaryColor,
              backgroundColor: `${primaryColor}20`,
              borderWidth: 2,
              fill: true,
              tension: 0.4
            },
            {
              label: 'Forecasted Demand',
              data: [null, null, null, null, null, null, 165, 180],
              borderColor: '#10B981',
              backgroundColor: '#10B98120',
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (forecastChartInstance.current) {
        forecastChartInstance.current.destroy();
        forecastChartInstance.current = null;
      }
    };
  }, [primaryColor]);

  const filteredForecast = forecastData.filter((item) => {
    return item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.itemCode.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaChartArea className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Demand Forecasting</h1>
                <p className="text-gray-600">Forecast future demand and plan inventory</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="next-month">Next Month</option>
                <option value="next-quarter">Next Quarter</option>
                <option value="next-year">Next Year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Items Forecasted</p>
                <p className="text-2xl font-bold text-gray-800">{forecastData.length}</p>
              </div>
              <FaChartArea className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Forecasted Demand</p>
                <p className="text-2xl font-bold text-gray-800">
                  {forecastData.reduce((sum, f) => sum + f.forecastedDemand, 0)}
                </p>
              </div>
              <FaChartArea className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suggested Orders</p>
                <p className="text-2xl font-bold text-green-600">
                  {forecastData.reduce((sum, f) => sum + f.suggestedOrder, 0)}
                </p>
              </div>
              <FaChartArea className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Items Below Reorder</p>
                <p className="text-2xl font-bold text-red-600">
                  {forecastData.filter(f => f.currentStock <= f.reorderPoint).length}
                </p>
              </div>
              <FaChartArea className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Demand Forecast Trend</h2>
          <div className="h-80">
            <canvas ref={forecastChartRef} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex-1 relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by item name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Item Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Item Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Current Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Forecasted Demand</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Reorder Point</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Suggested Order</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Period</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredForecast.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{item.itemCode}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.itemName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.currentStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{item.forecastedDemand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.reorderPoint}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{item.suggestedOrder}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;


