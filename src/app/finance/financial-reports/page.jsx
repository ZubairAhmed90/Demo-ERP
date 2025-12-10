import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoice, FaDownload, FaPrint, FaChartLine, FaBalanceScale, FaDollarSign, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const financialReports = [
  { id: 1, name: 'Balance Sheet', type: 'Financial', description: 'Assets, Liabilities, and Equity', icon: FaBalanceScale, color: 'blue' },
  { id: 2, name: 'Profit & Loss Statement', type: 'Financial', description: 'Revenue and Expenses', icon: FaChartLine, color: 'green' },
  { id: 3, name: 'Cash Flow Statement', type: 'Financial', description: 'Cash inflows and outflows', icon: FaDollarSign, color: 'purple' },
  { id: 4, name: 'Trial Balance', type: 'Financial', description: 'All account balances', icon: FaFileInvoice, color: 'orange' },
  { id: 5, name: 'General Ledger Report', type: 'Financial', description: 'Detailed ledger entries', icon: FaFileInvoice, color: 'indigo' },
  { id: 6, name: 'Aged Receivables', type: 'AR', description: 'Outstanding customer balances', icon: FaFileInvoice, color: 'blue' },
  { id: 7, name: 'Aged Payables', type: 'AP', description: 'Outstanding vendor balances', icon: FaFileInvoice, color: 'red' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01');
  const [selectedReport, setSelectedReport] = useState(null);

  const handleGenerateReport = (report) => {
    setSelectedReport(report);
    // In real app, this would generate the report
    console.log('Generating report:', report.name, 'for period:', selectedPeriod);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      red: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[color] || colors.blue;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaFileInvoice className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
                <p className="text-gray-600">Generate and view financial statements and reports</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <FaCalendar className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2024-01">January 2024</option>
                  <option value="2024-02">February 2024</option>
                  <option value="2024-03">March 2024</option>
                  <option value="2024-Q1">Q1 2024</option>
                  <option value="2024">Year 2024</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {financialReports.map((report) => {
            const Icon = report.icon;
            return (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(report.color).split(' ')[0]}`}>
                    <Icon className="w-6 h-6" style={{ color: primaryColor }} />
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getColorClasses(report.color)}`}>
                    {report.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleGenerateReport(report)}
                    className="flex-1 px-4 py-2 text-white rounded-lg transition-colors hover:shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Generate
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaDownload className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaPrint className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedReport && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">{selectedReport.name}</h2>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <FaDownload className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <FaPrint className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>
            <div className="text-center py-12 text-gray-500">
              <p>Report preview will be displayed here</p>
              <p className="text-sm mt-2">Period: {selectedPeriod}</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;

