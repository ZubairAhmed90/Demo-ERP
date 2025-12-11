import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaArrowLeft, FaSave, FaTimes, FaPlus, FaTrash, FaCalendar } from 'react-icons/fa';
import { useColor } from '../../../context/ColorContext.jsx';
import Layout from '../../../components/Layout/Layout.jsx';

const accounts = [
  { code: '1110', name: 'Cash and Cash Equivalents', type: 'Asset' },
  { code: '1120', name: 'Accounts Receivable', type: 'Asset' },
  { code: '4100', name: 'Sales Revenue', type: 'Revenue' },
  { code: '2110', name: 'Accounts Payable', type: 'Liability' },
  { code: '5100', name: 'Cost of Goods Sold', type: 'Expense' },
];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  
  const [formData, setFormData] = useState({
    entryNumber: '',
    date: new Date().toISOString().split('T')[0],
    reference: '',
    description: '',
    status: 'Draft'
  });

  const [entryLines, setEntryLines] = useState([
    { id: 1, accountCode: '', accountName: '', debit: '', credit: '', description: '' }
  ]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLineChange = (id, field, value) => {
    setEntryLines(prev => prev.map(line => 
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const handleAccountSelect = (id, accountCode) => {
    const account = accounts.find(a => a.code === accountCode);
    if (account) {
      handleLineChange(id, 'accountCode', account.code);
      handleLineChange(id, 'accountName', account.name);
    }
  };

  const addEntryLine = () => {
    setEntryLines(prev => [...prev, {
      id: Date.now(),
      accountCode: '',
      accountName: '',
      debit: '',
      credit: '',
      description: ''
    }]);
  };

  const removeEntryLine = (id) => {
    if (entryLines.length > 1) {
      setEntryLines(prev => prev.filter(line => line.id !== id));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    const totalDebit = entryLines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
    const totalCredit = entryLines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      newErrors.balance = 'Total debit must equal total credit';
    }

    entryLines.forEach((line, index) => {
      if (!line.accountCode) {
        newErrors[`line${index}_account`] = 'Account is required';
      }
      if (!line.debit && !line.credit) {
        newErrors[`line${index}_amount`] = 'Either debit or credit is required';
      }
      if (line.debit && line.credit) {
        newErrors[`line${index}_both`] = 'Cannot have both debit and credit';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Creating journal entry:', { formData, entryLines });
      alert('Journal entry created successfully!');
      navigate('/finance/journal-entries');
    }
  };

  const totalDebit = entryLines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
  const totalCredit = entryLines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/finance/journal-entries')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaFileAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Create Journal Entry</h1>
                <p className="text-gray-600">Create a new accounting journal entry</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reference
                </label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="REF-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Posted">Posted</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter journal entry description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Entry Lines</h3>
                <button
                  type="button"
                  onClick={addEntryLine}
                  className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  <FaPlus className="w-4 h-4" />
                  <span>Add Line</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Account</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Debit</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Credit</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {entryLines.map((line, index) => (
                      <tr key={line.id}>
                        <td className="px-4 py-3">
                          <select
                            value={line.accountCode}
                            onChange={(e) => handleAccountSelect(line.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Account</option>
                            {accounts.map(acc => (
                              <option key={acc.code} value={acc.code}>
                                {acc.code} - {acc.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={line.description}
                            onChange={(e) => handleLineChange(line.id, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Line description"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={line.debit}
                            onChange={(e) => {
                              handleLineChange(line.id, 'debit', e.target.value);
                              if (e.target.value) handleLineChange(line.id, 'credit', '');
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                            step="0.01"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={line.credit}
                            onChange={(e) => {
                              handleLineChange(line.id, 'credit', e.target.value);
                              if (e.target.value) handleLineChange(line.id, 'debit', '');
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                            step="0.01"
                          />
                        </td>
                        <td className="px-4 py-3">
                          {entryLines.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEntryLine(line.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300 font-semibold">
                      <td colSpan="2" className="px-4 py-3 text-right">Total:</td>
                      <td className="px-4 py-3">
                        <span className={isBalanced ? 'text-gray-900' : 'text-red-600'}>
                          {totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={isBalanced ? 'text-gray-900' : 'text-red-600'}>
                          {totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SAR
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {isBalanced ? (
                          <span className="text-green-600 text-sm">✓ Balanced</span>
                        ) : (
                          <span className="text-red-600 text-sm">Unbalanced</span>
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {errors.balance && (
                <p className="text-red-500 text-sm mt-2">{errors.balance}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/finance/journal-entries')}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <FaTimes className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-white rounded-lg transition-colors flex items-center space-x-2 hover:shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                <FaSave className="w-4 h-4" />
                <span>Save Entry</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;


