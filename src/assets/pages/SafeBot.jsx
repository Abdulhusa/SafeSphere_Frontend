import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Shield, AlertTriangle, MessageCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const SafeBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m SafeBot, your AI safety assistant. How can I help you stay safe today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    { text: 'Safety tips', icon: '💡' },
    { text: 'Emergency help', icon: '🚨' },
    { text: 'Report incident', icon: '📝' },
    { text: 'Safe routes', icon: '🗺️' },
    { text: 'Risk assessment', icon: '⚠️' },
    { text: 'Contact help', icon: '📞' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage) => {
    const responses = {
      'safety tips': 'Here are some important safety tips:\n\n• Stay in well-lit areas when walking at night\n• Be aware of your surroundings\n• Trust your instincts\n• Share your location with trusted contacts\n• Avoid isolated areas\n• Keep your phone charged and accessible',
      'emergency help': 'If you\'re in an emergency:\n\n🚨 Call 911 immediately\n🚨 Use the SOS button in the Emergency tab\n🚨 Get to a safe location\n🚨 Contact your emergency contacts\n\nI can help guide you through the process. Are you safe right now?',
      'report incident': 'To report an incident:\n\n1. Go to the "Report" tab\n2. Select the type of incident\n3. Provide location and details\n4. Submit the report\n\nThis helps keep the community safe and improves our AI predictions.',
      'safe routes': 'To find safe routes:\n\n1. Go to the "Safe Route" tab\n2. Enter your start and destination\n3. Choose your transport mode\n4. Get AI-powered route suggestions\n\nI analyze crime data to recommend the safest paths.',
      'risk assessment': 'I can help assess your current situation:\n\n• Are you in a well-lit area?\n• Are there people around?\n• Do you feel safe?\n• What time is it?\n\nTell me more about your situation for personalized advice.',
      'contact help': 'Here are important contacts:\n\n📞 Emergency Services: 911\n📞 SafeSphere Support: 1-800-SAFE-HELP\n📞 Local Police: Check your area\n\nYou can also add emergency contacts in your profile settings.'
    };

    const lowerMessage = userMessage.toLowerCase();
    let response = 'I\'m here to help with safety concerns. You can ask me about:\n\n• Safety tips and advice\n• Emergency procedures\n• How to report incidents\n• Finding safe routes\n• Risk assessment\n• Emergency contacts';

    for (const [key, value] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: simulateBotResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action.text);
    handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SafeBot AI Assistant</h1>
          <p className="text-gray-600">Your 24/7 AI safety companion for guidance and emergency support</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="card h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">SafeBot</h3>
                  <p className="text-sm text-gray-500">AI Safety Assistant</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-sm text-gray-500">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-500">SafeBot is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 input-field resize-none"
                    rows={1}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{action.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{action.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Status */}
            <div className="card bg-success-50 border-success-200">
              <h3 className="text-lg font-semibold text-success-900 mb-3">Safety Status</h3>
              <div className="space-y-3 text-sm text-success-700">
                <div className="flex items-center justify-between">
                  <span>Current Risk:</span>
                  <span className="font-medium">Low</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>AI Monitoring:</span>
                  <span className="font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Location:</span>
                  <span className="font-medium">Secure</span>
                </div>
              </div>
            </div>

            {/* Emergency Quick Access */}
            <div className="card bg-danger-50 border-danger-200">
              <h3 className="text-lg font-semibold text-danger-900 mb-3">Emergency Access</h3>
              <div className="space-y-2">
                <button className="w-full btn-danger text-sm">
                  🚨 Emergency SOS
                </button>
                <button className="w-full btn-secondary text-sm">
                  📞 Call 911
                </button>
              </div>
            </div>

            {/* Chat Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SafeBot Features</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-primary-600" />
                  <span>24/7 Safety Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning-600" />
                  <span>Real-time Risk Assessment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-success-600" />
                  <span>Instant Safety Guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span>Always Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeBot;
