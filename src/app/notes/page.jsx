import React, { useState } from 'react';
import { FaStickyNote, FaPlus, FaSearch, FaEdit, FaTrash, FaTag, FaUser, FaClock, FaFileAlt } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';

const notes = [
  {
    id: 1,
    title: 'Important: Payment Terms Update',
    content: 'Customer ABC has requested extended payment terms from 30 to 45 days. Please update their account accordingly.',
    entityType: 'Customer',
    entityId: 'CUST-001',
    entityName: 'ABC Corporation',
    createdBy: 'Ahmed Ali',
    createdAt: '2024-01-22 10:30 AM',
    updatedAt: '2024-01-22 10:30 AM',
    tags: ['payment', 'customer'],
    isPinned: true,
    color: 'yellow'
  },
  {
    id: 2,
    title: 'Follow-up Required: Purchase Order',
    content: 'PO-2024-001 needs follow-up with vendor regarding delivery schedule. Expected delivery date is Jan 25.',
    entityType: 'Purchase Order',
    entityId: 'PO-2024-001',
    entityName: 'PO-2024-001',
    createdBy: 'Fatima Hassan',
    createdAt: '2024-01-21 02:15 PM',
    updatedAt: '2024-01-21 02:15 PM',
    tags: ['purchase', 'urgent'],
    isPinned: false,
    color: 'blue'
  },
  {
    id: 3,
    title: 'Inventory Alert: Low Stock',
    content: 'Item ITEM-001 is running low. Reorder point reached. Please create purchase order.',
    entityType: 'Item',
    entityId: 'ITEM-001',
    entityName: 'Product XYZ',
    createdBy: 'Mohammed Saleh',
    createdAt: '2024-01-20 09:45 AM',
    updatedAt: '2024-01-20 09:45 AM',
    tags: ['inventory', 'alert'],
    isPinned: true,
    color: 'red'
  },
  {
    id: 4,
    title: 'Meeting Notes: Sales Review',
    content: 'Discussed Q4 sales performance. Key points: Revenue up 15%, need to focus on customer retention.',
    entityType: 'General',
    entityId: '-',
    entityName: 'Sales Review Meeting',
    createdBy: 'HR Manager',
    createdAt: '2024-01-19 03:30 PM',
    updatedAt: '2024-01-19 03:30 PM',
    tags: ['meeting', 'sales'],
    isPinned: false,
    color: 'green'
  },
  {
    id: 5,
    title: 'Vendor Payment Reminder',
    content: 'Vendor DEF invoice INV-2024-008 is due on Jan 25. Please process payment.',
    entityType: 'Vendor',
    entityId: 'VEND-003',
    entityName: 'DEF Suppliers',
    createdBy: 'Finance Manager',
    createdAt: '2024-01-18 11:20 AM',
    updatedAt: '2024-01-18 11:20 AM',
    tags: ['payment', 'vendor'],
    isPinned: false,
    color: 'orange'
  },
];

const entityTypes = ['All Types', 'Customer', 'Vendor', 'Purchase Order', 'Sales Order', 'Item', 'Invoice', 'General'];
const colors = ['yellow', 'blue', 'green', 'red', 'orange', 'purple', 'pink'];

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntityType, setSelectedEntityType] = useState('All Types');
  const [selectedTag, setSelectedTag] = useState('all');
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [notesList, setNotesList] = useState(notes);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const rowsPerPage = 10;

  const allTags = ['all', ...new Set(notesList.flatMap(n => n.tags))];

  const filteredNotes = notesList.filter((note) => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.entityName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEntityType = selectedEntityType === 'All Types' || note.entityType === selectedEntityType;
    const matchesTag = selectedTag === 'all' || note.tags.includes(selectedTag);
    const matchesPinned = !showPinnedOnly || note.isPinned;
    return matchesSearch && matchesEntityType && matchesTag && matchesPinned;
  });

  const paginatedNotes = filteredNotes.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getColorClass = (color) => {
    const colorMap = {
      yellow: 'bg-yellow-50 border-yellow-200',
      blue: 'bg-blue-50 border-blue-200',
      green: 'bg-green-50 border-green-200',
      red: 'bg-red-50 border-red-200',
      orange: 'bg-orange-50 border-orange-200',
      purple: 'bg-purple-50 border-purple-200',
      pink: 'bg-pink-50 border-pink-200',
    };
    return colorMap[color] || 'bg-gray-50 border-gray-200';
  };

  const togglePin = (id) => {
    setNotesList(prev => prev.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const deleteNote = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotesList(prev => prev.filter(note => note.id !== id));
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaStickyNote className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Notes & Comments</h1>
                <p className="text-gray-600">Manage notes and comments on transactions</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
              style={{ backgroundColor: primaryColor, color: 'white' }}
            >
              <FaPlus className="w-4 h-4" />
              <span>Add Note</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notes</p>
                <p className="text-2xl font-bold text-gray-800">{notesList.length}</p>
              </div>
              <FaStickyNote className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pinned Notes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {notesList.filter(n => n.isPinned).length}
                </p>
              </div>
              <FaStickyNote className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-blue-600">
                  {notesList.filter(n => {
                    const noteDate = new Date(n.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return noteDate >= weekAgo;
                  }).length}
                </p>
              </div>
              <FaClock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tags</p>
                <p className="text-2xl font-bold text-purple-600">{allTags.length - 1}</p>
              </div>
              <FaTag className="w-8 h-8 text-purple-500" />
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
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedEntityType}
                onChange={(e) => setSelectedEntityType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {entityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
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
              <input
                type="checkbox"
                id="pinnedOnly"
                checked={showPinnedOnly}
                onChange={(e) => setShowPinnedOnly(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="pinnedOnly" className="text-sm font-medium text-gray-700">
                Pinned Only
              </label>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedNotes.map((note) => (
            <div
              key={note.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-shadow relative ${getColorClass(note.color)}`}
            >
              {note.isPinned && (
                <div className="absolute top-4 right-4">
                  <FaStickyNote className="w-5 h-5 text-yellow-600" />
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 pr-6">{note.title}</h3>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => togglePin(note.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                    title={note.isPinned ? "Unpin" : "Pin"}
                  >
                    <FaStickyNote className={`w-4 h-4 ${note.isPinned ? 'text-yellow-600' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => setEditingNote(note)}
                    className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1.5 rounded-lg hover:bg-red-100 transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">{note.content}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <FaFileAlt className="w-3 h-3" />
                  <span className="font-medium">{note.entityType}:</span>
                  <span>{note.entityName}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <FaUser className="w-3 h-3" />
                  <span>{note.createdBy}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <FaClock className="w-3 h-3" />
                  <span>{note.createdAt}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {note.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    <FaTag className="w-2 h-2 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <FaStickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new note</p>
          </div>
        )}

        {filteredNotes.length > rowsPerPage && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Pagination
              count={Math.ceil(filteredNotes.length / rowsPerPage)}
              page={page}
              onPageChange={(e, value) => setPage(value)}
            />
          </div>
        )}

        {/* Create/Edit Note Modal */}
        {(isCreateModalOpen || editingNote) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingNote ? 'Edit Note' : 'Create New Note'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setEditingNote(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={editingNote?.title || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    defaultValue={editingNote?.content || ''}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note content"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {entityTypes.filter(t => t !== 'All Types').map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {colors.map(color => (
                        <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    defaultValue={editingNote?.tags.join(', ') || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., payment, urgent, customer"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingNote(null);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Save note logic here
                    setIsCreateModalOpen(false);
                    setEditingNote(null);
                  }}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  {editingNote ? 'Update Note' : 'Create Note'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;

