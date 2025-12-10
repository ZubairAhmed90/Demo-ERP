import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoice, FaSearch, FaDownload, FaPrint, FaEye, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const payslips = [
  { id: 1, employeeCode: 'EMP-001', employeeName: 'John Doe', period: 'January 2024', netSalary: 5300, status: 'Generated', generatedDate: '2024-01-31' },
  { id: 2, employeeCode: 'EMP-002', employeeName: 'Jane Smith', period: 'January 2024', netSalary: 6350, status: 'Generated', generatedDate: '2024-01-31' },
  { id: 3, employeeCode: 'EMP-003', employeeName: 'Mike Johnson', period: 'January 2024', netSalary: 4770, status: 'Pending', generatedDate: '-' },
  { id: 4, employeeCode: 'EMP-004', employeeName: 'Sarah Williams', period: 'January 2024', netSalary: 5830, status: 'Generated', generatedDate: '2024-01-31' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState('January 2024');

  const rowsPerPage = 5;

  const filteredPayslips = payslips.filter((payslip) => {
    const matchesSearch = 
      payslip.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payslip.employeeCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPeriod = payslip.period === selectedPeriod;
    return matchesSearch && matchesPeriod;
  });

  const paginatedPayslips = filteredPayslips.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
              <FaFileInvoice className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Payslips</h1>
              <p className="text-gray-600">View and manage employee payslips</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by employee name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="January 2024">January 2024</option>
                <option value="February 2024">February 2024</option>
                <option value="March 2024">March 2024</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Period</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Net Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Generated Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPayslips.map((payslip) => (
                  <tr key={payslip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payslip.employeeName}</div>
                      <div className="text-xs text-gray-500">{payslip.employeeCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payslip.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${payslip.netSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                        payslip.status === 'Generated' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                      }`}>
                        {payslip.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payslip.generatedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors" title="View">
                          <FaEye className="w-4 h-4" />
                        </button>
                        {payslip.status === 'Generated' && (
                          <>
                            <button className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors" title="Download">
                              <FaDownload className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors" title="Print">
                              <FaPrint className="w-4 h-4" />
                            </button>
                          </>
                        )}
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

