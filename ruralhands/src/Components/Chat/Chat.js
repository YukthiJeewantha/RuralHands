import { Bot, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const RuralHandsChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Rural Hands website. I'm here to help you with any questions about our rural development services and community programs. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    'hello': 'Hello! How are you doing? What would you like to know about Rural Hands?',
    'services': 'We offer rural development projects, agricultural advisory services, community development programs, sustainable farming solutions, and capacity building for rural communities.',
    'contact': 'You can reach us through:\n📞 Phone: +94 11 123 4567\n📧 Email: info@ruralhands.lk\n📍 Address: Colombo, Sri Lanka\n🌐 Website: www.ruralhands.lk',
    'projects': 'Our current projects include:\n• Sustainable Agriculture Initiative\n• Rural Water Management\n• Community Empowerment Programs\n• Digital Literacy for Farmers\n• Microfinance Support',
    'agriculture': 'We provide modern farming techniques, crop diversification advice, organic farming methods, pest management solutions, and market linkage support for rural farmers.',
    'about': 'Rural Hands is dedicated to empowering rural communities through sustainable development initiatives. We focus on agriculture, education, healthcare, and economic opportunities in rural areas.',
    'thank': 'Thank you! We\'re happy to help. Feel free to ask if you need anything else.',
    'default': 'I didn\'t quite understand that. Could you please rephrase your question? You can also try asking about our "services", "projects", or "contact" information.'
  };

  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return botResponses['hello'];
    } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      return botResponses['services'];
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return botResponses['contact'];
    } else if (lowerMessage.includes('project') || lowerMessage.includes('program') || lowerMessage.includes('initiative')) {
      return botResponses['projects'];
    } else if (lowerMessage.includes('agriculture') || lowerMessage.includes('farming') || lowerMessage.includes('crop')) {
      return botResponses['agriculture'];
    } else if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('what is rural hands')) {
      return botResponses['about'];
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return botResponses['thank'];
    } else {
      return botResponses['default'];
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Chat with Our Assistant
        </h2>
        <div className="mt-6 w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Get instant answers about our services, projects, and how we can help your community
          </p>
      </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
            <div className="flex items-center space-x-3">
              <Bot className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold">Rural Hands Assistant</h2>
                <p className="text-green-100">Online and ready to help</p>
              </div>
              <div className="ml-auto">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isBot ? 'bg-green-500 mr-2' : 'bg-blue-500 ml-2'
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.isBot 
                      ? 'bg-white text-gray-800 border border-gray-200 shadow-sm' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="flex flex-row">
                  <div className="w-8 h-8 rounded-full bg-green-500 mr-2 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>


      </div>


    </div>
  );
};

export default RuralHandsChatbot;
