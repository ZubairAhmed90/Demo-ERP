import React, { useState } from 'react';
import { FaStickyNote, FaPlus, FaSearch, FaEdit, FaTrash, FaTag, FaUser, FaClock, FaFileAlt, FaThumbtack, FaTh, FaList } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const initialNotes = [
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
    priority: 'High',
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
    priority: 'High',
    color: 'red'
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
    priority: 'Medium',
    color: 'orange'
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
    priority: 'Low',
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
    priority: 'Medium',
    color: 'blue'
  },
];

const entityTypes = ['All Types', 'Customer', 'Vendor', 'Purchase Order', 'Sales Order', 'Item', 'Invoice', 'General'];
const colors = ['yellow', 'blue', 'green', 'red', 'orange', 'purple', 'pink'];
const priorities = ['All Priorities', 'High', 'Medium', 'Low'];

// Sortable Note Card Component
function SortableNoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border-2 rounded-xl p-4 hover:shadow-md transition-all cursor-move relative ${getColorClass(note.color)}`}
    >
      {note.isPinned && (
        <div className="absolute top-2 right-2">
          <FaThumbtack className="w-4 h-4 text-yellow-600 rotate-12" />
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-6" {...attributes} {...listeners}>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-base font-semibold text-gray-900">{note.title}</h3>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityBadge(note.priority)}`}>
              {note.priority}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">{note.content}</p>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onTogglePin(note.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              note.isPinned ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-400'
            }`}
            title={note.isPinned ? "Unpin" : "Pin"}
          >
            <FaThumbtack className="w-3 h-3" />
          </button>
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
            title="Edit"
          >
            <FaEdit className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
            title="Delete"
          >
            <FaTrash className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="space-y-2 mb-3">
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
  );
}

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntityType, setSelectedEntityType] = useState('All Types');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [notesList, setNotesList] = useState(initialNotes);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const allTags = ['all', ...new Set(notesList.flatMap(n => n.tags))];

  const filteredNotes = notesList.filter((note) => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.entityName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEntityType = selectedEntityType === 'All Types' || note.entityType === selectedEntityType;
    const matchesTag = selectedTag === 'all' || note.tags.includes(selectedTag);
    const matchesPriority = selectedPriority === 'All Priorities' || note.priority === selectedPriority;
    const matchesPinned = !showPinnedOnly || note.isPinned;
    return matchesSearch && matchesEntityType && matchesTag && matchesPriority && matchesPinned;
  });

  // Sort notes: pinned first, then by priority
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
  });

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeIndex = sortedNotes.findIndex(n => n.id === active.id);
    const overIndex = sortedNotes.findIndex(n => n.id === over.id);

    if (activeIndex !== overIndex && overIndex !== -1) {
      const newOrder = arrayMove(sortedNotes, activeIndex, overIndex);
      setNotesList(prev => {
        const otherNotes = prev.filter(n => !filteredNotes.some(fn => fn.id === n.id));
        return [...otherNotes, ...newOrder];
      });
    }
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

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsCreateModalOpen(true);
  };

  const pinnedCount = notesList.filter(n => n.isPinned).length;
  const highPriorityCount = notesList.filter(n => n.priority === 'High').length;

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
                <p className="text-gray-600">Drag and drop to organize notes by priority</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  title="Grid View"
                >
                  <FaTh className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  title="List View"
                >
                  <FaList className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  setEditingNote(null);
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: primaryColor, color: 'white' }}
              >
                <FaPlus className="w-4 h-4" />
                <span>Add Note</span>
              </button>
            </div>
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
                <p className="text-2xl font-bold text-yellow-600">{pinnedCount}</p>
              </div>
              <FaThumbtack className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
              </div>
              <FaStickyNote className="w-8 h-8 text-red-500" />
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
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
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

        {/* Notes Grid/List View */}
        {viewMode === 'grid' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sortedNotes.map(n => n.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedNotes.map((note) => (
                  <SortableNoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEdit}
                    onDelete={deleteNote}
                    onTogglePin={togglePin}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <div className="bg-white border-2 border-blue-500 rounded-xl p-4 shadow-lg opacity-90 max-w-sm">
                  <p className="font-semibold text-sm text-gray-900">
                    {notesList.find(n => n.id === activeId)?.title}
                  </p>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <div className="space-y-4">
            {sortedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow-sm border-2 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {note.isPinned && <FaThumbtack className="w-4 h-4 text-yellow-600" />}
                      <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        note.priority === 'High' ? 'bg-red-100 text-red-800' :
                        note.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {note.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{note.content}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <FaFileAlt className="w-3 h-3" />
                        <span>{note.entityType}: {note.entityName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaUser className="w-3 h-3" />
                        <span>{note.createdBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
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
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => togglePin(note.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        note.isPinned ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 text-gray-400'
                      }`}
                    >
                      <FaThumbtack className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(note)}
                      className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedNotes.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <FaStickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-500">Try adjusting your filters or create a new note</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={editingNote?.title || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    defaultValue={editingNote?.content || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note content"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
                    <select 
                      defaultValue={editingNote?.entityType || ''}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {entityTypes.filter(t => t !== 'All Types').map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority <span className="text-red-500">*</span>
                    </label>
                    <select 
                      defaultValue={editingNote?.priority || 'Medium'}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="High">🔴 High</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="Low">🟢 Low</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <select 
                      defaultValue={editingNote?.color || 'yellow'}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {colors.map(color => (
                        <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entity ID</label>
                    <input
                      type="text"
                      defaultValue={editingNote?.entityId || ''}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter entity ID"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    defaultValue={editingNote?.tags?.join(', ') || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., payment, urgent, customer"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      defaultChecked={editingNote?.isPinned || false}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Pin this note</span>
                  </label>
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
