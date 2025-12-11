import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaPlus, FaSearch, FaTimes, FaEdit, FaTrash, FaRegEye, FaIdCard, FaEnvelope, FaPhone, FaCalendar, FaBuilding } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';

function createEmployee(id, employeeCode, firstName, lastName, email, phone, department, position, hireDate, status) {
  return { id, employeeCode, firstName, lastName, email, phone, department, position, hireDate, status };
}

const allEmployees = [
  createEmployee('E-001', 'EMP-001', 'John', 'Doe', 'john.doe@company.com', '+1-555-0101', 'Sales', 'Sales Manager', '2023-01-15', 'Active'),
  createEmployee('E-002', 'EMP-002', 'Jane', 'Smith', 'jane.smith@company.com', '+1-555-0102', 'HR', 'HR Manager', '2022-06-01', 'Active'),
  createEmployee('E-003', 'EMP-003', 'Mike', 'Johnson', 'mike.johnson@company.com', '+1-555-0103', 'IT', 'Developer', '2023-03-20', 'Active'),
  createEmployee('E-004', 'EMP-004', 'Sarah', 'Williams', 'sarah.williams@company.com', '+1-555-0104', 'Finance', 'Accountant', '2022-11-10', 'Active'),
  createEmployee('E-005', 'EMP-005', 'David', 'Brown', 'david.brown@company.com', '+1-555-0105', 'Operations', 'Operations Manager', '2021-05-12', 'Active'),
  createEmployee('E-006', 'EMP-006', 'Emily', 'Davis', 'emily.davis@company.com', '+1-555-0106', 'Marketing', 'Marketing Specialist', '2023-08-05', 'Active'),
];

const rowsPerPage = 5;

const Page = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const { primaryColor } = useColor();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleStatusFilter = (event) => {
    setSelectedStatus(event.target.value);
    setPage(1);
  };

  const handleDepartmentFilter = (event) => {
    setSelectedDepartment(event.target.value);
    setPage(1);
  };

  const filteredEmployees = allEmployees.filter((emp) => {
    const matchesSearch = 
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
    setShowEditModal(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = () => {
    const index = allEmployees.findIndex(emp => emp.id === editingEmployee.id);
    if (index !== -1) {
      allEmployees[index] = { ...editingEmployee };
    }
    setShowEditModal(false);
    setEditingEmployee(null);
  };

  const handleConfirmDelete = () => {
    const index = allEmployees.findIndex(emp => emp.id === selectedEmployee.id);
    if (index !== -1) {
      allEmployees.splice(index, 1);
    }
    setShowDeleteModal(false);
    setSelectedEmployee(null);
  };

  const closeModal = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedEmployee(null);
    setEditingEmployee(null);
  };

  const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div 
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <FaUserTie className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
                <p className="text-gray-600">Manage employee records and information</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/hr/create-employee')}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-800">{allEmployees.length}</p>
              </div>
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <FaUserTie className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Employees</p>
                <p className="text-2xl font-bold text-green-600">
                  {allEmployees.filter(emp => emp.status === 'Active').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Set(allEmployees.map(emp => emp.department)).size}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <FaBuilding className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Leave</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {allEmployees.filter(emp => emp.status === 'On Leave').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <FaCalendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search employees by name, code, email, or department..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="lg:w-40">
              <select
                value={selectedStatus}
                onChange={handleStatusFilter}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            <div className="lg:w-40">
              <select
                value={selectedDepartment}
                onChange={handleDepartmentFilter}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Departments</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee Code</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hire Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedEmployees.map((emp, index) => (
                  <tr 
                    key={emp.id} 
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{emp.employeeCode}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${primaryColor}15` }}
                        >
                          <FaUserTie className="w-4 h-4" style={{ color: primaryColor }} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{emp.firstName} {emp.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaEnvelope className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{emp.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{emp.department}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{emp.position}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{emp.hireDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(emp.status)}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewEmployee(emp)}
                          className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                          title="View Employee Details"
                        >
                          <FaRegEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditEmployee(emp)}
                          className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                          title="Edit Employee"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(emp)}
                          className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                          title="Delete Employee"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {paginatedEmployees.length === 0 && (
            <div className="text-center py-12">
              <FaUserTie className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredEmployees.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length} results
              </div>
              <Pagination
                count={Math.ceil(filteredEmployees.length / rowsPerPage)}
                page={page}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}

        {/* View Employee Modal */}
        <Modal isOpen={showViewModal} onClose={closeModal} title="Employee Details">
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Code</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedEmployee.employeeCode}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedEmployee.firstName} {selectedEmployee.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedEmployee.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedEmployee.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedEmployee.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedEmployee.hireDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedEmployee.status)}`}>
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Edit Employee Modal */}
        <Modal isOpen={showEditModal} onClose={closeModal} title="Edit Employee">
          {editingEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Code</label>
                  <input
                    type="text"
                    value={editingEmployee.employeeCode}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={editingEmployee.firstName}
                    onChange={(e) => setEditingEmployee({...editingEmployee, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={editingEmployee.lastName}
                    onChange={(e) => setEditingEmployee({...editingEmployee, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editingEmployee.email}
                    onChange={(e) => setEditingEmployee({...editingEmployee, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={editingEmployee.department}
                    onChange={(e) => setEditingEmployee({...editingEmployee, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editingEmployee.status}
                    onChange={(e) => setEditingEmployee({...editingEmployee, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-white rounded-lg transition-colors duration-200"
                  style={{ backgroundColor: primaryColor }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={showDeleteModal} onClose={closeModal} title="Delete Employee">
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <FaTrash className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Employee</h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <span className="font-semibold">{selectedEmployee.firstName} {selectedEmployee.lastName}</span>? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete Employee
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Page;


