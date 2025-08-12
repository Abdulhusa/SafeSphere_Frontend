import React, { useState } from 'react';
import { User, Shield, Settings, Bell, MapPin, Phone, Mail, Edit, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    emergencyContacts: [
      { id: 1, name: 'Mom', phone: '+1 (555) 123-4567', relationship: 'Family' },
      { id: 2, name: 'Dad', phone: '+1 (555) 234-5678', relationship: 'Family' },
      { id: 3, name: 'Sarah', phone: '+1 (555) 345-6789', relationship: 'Friend' }
    ],
    safetySettings: {
      locationSharing: true,
      emergencyAlerts: true,
      communityAlerts: true,
      nightMode: false,
      autoSOS: false
    }
  });

  const [tempData, setTempData] = useState(profileData);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'contacts', name: 'Emergency Contacts', icon: <Phone className="w-5 h-5" /> },
    { id: 'settings', name: 'Safety Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-5 h-5" /> }
  ];

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSettingChange = (setting) => {
    setTempData(prev => ({
      ...prev,
      safetySettings: {
        ...prev.safetySettings,
        [setting]: !prev.safetySettings[setting]
      }
    }));
  };

  const addEmergencyContact = () => {
    const newContact = {
      id: Date.now(),
      name: '',
      phone: '',
      relationship: ''
    };
    setTempData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, newContact]
    }));
  };

  const removeEmergencyContact = (id) => {
    setTempData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(contact => contact.id !== id)
    }));
  };

  const updateEmergencyContact = (id, field, value) => {
    setTempData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map(contact =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account, emergency contacts, and safety preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="card">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={tempData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={tempData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={tempData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={tempData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Emergency Contacts</h2>
                  <button
                    onClick={addEmergencyContact}
                    className="btn-primary"
                  >
                    Add Contact
                  </button>
                </div>

                <div className="space-y-4">
                  {tempData.emergencyContacts.map((contact) => (
                    <div key={contact.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={contact.name}
                            onChange={(e) => updateEmergencyContact(contact.id, 'name', e.target.value)}
                            className="input-field"
                            placeholder="Contact name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={contact.phone}
                            onChange={(e) => updateEmergencyContact(contact.id, 'phone', e.target.value)}
                            className="input-field"
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Relationship
                            </label>
                            <input
                              type="text"
                              value={contact.relationship}
                              onChange={(e) => updateEmergencyContact(contact.id, 'relationship', e.target.value)}
                              className="input-field"
                              placeholder="Family, Friend, etc."
                            />
                          </div>
                          <button
                            onClick={() => removeEmergencyContact(contact.id)}
                            className="px-3 py-2 text-danger-600 hover:bg-danger-50 rounded-lg transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety Settings Tab */}
            {activeTab === 'settings' && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Safety Settings</h2>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Location & Privacy</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-primary-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">Location Sharing</h4>
                            <p className="text-sm text-gray-600">Allow SafeSphere to access your location for safety features</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('locationSharing')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            tempData.safetySettings.locationSharing ? 'bg-primary-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              tempData.safetySettings.locationSharing ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-warning-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">Emergency Alerts</h4>
                            <p className="text-sm text-gray-600">Receive emergency notifications and alerts</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('emergencyAlerts')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            tempData.safetySettings.emergencyAlerts ? 'bg-primary-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              tempData.safetySettings.emergencyAlerts ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-success-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">Community Alerts</h4>
                            <p className="text-sm text-gray-600">Get notified about incidents in your area</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('communityAlerts')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            tempData.safetySettings.communityAlerts ? 'bg-primary-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              tempData.safetySettings.communityAlerts ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Advanced Features</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-danger-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">Auto SOS</h4>
                            <p className="text-sm text-gray-600">Automatically trigger SOS in extreme situations</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('autoSOS')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            tempData.safetySettings.autoSOS ? 'bg-primary-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              tempData.safetySettings.autoSOS ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">Night Safety Mode</h4>
                            <p className="text-sm text-gray-600">Enhanced monitoring during night hours</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSettingChange('nightMode')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            tempData.safetySettings.nightMode ? 'bg-primary-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              tempData.safetySettings.nightMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Alert Types</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Emergency Alerts</h4>
                          <p className="text-sm text-gray-600">Critical safety notifications</p>
                        </div>
                        <span className="text-sm text-gray-500">Always On</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Community Reports</h4>
                          <p className="text-sm text-gray-600">Incidents reported in your area</p>
                        </div>
                        <span className="text-sm text-gray-500">Enabled</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Safety Tips</h4>
                          <p className="text-sm text-gray-600">Daily safety recommendations</p>
                        </div>
                        <span className="text-sm text-gray-500">Daily</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Route Updates</h4>
                          <p className="text-sm text-gray-600">Changes in safe route recommendations</p>
                        </div>
                        <span className="text-sm text-gray-500">Enabled</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Delivery Methods</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Push Notifications</h4>
                          <p className="text-sm text-gray-600">Instant alerts on your device</p>
                        </div>
                        <span className="text-sm text-success-600">Active</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Detailed reports via email</p>
                        </div>
                        <span className="text-sm text-gray-500">Weekly</span>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">SMS Alerts</h4>
                          <p className="text-sm text-gray-600">Emergency messages via text</p>
                        </div>
                        <span className="text-sm text-success-600">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
