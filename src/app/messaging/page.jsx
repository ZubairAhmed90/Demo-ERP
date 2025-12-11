import React, { useState } from 'react';
import { FaEnvelope, FaSearch, FaPaperPlane, FaUser, FaClock, FaCheck, FaCheckDouble, FaReply, FaTrash, FaPaperclip } from 'react-icons/fa';
import { useColor } from '../../context/ColorContext.jsx';
import Layout from '../../components/Layout/Layout.jsx';

const conversations = [
  {
    id: 1,
    participant: 'Ahmed Ali',
    participantRole: 'Sales Manager',
    lastMessage: 'Can you approve the sales order SO-2024-015?',
    timestamp: '2024-01-22 10:30 AM',
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: 1,
        sender: 'Ahmed Ali',
        content: 'Hi, I need approval for sales order SO-2024-015',
        timestamp: '2024-01-22 10:25 AM',
        isRead: true,
        isSent: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Sure, let me review it',
        timestamp: '2024-01-22 10:27 AM',
        isRead: true,
        isSent: true
      },
      {
        id: 3,
        sender: 'Ahmed Ali',
        content: 'Can you approve the sales order SO-2024-015?',
        timestamp: '2024-01-22 10:30 AM',
        isRead: false,
        isSent: false
      },
    ]
  },
  {
    id: 2,
    participant: 'Fatima Hassan',
    participantRole: 'HR Manager',
    lastMessage: 'The leave request has been processed',
    timestamp: '2024-01-21 03:45 PM',
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 1,
        sender: 'Fatima Hassan',
        content: 'The leave request has been processed',
        timestamp: '2024-01-21 03:45 PM',
        isRead: true,
        isSent: false
      },
    ]
  },
  {
    id: 3,
    participant: 'Mohammed Saleh',
    participantRole: 'Finance Manager',
    lastMessage: 'Payment processed successfully',
    timestamp: '2024-01-20 11:20 AM',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 1,
        sender: 'Mohammed Saleh',
        content: 'Payment processed successfully',
        timestamp: '2024-01-20 11:20 AM',
        isRead: true,
        isSent: false
      },
    ]
  },
];

const Page = () => {
  const { primaryColor } = useColor();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.participant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send message via API
      const updatedConversation = {
        ...selectedConversation,
        messages: [
          ...selectedConversation.messages,
          {
            id: selectedConversation.messages.length + 1,
            sender: 'You',
            content: newMessage,
            timestamp: new Date().toLocaleString(),
            isRead: false,
            isSent: true
          }
        ],
        lastMessage: newMessage,
        timestamp: 'Just now',
        unreadCount: 0
      };
      setSelectedConversation(updatedConversation);
      setNewMessage('');
    }
  };

  return (
    <Layout>
      <div className="p-6 h-[calc(100vh-120px)]">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${primaryColor}15` }}>
              <FaEnvelope className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Internal Messaging</h1>
              <p className="text-gray-600">Communicate with your team members</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-120px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <FaUser className="w-5 h-5 text-gray-600" />
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-900">{conversation.participant}</p>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{conversation.participantRole}</span>
                        {conversation.unreadCount > 0 && (
                          <span className="px-2 py-0.5 text-xs font-bold text-white rounded-full"
                            style={{ backgroundColor: primaryColor }}
                          >
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
            {selectedConversation && (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <FaUser className="w-5 h-5 text-gray-600" />
                      </div>
                      {selectedConversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{selectedConversation.participant}</p>
                      <p className="text-xs text-gray-500">{selectedConversation.participantRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Reply">
                      <FaReply className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-100 transition-colors" title="Delete">
                      <FaTrash className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.isSent ? 'order-2' : 'order-1'}`}>
                        {!message.isSent && (
                          <p className="text-xs text-gray-600 mb-1">{message.sender}</p>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            message.isSent
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                          {message.isSent && (
                            <span className="text-xs">
                              {message.isRead ? (
                                <FaCheckDouble className="text-blue-500" />
                              ) : (
                                <FaCheck className="text-gray-400" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Attach File">
                      <FaPaperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                      style={{ backgroundColor: primaryColor, color: 'white' }}
                      title="Send"
                    >
                      <FaPaperPlane className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;


