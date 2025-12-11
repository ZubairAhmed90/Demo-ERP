import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaUpload, FaSearch, FaFolder, FaDownload, FaTrash, FaShare, FaEye, FaEdit, FaTag } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';

const documents = [
  {
    id: 1,
    name: 'Company_Policy_2024.pdf',
    category: 'Policies',
    size: '2.5 MB',
    uploadedBy: 'Admin User',
    uploadedDate: '2024-01-15',
    modifiedDate: '2024-01-15',
    version: '1.0',
    sharedWith: ['All Users'],
    tags: ['policy', 'hr'],
    type: 'PDF'
  },
  {
    id: 2,
    name: 'Employee_Handbook.docx',
    category: 'HR Documents',
    size: '1.8 MB',
    uploadedBy: 'HR Manager',
    uploadedDate: '2024-01-10',
    modifiedDate: '2024-01-18',
    version: '2.1',
    sharedWith: ['HR Team', 'Managers'],
    tags: ['handbook', 'hr'],
    type: 'DOCX'
  },
  {
    id: 3,
    name: 'Sales_Report_Q4_2023.xlsx',
    category: 'Reports',
    size: '850 KB',
    uploadedBy: 'Sales Manager',
    uploadedDate: '2024-01-05',
    modifiedDate: '2024-01-05',
    version: '1.0',
    sharedWith: ['Management'],
    tags: ['sales', 'report'],
    type: 'XLSX'
  },
  {
    id: 4,
    name: 'Vendor_Contract_Template.docx',
    category: 'Templates',
    size: '120 KB',
    uploadedBy: 'Procurement Manager',
    uploadedDate: '2024-01-12',
    modifiedDate: '2024-01-12',
    version: '1.0',
    sharedWith: ['Procurement Team'],
    tags: ['contract', 'template'],
    type: 'DOCX'
  },
  {
    id: 5,
    name: 'Product_Catalog_2024.pdf',
    category: 'Marketing',
    size: '5.2 MB',
    uploadedBy: 'Marketing Manager',
    uploadedDate: '2024-01-08',
    modifiedDate: '2024-01-20',
    version: '1.2',
    sharedWith: ['Sales Team', 'Marketing Team'],
    tags: ['catalog', 'products'],
    type: 'PDF'
  },
];

const categories = ['All Categories', 'Policies', 'HR Documents', 'Reports', 'Templates', 'Marketing', 'Finance', 'Legal'];

const Page = () => {
  const navigate = useNavigate();
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTag, setSelectedTag] = useState('all');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const rowsPerPage = 10;

  const allTags = ['all', ...new Set(documents.flatMap(d => d.tags))];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Categories' || doc.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || doc.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const paginatedDocuments = filteredDocuments.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return '📄';
      case 'DOCX': return '📝';
      case 'XLSX': return '📊';
      case 'PNG': case 'JPG': return '🖼️';
      default: return '📎';
    }
  };

  const formatFileSize = (size) => size;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaFileAlt className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Document Management</h1>
                <p className="text-gray-600">Store, organize, and share documents</p>
              </div>
            </div>
            <button
              onClick={() => {
                // In real app, open file upload modal
                alert('File upload feature - to be implemented');
              }}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaUpload className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-800">{documents.length}</p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-800">{categories.length - 1}</p>
              </div>
              <FaFolder className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-2xl font-bold text-gray-800">10.5 MB</p>
              </div>
              <FaFileAlt className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shared Documents</p>
                <p className="text-2xl font-bold text-gray-800">{documents.length}</p>
              </div>
              <FaShare className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search documents by name or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'all' ? 'All Tags' : `#${tag}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Documents List/Grid */}
        {viewMode === 'list' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Document</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Size</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Uploaded By</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Modified</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Version</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getFileIcon(doc.type)}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {doc.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  <FaTag className="w-2 h-2 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.uploadedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.modifiedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.version}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors" title="View">
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors" title="Download">
                            <FaDownload className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors" title="Share">
                            <FaShare className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{getFileIcon(doc.type)}</div>
                  <div className="flex items-center space-x-1">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <FaEye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <FaDownload className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{doc.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium text-gray-900">{doc.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Size:</span>
                    <span className="font-medium text-gray-900">{doc.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Version:</span>
                    <span className="font-medium text-gray-900">{doc.version}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      <FaTag className="w-2 h-2 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">{doc.modifiedDate}</span>
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 rounded-lg hover:bg-purple-100">
                      <FaShare className="w-3 h-3 text-purple-600" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-100">
                      <FaTrash className="w-3 h-3 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDocuments.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredDocuments.length / rowsPerPage)}
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


