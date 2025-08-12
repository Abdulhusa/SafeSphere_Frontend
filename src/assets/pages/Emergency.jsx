import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Users, Shield, Clock, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Emergency = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Mom', phone: '+1 (555) 123-4567', relationship: 'Family' },
    { id: 2, name: 'Dad', phone: '+1 (555) 234-5678', relationship: 'Family' },
    { id: 3, name: 'Sarah', phone: '+1 (555) 345-6789', relationship: 'Friend' }
  ]);

  useEffect(() => {
    let interval;
    if (isEmergencyActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isEmergencyActive) {
      handleEmergencyAlert();
    }
    return () => clearInterval(interval);
  }, [isEmergencyActive, countdown]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
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

  const handleEmergencyAlert = () => {
    setIsEmergencyActive(false);
    setCountdown(0);
    
    // Simulate emergency alert
    toast.success('Emergency alert sent to all contacts!');
    
    // Here you would typically:
    // 1. Send SMS to emergency contacts
    // 2. Call emergency services
    // 3. Share location data
    // 4. Log the emergency
  };

  const triggerEmergency = () => {
    getCurrentLocation();
    setIsEmergencyActive(true);
    setCountdown(5); // 5 second countdown
    toast.error('Emergency alert will be sent in 5 seconds!');
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(0);
    toast.success('Emergency alert cancelled');
  };

  const addEmergencyContact = () => {
    // This would open a modal or form to add a new contact
    toast.success('Add contact functionality would open here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency SOS</h1>
          <p className="text-gray-600">One-tap emergency alert system for immediate help</p>
        </div>

        {/* Emergency Button */}
        <div className="text-center mb-8">
          {!isEmergencyActive ? (
            <button
              onClick={triggerEmergency}
              className="w-32 h-32 bg-danger-600 hover:bg-danger-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
                <span className="text-lg font-bold">SOS</span>
              </div>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="w-32 h-32 bg-danger-600 rounded-full flex items-center justify-center text-white shadow-lg mx-auto animate-pulse">
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-2" />
                  <span className="text-2xl font-bold">{countdown}</span>
                </div>
              </div>
              <button
                onClick={cancelEmergency}
                className="btn-secondary"
              >
                Cancel Emergency
              </button>
            </div>
          )}
        </div>

        {/* Emergency Status */}
        {isEmergencyActive && (
          <div className="card bg-danger-50 border-danger-200 mb-8">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-danger-600" />
              <div>
                <h3 className="text-lg font-semibold text-danger-900">Emergency Alert Active</h3>
                <p className="text-danger-700">
                  Alert will be sent to all emergency contacts in {countdown} seconds
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Emergency Contacts</h2>
              <button
                onClick={addEmergencyContact}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Add Contact
              </button>
            </div>

            <div className="space-y-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.relationship}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{contact.phone}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <h3 className="font-medium text-primary-900 mb-2">Emergency Services</h3>
              <div className="space-y-2 text-sm text-primary-700">
                <div className="flex justify-between">
                  <span>Police:</span>
                  <span>911</span>
                </div>
                <div className="flex justify-between">
                  <span>Ambulance:</span>
                  <span>911</span>
                </div>
                <div className="flex justify-between">
                  <span>Fire Department:</span>
                  <span>911</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Features */}
          <div className="space-y-6">
            {/* Location Status */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Services</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">GPS Location</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    location ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {location ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                {location && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Latitude:</strong> {location.lat.toFixed(6)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Longitude:</strong> {location.lng.toFixed(6)}
                    </p>
                  </div>
                )}

                <button
                  onClick={getCurrentLocation}
                  className="w-full btn-secondary"
                >
                  Update Location
                </button>
              </div>
            </div>

            {/* Emergency Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Features</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">Auto-dial Emergency Services</span>
                  </div>
                  <span className="text-sm text-gray-500">Enabled</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">SMS Alerts</span>
                  </div>
                  <span className="text-sm text-gray-500">Enabled</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">Location Sharing</span>
                  </div>
                  <span className="text-sm text-gray-500">Enabled</span>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="card bg-warning-50 border-warning-200">
              <h3 className="text-lg font-semibold text-warning-900 mb-3">Emergency Tips</h3>
              <div className="space-y-2 text-sm text-warning-700">
                <p>• Only use SOS in genuine emergencies</p>
                <p>• Stay calm and follow instructions</p>
                <p>• Provide clear information to responders</p>
                <p>• Keep your emergency contacts updated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Emergency Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Emergency Alert Sent</p>
                  <p className="text-sm text-gray-600">All contacts notified successfully</p>
                </div>
                <span className="text-sm text-gray-500">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Location Updated</p>
                  <p className="text-sm text-gray-600">GPS coordinates refreshed</p>
                </div>
                <span className="text-sm text-gray-500">5 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
