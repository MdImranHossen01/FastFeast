"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { 
  FiSearch, 
  FiMessageSquare, 
  FiSend, 
  FiPaperclip,
  FiSmile,
  FiMoreVertical,
  FiCheck,
  FiCheckCircle,
  FiRefreshCw
} from "react-icons/fi";

// Date formatting functions
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === yesterday.getDate() &&
    checkDate.getMonth() === yesterday.getMonth() &&
    checkDate.getFullYear() === yesterday.getFullYear()
  );
};

export default function ChatInterface({ restaurant, owner }) {
  const { data: session } = useSession();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch chat rooms - for both customers and restaurant owners
  const fetchRooms = async (showLoading = true) => {
    try {
      if (showLoading) setRefreshing(true);
      
      let url = '/api/chat/rooms';
      if (restaurant?._id) {
        url += `?restaurantId=${restaurant._id}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setRooms(data.rooms);
        
        // Auto-select the first room if available and no room is selected
        if (data.rooms.length > 0 && !selectedRoom) {
          setSelectedRoom(data.rooms[0]);
          fetchMessages(data.rooms[0]._id);
        }
        
        // If we have a selected room, make sure it's updated in the rooms list
        if (selectedRoom && data.rooms.length > 0) {
          const updatedSelectedRoom = data.rooms.find(room => room._id === selectedRoom._id);
          if (updatedSelectedRoom) {
            setSelectedRoom(updatedSelectedRoom);
          }
        }
        
        setError("");
      } else {
        setError(data.error || "Failed to load conversations");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to load conversations");
    } finally {
      if (showLoading) setRefreshing(false);
    }
  };

  // Create a new chat room
  const createRoom = async () => {
    if (!owner || !restaurant || !session) {
      setError("Missing required information to create chat room");
      return;
    }
    
    setCreatingRoom(true);
    setError("");
    
    try {
      const res = await fetch("/api/chat/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: owner._id,
          restaurantId: restaurant._id,
          subject: `Inquiry about ${restaurant.name}`
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setRooms(prev => [data.room, ...prev]);
        setSelectedRoom(data.room);
        setMessages([]);
        setError("");
      } else {
        console.error("Failed to create room:", data.error);
        setError(data.error || "Failed to create conversation");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      setError("Failed to create conversation. Please try again.");
    } finally {
      setCreatingRoom(false);
    }
  };

  // Fetch messages for a room
  const fetchMessages = async (roomId, showLoading = true) => {
    if (!roomId) return;
    
    if (showLoading) setLoading(true);
    try {
      const res = await fetch(`/api/messages?roomId=${roomId}`);
      const data = await res.json();
      
      if (data.success) {
        setMessages(data.messages);
        setError("");
      } else {
        setError("Failed to load messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to load messages");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const messageContent = newMessage.trim();
    setNewMessage("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: selectedRoom._id,
          content: messageContent
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        setRooms(prev => 
          prev.map(room => 
            room._id === selectedRoom._id 
              ? { ...room, lastMessage: data.message, lastActivity: new Date() }
              : room
          )
        );
        setError("");
      } else {
        setError("Failed to send message");
        setNewMessage(messageContent); // Restore message if failed
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
      setNewMessage(messageContent); // Restore message if failed
    }
  };

  // Refresh messages for the current room
  const refreshMessages = () => {
    if (selectedRoom) {
      fetchMessages(selectedRoom._id, false);
      fetchRooms(false);
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format message timestamp
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return formatTime(date);
    } else if (isYesterday(date)) {
      return `Yesterday ${formatTime(date)}`;
    } else {
      return `${formatDate(date)}, ${formatTime(date)}`;
    }
  };

  // Format room timestamp
  const formatRoomTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return formatTime(date);
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return formatDate(date);
    }
  };

  useEffect(() => {
    if (owner && restaurant) {
      fetchRooms();
    } else {
      // This is the messages page (restaurant owner view)
      fetchRooms();
    }
  }, [owner, restaurant]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-refresh for restaurant owners (every 10 seconds)
  useEffect(() => {
    if (!restaurant && selectedRoom) {
      // This is the messages page (restaurant owner view)
      const interval = setInterval(() => {
        refreshMessages();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [selectedRoom, restaurant]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // If no room exists and we have owner/restaurant, show create room button
  const shouldShowCreateRoom = owner && restaurant && rooms.length === 0 && !selectedRoom;

  return (
    <div className="flex h-[600px] bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header with refresh button */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          <button
            onClick={() => fetchRooms()}
            disabled={refreshing}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh conversations"
          >
            <FiRefreshCw className={`text-lg ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Rooms List */}
        <div className="flex-1 overflow-y-auto">
          {rooms.map((room) => {
            const otherParticipant = room.participants?.find(p => p._id !== session?.user?.id);
            const lastMessage = room.lastMessage;
            
            return (
              <div
                key={room._id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedRoom?._id === room._id ? "bg-orange-50 border-orange-200" : ""
                }`}
                onClick={() => {
                  setSelectedRoom(room);
                  fetchMessages(room._id);
                }}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={otherParticipant?.image || "/default-avatar.png"}
                    alt={otherParticipant?.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {otherParticipant?.name}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatRoomTime(room.lastActivity)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {lastMessage?.content || "Start a conversation..."}
                    </p>
                    {room.unreadCount > 0 && (
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-orange-600 font-medium">
                          {room.unreadCount} unread {room.unreadCount === 1 ? 'message' : 'messages'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {rooms.length === 0 && !creatingRoom && !refreshing && (
            <div className="p-4 text-center text-gray-500">
              <FiMessageSquare className="mx-auto text-2xl mb-2" />
              <p className="text-sm">No conversations yet</p>
              {!restaurant && (
                <p className="text-xs mt-1">Visit a restaurant to start a conversation</p>
              )}
            </div>
          )}

          {creatingRoom && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto mb-2"></div>
              <p className="text-sm">Creating conversation...</p>
            </div>
          )}

          {refreshing && rooms.length > 0 && (
            <div className="p-2 text-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mx-auto"></div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-200">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        {shouldShowCreateRoom ? (
          // Show create room prompt
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
            <FiMessageSquare className="text-4xl mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">Start a Conversation</h3>
            <p className="text-center mb-6 max-w-md">
              Send a message to {owner.name}, the owner of {restaurant.name}
            </p>
            <button
              onClick={createRoom}
              disabled={creatingRoom}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {creatingRoom ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <FiMessageSquare className="text-lg" />
                  Start Conversation
                </>
              )}
            </button>
          </div>
        ) : selectedRoom ? (
          // Show chat interface
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedRoom.participants?.find(p => p._id !== session?.user?.id)?.image || "/default-avatar.png"}
                  alt="Participant"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedRoom.participants?.find(p => p._id !== session?.user?.id)?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedRoom.restaurantId ? `Restaurant: ${selectedRoom.restaurantId.name}` : 'Online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={refreshMessages}
                  disabled={loading}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Refresh messages"
                >
                  <FiRefreshCw className={`text-lg ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiMoreVertical className="text-lg" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {loading ? (
                <div className="flex justify-center items-center h-20">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                </div>
              ) : messages.length > 0 ? (
                messages.map((message) => {
                  const isOwnMessage = message.senderId?._id === session?.user?.id;
                  
                  return (
                    <div
                      key={message._id}
                      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isOwnMessage
                            ? "bg-orange-500 text-white rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none border border-gray-200 shadow-sm"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-end mt-1 space-x-1 ${
                          isOwnMessage ? "text-orange-100" : "text-gray-500"
                        }`}>
                          <span className="text-xs">
                            {formatMessageTime(message.createdAt)}
                          </span>
                          {isOwnMessage && (
                            message.isRead ? (
                              <FiCheckCircle className="text-xs" />
                            ) : (
                              <FiCheck className="text-xs" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <FiMessageSquare className="mx-auto text-3xl mb-2" />
                  <p>No messages yet. Start the conversation!</p>
                  <p className="text-sm mt-2">Send a message to begin chatting</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiPaperclip className="text-xl" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiSmile className="text-xl" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    rows="1"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <FiSend className="text-xl" />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  console.log("File selected:", e.target.files[0]);
                }}
              />
            </div>
          </>
        ) : (
          // Default state when no room is selected
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <FiMessageSquare className="mx-auto text-4xl mb-2" />
              <p>Select a conversation to start messaging</p>
              {!restaurant && (
                <p className="text-sm mt-2">Or visit a restaurant page to message the owner</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}