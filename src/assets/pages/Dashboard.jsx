import React from 'react';
import { Link } from 'react-router-dom';
import { Map, AlertTriangle, Navigation, MessageCircle, Activity, Shield, Users, Clock } from 'lucide-react';

const Dashboard = () => {
  const quickActions = [
    {
      icon: <Navigation className="w-6 h-6" />,
      title: 'Safe Route',
      description: 'Find the safest path',
      href: '/safe-route',
      color: 'bg-blue-500'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Emergency SOS',
      description: 'Send emergency alert',
      href: '/emergency',
      color: 'bg-red-500'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Report Incident',
      description: 'Report safety concern',
      href: '/report',
      color: 'bg-yellow-500'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'SafeBot',
      description: 'AI safety assistant',
      href: '/safebot',
      color: 'bg-green-500'
    }
  ];

  const safetyStats = [
    { label: 'Current Risk Level', value: 'Low', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Nearby Incidents', value: '2', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Safe Zones', value: '15', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Community Members', value: '1,247', color: 'text-gray-600', bg: 'bg-gray-50' }
  ];

  const recentAlerts = [
    {
      type: 'warning',
      message: 'Suspicious activity reported near Central Park',
      time: '2 minutes ago',
      location: 'Central Park, NYC'
    },
    {
      type: 'info',
      message: 'Safe route available to your destination',
      time: '5 minutes ago',
      location: 'Current Location'
    },
    {
      type: 'success',
      message: 'Emergency contact updated successfully',
      time: '1 hour ago',
      location: 'Profile Settings'
    }
  ];

  const safetyTips = [
    'Stay in well-lit areas when walking at night',
    'Share your location with trusted contacts',
    'Be aware of your surroundings',
    'Trust your instincts - if something feels wrong, it probably is'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Dashboard</h1>
          <p className="text-gray-600">Monitor your safety status and access quick actions</p>
        </div>

        {/* Safety Status Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-semibold">Safety Status: Secure</h3>
                <p className="text-green-100">Your current location is in a safe zone</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-green-100">Safety Score</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <Link
              aria-label={action.title}
              key={index}
              to={action.href}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Safety Map */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Safety Map</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View Full Map
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive safety map with real-time data</p>
                  <p className="text-sm text-gray-500 mt-2">Green zones: Safe • Red zones: High risk</p>
                </div>
              </div>
            </div>

            {/* Safety Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {safetyStats.map((stat, index) => (
                <div key={index} className={`${stat.bg} rounded-lg p-4 text-center`}>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-yellow-500' :
                      alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 mb-1">{alert.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{alert.location}</span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {alert.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Tips</h3>
              <div className="space-y-3">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Activity */}
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Active Users</p>
                      <p className="text-xs text-gray-500">In your area</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">47</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reports Today</p>
                      <p className="text-xs text-gray-500">Community reports</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">12</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
