import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, Users, Camera, FileText, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const Report = () => {
  const [formData, setFormData] = useState({
    incidentType: '',
    location: '',
    description: '',
    severity: 'medium',
    anonymous: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const incidentTypes = [
    { id: 'theft', name: 'Theft', icon: '👜' },
    { id: 'assault', name: 'Assault', icon: '👊' },
    { id: 'harassment', name: 'Harassment', icon: '🚫' },
    { id: 'vandalism', name: 'Vandalism', icon: '🎨' },
    { id: 'suspicious', name: 'Suspicious Activity', icon: '👁️' },
    { id: 'other', name: 'Other', icon: '❓' }
  ];

  const severityLevels = [
    { id: 'low', name: 'Low', color: 'text-success-600', bg: 'bg-success-50' },
    { id: 'medium', name: 'Medium', color: 'text-warning-600', bg: 'bg-warning-50' },
    { id: 'high', name: 'High', color: 'text-danger-600', bg: 'bg-danger-50' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.incidentType && formData.location && formData.description) {
        toast.success('Incident reported successfully! Community alert sent.');
        setFormData({
          incidentType: '',
          location: '',
          description: '',
          severity: 'medium',
          anonymous: false
        });
      } else {
        toast.error('Please fill in all required fields');
      }
      setIsLoading(false);
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          setFormData({ ...formData, location });
          toast.success('Location captured successfully!');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Incident</h1>
          <p className="text-gray-600">Help keep your community safe by reporting incidents and suspicious activities</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Incident Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Incident Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Type of Incident *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {incidentTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, incidentType: type.id })}
                        className={`p-4 rounded-lg border-2 transition-colors duration-200 text-left ${
                          formData.incidentType === type.id
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{type.icon}</span>
                          <span className="font-medium">{type.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="input-field flex-1"
                      placeholder="Enter incident location"
                      required
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                    >
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Severity Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Severity Level
                  </label>
                  <div className="flex space-x-3">
                    {severityLevels.map((level) => (
                      <button
                        key={level.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, severity: level.id })}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors duration-200 ${
                          formData.severity === level.id
                            ? `${level.bg} ${level.color} border-current`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="input-field"
                    placeholder="Provide detailed description of the incident..."
                    required
                  />
                </div>

                {/* Anonymous Report */}
                <div className="flex items-center">
                  <input
                    id="anonymous"
                    name="anonymous"
                    type="checkbox"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                    Submit anonymously
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting Report...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Submit Report</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Report Guidelines */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reporting Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-4 h-4 text-warning-600 mt-0.5" />
                  <p>Only report genuine incidents and suspicious activities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-primary-600 mt-0.5" />
                  <p>Report incidents as soon as possible after they occur</p>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-success-600 mt-0.5" />
                  <p>Provide accurate location information</p>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-4 h-4 text-gray-600 mt-0.5" />
                  <p>Include relevant details and descriptions</p>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">Community Impact</h3>
              <div className="space-y-3 text-sm text-primary-700">
                <p>Your reports help:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Alert other community members</li>
                  <li>Improve AI safety predictions</li>
                  <li>Support law enforcement efforts</li>
                  <li>Create safer neighborhoods</li>
                </ul>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Community Reports</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">Suspicious Activity</span>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <p className="text-xs text-gray-600">Central Park area</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">Theft</span>
                    <span className="text-xs text-gray-500">15 min ago</span>
                  </div>
                  <p className="text-xs text-gray-600">Downtown shopping district</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">Harassment</span>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-xs text-gray-600">University campus</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="card bg-danger-50 border-danger-200">
              <h3 className="text-lg font-semibold text-danger-900 mb-3">Emergency?</h3>
              <p className="text-sm text-danger-700 mb-3">
                If this is an emergency requiring immediate police response, call 911 immediately.
              </p>
              <button className="w-full btn-danger">
                Call Emergency Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
