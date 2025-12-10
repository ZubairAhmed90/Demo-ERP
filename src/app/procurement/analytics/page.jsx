import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartPie, FaFilter, FaDownload, FaDollarSign, FaShoppingCart, FaTruck } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Chart from 'chart.js/auto';

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const procurementChartRef = useRef(null);
  const procurementChartInstance = useRef(null);

  useEffect(() => {
    if (procurementChartRef.current && !procurementChartInstance.current) {
      const ctx = procurementChartRef.current.getContext('2d');
      
      procurementChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Electronics', 'Raw Materials', 'Office Supplies', 'Logistics', 'Services'],
          datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
              primaryColor,
              '#10B981',
              '#F59E0B',
              '#EF4444',
              '#8B5CF6'
            ],
            borderColor: '#fff',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            }
          }
        }
      });
    }

    return () => {
      if (procurementChartInstance.current) {
        procurementChartInstance.current.destroy();
        procurementChartInstance.current = null;
      }
    };
  }, [primaryColor]);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaChartPie className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Procurement Analytics</h1>
                <p className="text-gray-600">Analyze procurement performance and spending</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">Last Year</option>
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
                <p className="text-sm font-medium text-gray-600">Total Spend</p>
                <p className="text-2xl font-bold text-gray-800">1,550,000 SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">105</p>
              </div>
              <FaShoppingCart className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-green-600">25</p>
              </div>
              <FaTruck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-800">14,762 SAR</p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h2>
            <div className="h-80">
              <canvas ref={procurementChartRef} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Vendors by Spend</h2>
            <div className="space-y-4">
              {['ABC Suppliers Ltd', 'XYZ Manufacturing', 'Global Logistics Co'].map((vendor, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{vendor}</span>
                      <span className="text-sm text-gray-600">{(35 - idx * 10)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${35 - idx * 10}%`, backgroundColor: primaryColor }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

