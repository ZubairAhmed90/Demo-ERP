import React, { useState } from 'react';
import { FaTasks, FaPlus, FaSearch, FaEdit, FaTrash, FaCheck, FaClock, FaUser, FaFlag, FaCalendarAlt, FaList, FaTh } from 'react-icons/fa';
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
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const initialTasks = [
  {
    id: 1,
    title: 'Review and Approve Purchase Order PO-2024-001',
    description: 'Purchase order requires approval before processing. Please review vendor terms and pricing.',
    assignedTo: 'Ahmed Ali',
    assignedBy: 'Admin User',
    dueDate: '2024-01-25',
    priority: 'High',
    status: 'Pending',
    category: 'Approval',
    createdAt: '2024-01-22 10:00 AM',
    completedAt: null,
    tags: ['purchase', 'approval']
  },
  {
    id: 2,
    title: 'Update Customer Payment Terms',
    description: 'Update payment terms for Customer ABC from 30 to 45 days',
    assignedTo: 'Fatima Hassan',
    assignedBy: 'Sales Manager',
    dueDate: '2024-01-23',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Data Update',
    createdAt: '2024-01-21 02:00 PM',
    completedAt: null,
    tags: ['customer', 'payment']
  },
  {
    id: 3,
    title: 'Process Monthly Payroll',
    description: 'Calculate and process payroll for all employees for January 2024',
    assignedTo: 'HR Manager',
    assignedBy: 'Admin User',
    dueDate: '2024-01-28',
    priority: 'High',
    status: 'Pending',
    category: 'Payroll',
    createdAt: '2024-01-20 09:00 AM',
    completedAt: null,
    tags: ['payroll', 'monthly']
  },
  {
    id: 4,
    title: 'Reconcile Bank Account',
    description: 'Reconcile bank account statements for December 2023',
    assignedTo: 'Finance Manager',
    assignedBy: 'Admin User',
    dueDate: '2024-01-24',
    priority: 'Medium',
    status: 'Completed',
    category: 'Finance',
    createdAt: '2024-01-19 11:00 AM',
    completedAt: '2024-01-22 03:00 PM',
    tags: ['banking', 'reconciliation']
  },
  {
    id: 5,
    title: 'Create Sales Report for Q4',
    description: 'Generate and review sales report for Q4 2023',
    assignedTo: 'Sales Manager',
    assignedBy: 'Admin User',
    dueDate: '2024-01-26',
    priority: 'Low',
    status: 'Pending',
    category: 'Reporting',
    createdAt: '2024-01-18 10:00 AM',
    completedAt: null,
    tags: ['reporting', 'sales']
  },
];

const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
const priorities = ['High', 'Medium', 'Low'];
const categories = ['All Categories', 'Approval', 'Data Update', 'Payroll', 'Finance', 'Reporting'];

// Sortable Task Card Component
function SortableTaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'border-l-red-500 bg-red-50';
      case 'Medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'Low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const isOverdue = () => {
    if (task.status === 'Completed') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border-l-4 rounded-lg p-4 mb-3 bg-white shadow-sm hover:shadow-md transition-all cursor-move ${getPriorityColor(task.priority)}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1" {...attributes} {...listeners}>
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-gray-900 text-sm">{task.title}</h4>
            {isOverdue() && (
              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-red-100 text-red-800">
                Overdue
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`p-1.5 rounded transition-colors ${
              task.status === 'Completed'
                ? 'hover:bg-yellow-100 text-yellow-600'
                : 'hover:bg-green-100 text-green-600'
            }`}
            title={task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
          >
            <FaCheck className="w-3 h-3" />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded hover:bg-blue-100 text-blue-600 transition-colors"
            title="Edit"
          >
            <FaEdit className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded hover:bg-red-100 text-red-600 transition-colors"
            title="Delete"
          >
            <FaTrash className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <FaUser className="w-3 h-3" />
            <span>{task.assignedTo}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCalendarAlt className="w-3 h-3" />
            <span className={isOverdue() ? 'text-red-600 font-semibold' : ''}>{task.dueDate}</span>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          task.priority === 'High' ? 'bg-red-100 text-red-800' :
          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
}

const Page = () => {
  const { primaryColor } = useColor();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [tasksList, setTasksList] = useState(initialTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTasks = tasksList.filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'All Priorities' || task.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'All Categories' || task.category === selectedCategory;
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const tasksByStatus = {
    Pending: filteredTasks.filter(t => t.status === 'Pending'),
    'In Progress': filteredTasks.filter(t => t.status === 'In Progress'),
    Completed: filteredTasks.filter(t => t.status === 'Completed'),
    Cancelled: filteredTasks.filter(t => t.status === 'Cancelled'),
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasksList.find(t => t.id === active.id);
    if (!activeTask) return;

    // Check if dropped on a status column
    const statusColumns = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
    const newStatus = statusColumns.find(status => over.id === `status-${status}`);
    
    if (newStatus && newStatus !== activeTask.status) {
      // Update task status
      setTasksList(prev => prev.map(task => 
        task.id === active.id 
          ? { ...task, status: newStatus, completedAt: newStatus === 'Completed' ? new Date().toLocaleString() : null }
          : task
      ));
      return;
    }

    // Reorder within same status
    const activeStatus = activeTask.status;
    const activeIndex = tasksByStatus[activeStatus].findIndex(t => t.id === active.id);
    const overIndex = tasksByStatus[activeStatus].findIndex(t => t.id === over.id);

    if (activeIndex !== overIndex && overIndex !== -1) {
      const statusTasks = tasksByStatus[activeStatus];
      const newOrder = arrayMove(statusTasks, activeIndex, overIndex);
      
      // Update tasks maintaining their order
      setTasksList(prev => {
        const otherTasks = prev.filter(t => t.status !== activeStatus);
        return [...otherTasks, ...newOrder];
      });
    }
  };

  const toggleTaskStatus = (id) => {
    setTasksList(prev => prev.map(task => {
      if (task.id === id) {
        if (task.status === 'Completed') {
          return { ...task, status: 'Pending', completedAt: null };
        } else {
          return { ...task, status: 'Completed', completedAt: new Date().toLocaleString() };
        }
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasksList(prev => prev.filter(task => task.id !== id));
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsCreateModalOpen(true);
  };

  const pendingCount = tasksList.filter(t => t.status === 'Pending').length;
  const inProgressCount = tasksList.filter(t => t.status === 'In Progress').length;
  const completedCount = tasksList.filter(t => t.status === 'Completed').length;
  const highPriorityCount = tasksList.filter(t => t.priority === 'High' && t.status !== 'Completed').length;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
                <FaTasks className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
                <p className="text-gray-600">Drag and drop tasks to organize by priority and status</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 transition-colors ${
                    viewMode === 'kanban' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  title="Kanban View"
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
                  setEditingTask(null);
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: primaryColor, color: 'white' }}
              >
                <FaPlus className="w-4 h-4" />
                <span>Create Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-800">{pendingCount}</p>
              </div>
              <FaClock className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
              </div>
              <FaTasks className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <FaCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
              </div>
              <FaFlag className="w-8 h-8 text-red-500" />
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
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="lg:w-48">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Priorities">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Kanban Board View */}
        {viewMode === 'kanban' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {statuses.map((status) => {
                const statusTasks = tasksByStatus[status] || [];
                const statusColor = {
                  'Pending': 'bg-gray-100',
                  'In Progress': 'bg-blue-100',
                  'Completed': 'bg-green-100',
                  'Cancelled': 'bg-red-100',
                }[status] || 'bg-gray-100';

                return (
                  <div
                    key={status}
                    id={`status-${status}`}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 min-h-[500px]"
                  >
                    <div className={`${statusColor} rounded-lg p-3 mb-4`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{status}</h3>
                        <span className="px-2 py-1 text-xs font-bold rounded-full bg-white text-gray-700">
                          {statusTasks.length}
                        </span>
                      </div>
                    </div>
                    <SortableContext
                      items={statusTasks.map(t => t.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {statusTasks.map((task) => (
                          <SortableTaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={deleteTask}
                            onToggleComplete={toggleTaskStatus}
                          />
                        ))}
                        {statusTasks.length === 0 && (
                          <div className="text-center py-8 text-gray-400 text-sm">
                            No tasks in {status}
                          </div>
                        )}
                      </div>
                    </SortableContext>
                  </div>
                );
              })}
            </div>
            <DragOverlay>
              {activeId ? (
                <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg opacity-90">
                  <p className="font-semibold text-sm text-gray-900">
                    {tasksList.find(t => t.id === activeId)?.title}
                  </p>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Task</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Assigned To</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{task.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <FaUser className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{task.assignedTo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{task.dueDate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          task.priority === 'High' ? 'bg-red-100 text-red-800' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          task.status === 'Pending' ? 'bg-gray-100 text-gray-800' :
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              task.status === 'Completed'
                                ? 'hover:bg-yellow-100 text-yellow-600'
                                : 'hover:bg-green-100 text-green-600'
                            }`}
                            title={task.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                          >
                            <FaCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(task)}
                            className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete"
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
          </div>
        )}

        {/* Create/Edit Task Modal */}
        {(isCreateModalOpen || editingTask) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      setEditingTask(null);
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
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={editingTask?.title || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    defaultValue={editingTask?.description || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter task description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign To <span className="text-red-500">*</span>
                    </label>
                    <select 
                      defaultValue={editingTask?.assignedTo || ''}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Select user...</option>
                      <option>Ahmed Ali</option>
                      <option>Fatima Hassan</option>
                      <option>Mohammed Saleh</option>
                      <option>HR Manager</option>
                      <option>Finance Manager</option>
                      <option>Sales Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      defaultValue={editingTask?.dueDate || ''}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority <span className="text-red-500">*</span>
                    </label>
                    <select 
                      defaultValue={editingTask?.priority || 'Medium'}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="High">🔴 High</option>
                      <option value="Medium">🟡 Medium</option>
                      <option value="Low">🟢 Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      defaultValue={editingTask?.category || ''}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.filter(c => c !== 'All Categories').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    defaultValue={editingTask?.tags?.join(', ') || ''}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., urgent, approval, customer"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingTask(null);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Save task logic here
                    setIsCreateModalOpen(false);
                    setEditingTask(null);
                  }}
                  className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
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
