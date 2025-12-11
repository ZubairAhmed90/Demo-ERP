import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaSearch, FaPlus, FaEdit, FaTrash, FaTimes, FaUserTie } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

const salaryStructures = [
  { id: 1, employeeCode: 'EMP-001', employeeName: 'John Doe', basicSalary: 5000, housingAllowance: 2000, transportAllowance: 500, medicalAllowance: 300, totalAllowances: 2800, taxDeduction: 200, otherDeductions: 0, netSalary: 7600 },
  { id: 2, employeeCode: 'EMP-002', employeeName: 'Jane Smith', basicSalary: 6000, housingAllowance: 2500, transportAllowance: 600, medicalAllowance: 400, totalAllowances: 3500, taxDeduction: 250, otherDeductions: 0, netSalary: 9250 },
  { id: 3, employeeCode: 'EMP-003', employeeName: 'Mike Johnson', basicSalary: 4500, housingAllowance: 1800, transportAllowance: 400, medicalAllowance: 250, totalAllowances: 2450, taxDeduction: 180, otherDeductions: 0, netSalary: 6770 },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  const filteredStructures = salaryStructures.filter((structure) => {
    return structure.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           structure.employeeCode.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const paginatedStructures = filteredStructures.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaDollarSign className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Salary Structure</h1>
                <p className="text-gray-600">Manage employee salary structures and components</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/payroll/create-salary-structure')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Salary Structure</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-800">{salaryStructures.length}</p>
              </div>
              <FaUserTie className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${salaryStructures.reduce((sum, s) => sum + s.netSalary, 0).toLocaleString()}
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Basic Salary</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${Math.round(salaryStructures.reduce((sum, s) => sum + s.basicSalary, 0) / salaryStructures.length).toLocaleString()}
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Allowances</p>
                <p className="text-2xl font-bold text-green-600">
                  ${salaryStructures.reduce((sum, s) => sum + s.totalAllowances, 0).toLocaleString()}
                </p>
              </div>
              <FaDollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
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
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Basic Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Allowances</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Deductions</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Net Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedStructures.map((structure) => (
                  <tr key={structure.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{structure.employeeName}</div>
                      <div className="text-xs text-gray-500">{structure.employeeCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${structure.basicSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-green-600">+${structure.totalAllowances.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        Housing: ${structure.housingAllowance} | Transport: ${structure.transportAllowance} | Medical: ${structure.medicalAllowance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-red-600">-${(structure.taxDeduction + structure.otherDeductions).toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Tax: ${structure.taxDeduction}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${structure.netSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
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

        {filteredStructures.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredStructures.length / rowsPerPage)}
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


