import React, { useState } from 'react';
import { Map, Navigation, Clock, Shield, AlertTriangle, Car, User, Bike } from 'lucide-react';
import toast from 'react-hot-toast';

const SafeRoute = () => {
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    transportMode: 'walking'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState([]);

  const transportModes = [
    { id: 'walking', name: 'Walking', icon: <User className="w-5 h-5" />, time: '25 min' },
    { id: 'bike', name: 'Bicycle', icon: <Bike className="w-5 h-5" />, time: '12 min' },
    { id: 'car', name: 'Car', icon: <Car className="w-5 h-5" />, time: '8 min' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockRoutes = [
        {
          id: 1,
          name: 'Safest Route',
          description: 'Lowest crime risk, well-lit areas',
          duration: '25 min',
          distance: '1.2 km',
          safetyScore: 95,
          riskLevel: 'Low',
          color: 'green',
          steps: [
            'Head north on Main St',
            'Turn right on Safe Ave',
            'Continue straight for 0.5 km',
            'Turn left on Security Blvd'
          ]
        },
        {
          id: 2,
          name: 'Fastest Route',
          description: 'Quickest path, moderate safety',
          duration: '18 min',
          distance: '0.9 km',
          safetyScore: 75,
          riskLevel: 'Medium',
          color: 'yellow',
          steps: [
            'Head east on Main St',
            'Turn left on Quick St',
            'Continue for 0.3 km',
            'Turn right on Destination Ave'
          ]
        },
        {
          id: 3,
          name: 'Alternative Route',
          description: 'Scenic path, good safety',
          duration: '22 min',
          distance: '1.1 km',
          safetyScore: 85,
          riskLevel: 'Low',
          color: 'blue',
          steps: [
            'Head west on Main St',
            'Turn right on Park Ave',
            'Follow the park path',
            'Turn left on Destination Ave'
          ]
        }
      ];

      setRoutes(mockRoutes);
      setIsLoading(false);
      toast.success('Routes calculated successfully!');
    }, 2000);
  };

  const getSafetyColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskColor = (level) => {
    if (level === 'Low') return 'text-green-600';
    if (level === 'Medium') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safe Route Navigation</h1>
          <p className="text-gray-600">Find the safest path to your destination with AI-powered risk analysis</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Route Form */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Plan Your Route</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting Point
                  </label>
                  <input
                    type="text"
                    name="startLocation"
                    value={formData.startLocation}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter starting location"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="endLocation"
                    value={formData.endLocation}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter destination"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {transportModes.map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, transportMode: mode.id })}
                        className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                          formData.transportMode === mode.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          {mode.icon}
                          <span className="text-xs font-medium">{mode.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Calculating Routes...' : 'Find Safe Route'}
                </button>
              </form>

              {/* Safety Tips */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-gray-600">Stay in well-lit areas when walking at night</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-gray-600">Avoid isolated areas and shortcuts</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Navigation className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-600">Share your route with trusted contacts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map and Routes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Safety Map</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Safe Zone</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>High Risk</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive safety map with route visualization</p>
                  <p className="text-sm text-gray-500 mt-2">Routes will appear here after calculation</p>
                </div>
              </div>
            </div>

            {/* Route Results */}
            {routes.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Recommended Routes</h2>
                {routes.map((route) => (
                  <div key={route.id} className="card hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyColor(route.safetyScore)}`}>
                            {route.safetyScore}% Safe
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{route.description}</p>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{route.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Navigation className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{route.distance}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-gray-400" />
                            <span className={`text-sm font-medium ${getRiskColor(route.riskLevel)}`}>
                              {route.riskLevel} Risk
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-900">Route Steps:</h4>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                            {route.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="btn-primary flex-1">
                        Use This Route
                      </button>
                      <button className="btn-secondary">
                        Share Route
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeRoute;
