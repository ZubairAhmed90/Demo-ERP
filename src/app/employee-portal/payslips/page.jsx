import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar, FaDownload, FaEye, FaSearch, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const payslips = [
  { 
    id: 1, 
    payslipNumber: 'PS-2024-001', 
    month: 'January 2024', 
    period: '2024-01-01 to 2024-01-31',
    grossSalary: 15000, 
    deductions: 1500, 
    netSalary: 13500, 
    status: 'Paid', 
    paymentDate: '2024-01-31',
    basicSalary: 12000,
    allowances: 3000,
    tax: 500,
    socialInsurance: 1000
  },
  { 
    id: 2, 
    payslipNumber: 'PS-2023-012', 
    month: 'December 2023', 
    period: '2023-12-01 to 2023-12-31',
    grossSalary: 15000, 
    deductions: 1500, 
    netSalary: 13500, 
    status: 'Paid', 
    paymentDate: '2023-12-31',
    basicSalary: 12000,
    allowances: 3000,
    tax: 500,
    socialInsurance: 1000
  },
  { 
    id: 3, 
    payslipNumber: 'PS-2023-011', 
    month: 'November 2023', 
    period: '2023-11-01 to 2023-11-30',
    grossSalary: 15000, 
    deductions: 1500, 
    netSalary: 13500, 
    status: 'Paid', 
    paymentDate: '2023-11-30',
    basicSalary: 12000,
    allowances: 3000,
    tax: 500,
    socialInsurance: 1000
  },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredPayslips = payslips.filter((payslip) => {
    const matchesSearch = 
      payslip.month.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payslip.payslipNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = payslip.period.includes(selectedYear);
    return matchesSearch && matchesYear;
  });

  const paginatedPayslips = filteredPayslips.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalEarnings = payslips.reduce((sum, p) => sum + p.netSalary, 0);
  const averageSalary = payslips.length > 0 ? totalEarnings / payslips.length : 0;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaFileInvoiceDollar className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Payslips</h1>
                <p className="text-gray-600">View and download your salary statements</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payslips</p>
                <p className="text-2xl font-bold text-gray-800">{payslips.length}</p>
              </div>
              <FaFileInvoiceDollar className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">{totalEarnings.toLocaleString()} SAR</p>
              </div>
              <FaFileInvoiceDollar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Salary</p>
                <p className="text-2xl font-bold text-gray-800">{averageSalary.toLocaleString()} SAR</p>
              </div>
              <FaFileInvoiceDollar className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by month or payslip number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Payslip #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Month</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Period</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Gross Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Deductions</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Net Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPayslips.map((payslip) => (
                  <tr key={payslip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{payslip.payslipNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payslip.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payslip.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payslip.grossSalary.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      -{payslip.deductions.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {payslip.netSalary.toLocaleString()} SAR
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {payslip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => navigate(`/employee-portal/payslips/${payslip.id}`)}
                          className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                          title="Download PDF"
                        >
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

        {filteredPayslips.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredPayslips.length / rowsPerPage)}
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


